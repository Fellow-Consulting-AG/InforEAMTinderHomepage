var parseArgs = require("minimist");
var fs = require("fs");
var fse = require("fs-extra");
var path = require("path");
var archiver = require("archiver");
var del = require('del');
var p = require("child_process");
var ncp = require("ncp");
var sohoVersion = "9.1.1";
var ZIP_TIMEOUT = 100;
var WidgetIdPattern = "^[a-zA-Z0-9]+([\\.\\-\\_][a-zA-Z0-9]+)*$";
var WidgetIdPatternStrict = "^[a-z0-9]+([\\.][a-z0-9]+)*$";
var _tempDirectory;
var _argv;
var _trace;
var _silent;
var _buildTasksArray;
var _completedTask;
var _isMultiWidgetMode = false;
var _finalSuccessMessage = "";
function isMatch(includeList, name, extensions) {
    if (name.endsWith(".ts") || name.endsWith("ngsummary.json")) {
        return false;
    }
    for (var _a = 0, includeList_1 = includeList; _a < includeList_1.length; _a++) {
        var filename = includeList_1[_a];
        if (name === filename) {
            return true;
        }
    }
    for (var _b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
        var extenstion = extensions_1[_b];
        if (name.endsWith(extenstion)) {
            return true;
        }
    }
    return false;
}
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
function getTimestamp() {
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var date = (new Date(Date.now() - tzoffset)).toISOString();
    date = replaceAll(date, "-", "");
    date = replaceAll(date, ":", "");
    date = date.replace("T", "-");
    return date.slice(0, 15);
}
function endsWith(value, suffix) {
    if (!value) {
        return false;
    }
    return value.indexOf(suffix, value.length - suffix.length) !== -1;
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
function begin(operationName) {
    info("");
    info("Begin: " + operationName + "...");
    return {
        name: operationName,
        start: new Date().getTime()
    };
}
function end(operation) {
    var duration = new Date().getTime() - operation.start;
    var durationText;
    if (duration < 1000) {
        durationText = "(" + duration + " milliseconds)";
    }
    else {
        durationText = "(" + round(duration / 1000, 1) + " seconds)";
    }
    info("End: " + operation.name + " " + durationText);
}
function createDirectory(dir) {
    if (!fse.existsSync(dir)) {
        fse.ensureDirSync(dir);
    }
}
function getManifest(widgetDirectory) {
    var manifestPath = path.join(widgetDirectory, "widget.manifest");
    if (!fs.existsSync(manifestPath)) {
        error("Failed to find widget manifest: " + manifestPath);
        exitWithUsage(1);
        return;
    }
    info("Found widget manifest " + manifestPath);
    var originalManifest = fs.readFileSync(manifestPath, "utf8");
    try {
        return JSON.parse(originalManifest);
    }
    catch (ex) {
        exitError("Invalid Widget manifest. JSON content must be valid, and encoded as UTF-8 (without BOM marker). The encoding can be checked and changed using the Encoding menu in Notepad++.");
    }
}
function getSystemJsBuilderConfig(task, sharedModuleName, isSharedModuleFactory) {
    var configuration = {
        authorization: true,
        transpiler: false,
        meta: {
            "*": {
                authorization: true
            },
            "@angular/*": {
                build: false
            },
            "@infor/*": {
                build: false
            },
            "rxjs/*": {
                build: false
            },
            "rxjs": {
                "build": false
            },
            "lime": {
                build: false
            },
            "lime/core": {
                build: false
            },
            "lime/common": {
                build: false
            }
        },
        map: {},
        packages: {
            "node_modules": {
                defaultExtension: "js"
            }
        }
    };
    if (isSharedModuleFactory) {
        var paths = {};
        paths[sharedModuleName] = task.widgetDirectoryName + "/" + getJavaScriptFilename(sharedModuleName);
        configuration["paths"] = paths;
    }
    var sharedModules = task.manifest.sharedModules;
    if (sharedModules && sharedModules.length > 0) {
        sharedModules.forEach(function (sharedModule) {
            var name = sharedModule.name;
            if (!isModuleName(name, sharedModuleName)) {
                configuration.meta[name] = { build: false };
                configuration.meta[task.widgetDirectoryName + "/" + name] = { build: false };
                if (task.isAot) {
                    configuration.meta[name + ".ngfactory"] = { build: false };
                    configuration.meta[task.widgetDirectoryName + "/" + name + ".ngfactory"] = { build: false };
                }
            }
        });
    }
    return configuration;
}
function isModuleName(currentName, buildModuleName) {
    if (!buildModuleName) {
        return false;
    }
    if (!currentName) {
        return;
    }
    return currentName === buildModuleName;
}
function getBaseTypeScriptConfig(task) {
    var relativeScriptsPath = task.relativeScriptsPath;
    var widgetDirectoryName = task.widgetDirectoryName;
    var tscOptions = {
        "compilerOptions": {
            "baseUrl": ".",
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "lib": [
                "es2015",
                "es2016",
                "dom",
                "es5",
                "es6"
            ],
            "module": "umd",
            "moduleResolution": "node",
            "noEmitHelpers": true,
            "noEmitOnError": true,
            "noImplicitAny": false,
            "paths": {
                "lime": [relativeScriptsPath + "scripts/typings/lime"],
                "lime/core": [relativeScriptsPath + "lime-main.js"],
                "lime/common": [relativeScriptsPath + "lime-main.js"],
                "@infor/sohoxi-angular": [relativeScriptsPath + "scripts/typings/soho"]
            },
            "removeComments": true,
            "skipLibCheck": true,
            "sourceMap": false,
            "target": "es5"
        },
        "include": [
            "./" + widgetDirectoryName + "/**/*",
            relativeScriptsPath + "scripts/typings/infor/index.d.ts",
            relativeScriptsPath + "scripts/typings/soho/**/*"
        ]
    };
    var moduleNames = task.sharedModuleNames;
    if (moduleNames && moduleNames.length > 0) {
        var paths = tscOptions.compilerOptions.paths;
        for (var _a = 0, moduleNames_1 = moduleNames; _a < moduleNames_1.length; _a++) {
            var moduleName = moduleNames_1[_a];
            var modulePath = "./" + task.widgetDirectoryName + "/" + moduleName;
            paths[moduleName] = [modulePath];
        }
    }
    return tscOptions;
}
function buildTypeScriptTsc(task) {
    var operation = begin("TypeScript build with tsc");
    var tscOptions = getBaseTypeScriptConfig(task);
    if (task.isAot) {
        tscOptions.exclude = ["./**/*-aot.ts"];
    }
    var tscConfigPath = task.tempDirectory + "/tsconfig-prod.json";
    fs.writeFileSync(tscConfigPath, JSON.stringify(tscOptions), "utf8");
    var tscPath = path.join(".bin", "tsc");
    tscPath = path.join(task.absoluteNodeModulesPath, tscPath);
    execSync(tscPath + " -p \"" + tscConfigPath + "\"");
    end(operation);
}
function buildTypeScriptNgc(task) {
    var operation = begin("TypeScript build with ngc");
    var widgetDirectoryName = task.widgetDirectoryName;
    var moduleName = task.moduleName;
    var manifest = task.manifest;
    var sharedModules = manifest.sharedModules;
    var tempDirectory = task.tempDirectory;
    var relativeScriptsPath = task.relativeScriptsPath;
    var fullTemplateTypeCheck = getBooleanArg("fullTemplateTypeCheck", false);
    if (fullTemplateTypeCheck) {
        info("Enabled full template type check");
    }
    var tscOptions = getBaseTypeScriptConfig(task);
    tscOptions.angularCompilerOptions = {
        "skipMetadataEmit": true,
        "enableSummariesForJit": false,
        "fullTemplateTypeCheck": fullTemplateTypeCheck,
        "preserveWhitespaces": false,
        "generateCodeForLibraries": true,
        "enableIvy": false
    };
    var compilerOptions = tscOptions.compilerOptions;
    compilerOptions.module = "umd";
    delete compilerOptions.outFile;
    var tscPath = path.join(tempDirectory, "tsconfig-aot.json");
    fs.writeFileSync(tscPath, JSON.stringify(tscOptions), "utf8");
    var ngcPath = path.join(".bin", "ngc");
    ngcPath = path.join(task.absoluteNodeModulesPath, ngcPath);
    var command = "\"" + ngcPath + "\" -p \"" + tscPath + "\"";
    execSync(command);
    end(operation);
}
function getJavaScriptFilename(name) {
    if (!endsWith(name, ".js")) {
        name += ".js";
    }
    return name;
}
function getFinalBundleName(task, isAot, sharedModuleName) {
    if (sharedModuleName) {
        return getJavaScriptFilename(sharedModuleName);
    }
    return task.widgetDirectoryName + "." + task.moduleName + (isAot ? "-aot" : "") + ".js";
}
function hasSharedModuleFactory(task, factoryName) {
    var filename = path.join(task.widgetTempDirectory, factoryName);
    return fse.existsSync(filename);
}
function createSystemJsBuilderScript(task, isAot, sharedModuleName) {
    var moduleName;
    var isSharedModuleFactory = false;
    var isSharedModule = !!sharedModuleName;
    if (isAot && isSharedModule) {
        moduleName = sharedModuleName + ".ngfactory.js";
        isSharedModuleFactory = hasSharedModuleFactory(task, moduleName);
        if (!isSharedModuleFactory) {
            moduleName = null;
        }
    }
    if (!moduleName) {
        moduleName = sharedModuleName || task.moduleName;
    }
    var configuration = getSystemJsBuilderConfig(task, sharedModuleName, isSharedModuleFactory);
    configuration.packages[task.widgetDirectoryName] = { defaultExtension: "js" };
    var bundleOptions = {
        minify: task.isMinify,
        mangle: task.isMangle,
        sourceMaps: false,
    };
    var suffix = isAot && !isSharedModule ? "-aot" : "";
    var inputFile = getJavaScriptFilename(moduleName + suffix);
    var inputPath = task.widgetDirectoryName + "/" + inputFile;
    var outputFile = getFinalBundleName(task, isAot, sharedModuleName);
    var outputPath = task.widgetDirectoryName + "/" + outputFile;
    var content = 'var Builder = require("systemjs-builder");\n';
    content += "var configuration = " + JSON.stringify(configuration) + ";\n";
    content += "var builder = new Builder();\n";
    content += "builder.config(configuration);\n";
    content += "var input = \"" + inputPath + "\";\n";
    content += "var output = \"" + outputPath + "\";\n";
    content += "var options = " + JSON.stringify(bundleOptions) + ";\n";
    content += "builder.bundle(input, output, options);\n";
    return content;
}
function bundleWithSystemJs(task, isAot, sharedModuleName) {
    var operation = begin("Bundle with SystemJS Builder");
    var scriptContent = createSystemJsBuilderScript(task, isAot, sharedModuleName);
    var suffix = sharedModuleName ? ("-" + sharedModuleName) : "";
    var scriptName = "bundle" + suffix + (isAot ? "-aot" : "") + ".js";
    var scriptPath = path.join(task.tempDirectory, scriptName);
    fs.writeFileSync(scriptPath, scriptContent, "utf8");
    info("Created bundle script file: " + scriptPath);
    var currentDirectory = process.cwd();
    process.chdir(task.tempDirectory);
    info("Changed working directory to: " + process.cwd());
    var command = "node ./" + scriptName;
    info("Executing: " + command);
    execSync(command);
    process.chdir(currentDirectory);
    var bundlePath = path.join(task.widgetTempDirectory, getFinalBundleName(task, isAot, sharedModuleName));
    replaceRelativeModulesInBundle(task, bundlePath, isAot);
    end(operation);
}
function bundleAot(task) {
    var operation = begin("BundleAot");
    var directory = task.widgetTempDirectory;
    var moduleName = task.moduleName;
    var aotMainFilename = moduleName + "-aot.js";
    var moduleFactories = [];
    var aotMainFilenamePath = path.join(directory, aotMainFilename);
    if (!fse.existsSync(aotMainFilenamePath)) {
        exitError(aotMainFilenamePath + " does not exists. Aot build seems to have failed");
    }
    var bundleContent = null;
    var bundleName = moduleName + "-bundle-aot.js";
    info("About to create bundle file for AOT, " + bundleName);
    var bundlePath = path.join(directory, bundleName);
    var names = fs.readdirSync(directory);
    var isFolder;
    for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
        var name = names_1[_i];
        var fullName = path.join(directory, name);
        isFolder = fs.lstatSync(fullName).isDirectory();
        if (!isFolder && isValidForAotWidgetBundle(task, name, moduleFactories)) {
            if (!bundleContent) {
                bundleContent = fs.readFileSync(fullName, "utf8");
            }
            else {
                bundleContent = bundleContent + "\n" + fs.readFileSync(fullName, "utf8");
            }
        }
        else if (isFolder) {
            info("Skipping folder " + name + ", code in subfolders not supported by this script.");
        }
    }
    bundleContent = bundleContent + "\n" + fs.readFileSync(aotMainFilenamePath, "utf8");
    fs.writeFileSync(bundlePath, bundleContent, "utf8");
    info("Saved " + bundlePath);
    bundleSharedModulesAot(task, moduleFactories);
    end(operation);
}
function bundleSharedModulesAot(task, moduleFactories) {
    if (!moduleFactories) {
        return;
    }
    var directory = task.widgetTempDirectory;
    for (var i = 0, len = moduleFactories.length; i < len; ++i) {
        var moduleFactoryName = moduleFactories[i];
        var moduleFactoryPath = path.combine(directory, moduleFactoryName);
        var moduleName = moduleFactoryName.substring(0, moduleFactoryName.lastIndexOf(".ngfactory.js"));
        var modulejsPath = path.combine(directory, moduleName + ".js");
        info("Reading " + modulejsPath);
        var moduleContent = fs.readFileSync(modulejsPath, "utf8");
        info("Reading factory" + moduleFactoryPath);
        var factoryContent = fs.readFileSync(moduleFactoryPath, "utf8");
        var fileContent = moduleContent + "\n" + factoryContent;
        fs.writeFileSync(modulejsPath, fileContent, "utf8");
        info("Updated shared module  " + modulejsPath + ". Added factory " + moduleFactoryName + ".");
    }
}
function isValidForAotWidgetBundle(task, name, modulefactories) {
    if (!name.endsWith(".js")) {
        return false;
    }
    var aotMainFilename = task.moduleName + "-aot.js";
    var jitMainFilename = task.moduleName + ".js";
    if (name === aotMainFilename || name == jitMainFilename) {
        return false;
    }
    return !isSharedModule(task, name, modulefactories);
}
function isSharedModule(task, name, moduleFactories) {
    var isSharedModule = false;
    var modules = task.sharedModuleNames;
    if (modules) {
        var fileAsModuleName = getFilenameNoExtension(name);
        trace("Verify if there is a shared module called " + fileAsModuleName);
        isSharedModule = arrayContains(fileAsModuleName, modules);
        if (isSharedModule) {
            info(name + " is a shared module and will be excluded from the AOT widget bundle");
            return true;
        }
        var factoryIndex = name.lastIndexOf(".ngfactory.js");
        if (factoryIndex > 0) {
            var moduleName = name.substring(0, factoryIndex);
            isSharedModule = arrayContains(moduleName, modules);
            if (isSharedModule) {
                moduleFactories.push(name);
            }
        }
        info(isSharedModule ? name + " is a shared module factory file and will be exluded from the AOT widget bundle" : name + " will be added to bundle");
        return isSharedModule;
    }
    else {
        info("Widget has no shared modules. Including " + name + " in widget AOT bundle");
        return false;
    }
}
function isSharedModuleName(task, name) {
    return arrayContains(name, task.sharedModuleNames);
}
function containsSharedModuleFactory(task, name) {
    var names = task.sharedModuleNames;
    for (var _a = 0, names_2 = names; _a < names_2.length; _a++) {
        var sharedModuleName = names_2[_a];
        var search = sharedModuleName + ".ngfactory";
        if (name.indexOf(search) >= 0) {
            return true;
        }
    }
    return false;
}
function arrayContains(value, stringArray) {
    return (stringArray.indexOf(value) > -1);
}
function getFilenameNoExtension(filename) {
    var index = filename.lastIndexOf(".");
    if (index > 0) {
        return filename.substring(0, index);
    }
    else {
        return filename;
    }
}
function replaceRelativeModulesInBundle(task, filePath, isAot) {
    var bundleContent = fs.readFileSync(filePath, "utf8");
    var widgetDirectoryName = task.widgetDirectoryName;
    var widgetModuleName = task.moduleName;
    var widgetFactoryModule = widgetDirectoryName + "." + widgetModuleName;
    var modules = findRegisteredModules(task, bundleContent, widgetDirectoryName);
    if (modules.length > 0) {
        for (var index = 0; index < modules.length; index++) {
            var moduleName = modules[index];
            if (moduleName !== "widget-aot") {
                bundleContent = replaceModule(bundleContent, moduleName, widgetDirectoryName);
            }
        }
    }
    bundleContent = replaceEntryModule(bundleContent, widgetDirectoryName, widgetModuleName, isAot);
    bundleContent = replaceSharedModulePaths(task, bundleContent);
    info("Saving updated file: " + filePath);
    fs.writeFileSync(filePath, bundleContent, "utf8");
}
function replaceSharedModulePaths(task, bundleContent) {
    var sharedModuleNames = task.sharedModuleNames;
    for (var _a = 0, sharedModuleNames_1 = sharedModuleNames; _a < sharedModuleNames_1.length; _a++) {
        var sharedModuleName = sharedModuleNames_1[_a];
        var search = "\"" + task.widgetDirectoryName + "\/" + sharedModuleName + ".ngfactory.js\"";
        var replace = "\"" + sharedModuleName + ".ngfactory\"";
        trace("Replacing any occurrences of " + search + " with " + replace);
        bundleContent = replaceAll(bundleContent, search, replace);
        search = "\".\/" + sharedModuleName + ".ngfactory\"";
        replace = "\"" + sharedModuleName + ".ngfactory\"";
        trace("Replacing any occurrences of " + search + " with " + replace);
        bundleContent = replaceAll(bundleContent, search, replace);
        search = "\"" + task.widgetDirectoryName + "\/" + sharedModuleName + ".js\"";
        replace = "\"" + sharedModuleName + "\"";
        trace("Replacing any occurrences of " + search + " with " + replace);
        bundleContent = replaceAll(bundleContent, search, replace);
    }
    return bundleContent;
}
function replaceEntryModule(bundleContent, widgetDirectoryName, moduleName, isAot) {
    var suffix = isAot ? "-aot" : "";
    var beforeNamePattern = "System.registerDynamic(\"" + widgetDirectoryName + "\/" + moduleName + suffix + ".js\",";
    var afterNamePattern = "System.registerDynamic(\"" + widgetDirectoryName + "." + moduleName + suffix + "\",";
    trace("Replacing any occurrences of " + beforeNamePattern + " with " + afterNamePattern);
    return bundleContent.replace(beforeNamePattern, afterNamePattern);
}
function removeJavaScriptExtension(name) {
    if (endsWith(name, ".js")) {
        name = name.substring(0, name.length - 3);
    }
    return name;
}
function findRegisteredModules(task, bundleContent, widgetDirectoryName) {
    var modules = [];
    var searchBegin = "System.registerDynamic(\"";
    var currentIndex = 0;
    while (true) {
        var startIndexEnd = bundleContent.indexOf(searchBegin, currentIndex);
        if (startIndexEnd < 0 || currentIndex < 0) {
            trace("Found " + modules.length + " modules: " + JSON.stringify(modules));
            break;
        }
        var startIndex = startIndexEnd + searchBegin.length;
        var endIndex = bundleContent.indexOf("\"", startIndex);
        currentIndex = endIndex;
        var loadModule = bundleContent.substring(startIndex, endIndex);
        loadModule = removeJavaScriptExtension(loadModule);
        if (isSharedModuleName(task, loadModule) || containsSharedModuleFactory(task, loadModule)) {
            continue;
        }
        var widgetIndex = loadModule.indexOf(widgetDirectoryName);
        var moduleRelativeName = loadModule;
        if (widgetIndex == 0) {
            var separatorCharCount = 1;
            moduleRelativeName = loadModule.substring(widgetIndex + widgetDirectoryName.length + separatorCharCount);
        }
        trace("Module: " + loadModule + " -> " + moduleRelativeName);
        modules.push(moduleRelativeName);
    }
    return modules;
}
function replaceModule(bundleContent, moduleName, widgetDirectoryName) {
    var newModuleName = "\"" + getJavaScriptFilename(widgetDirectoryName + "/" + moduleName) + "\"";
    trace("New module name: " + newModuleName);
    bundleContent = replaceModulePattern(bundleContent, moduleName, newModuleName);
    var isMultiLevel = moduleName.indexOf("/") > 0;
    trace("Multi level module: " + isMultiLevel);
    if (isMultiLevel) {
        var subModuleName = moduleName;
        while ((subModuleName = removeParent(subModuleName))) {
            bundleContent = replaceModulePattern(bundleContent, subModuleName, newModuleName);
        }
    }
    return bundleContent;
}
function removeParent(path) {
    var index = path.indexOf("/");
    return index > 0 ? path.substring(index + 1) : null;
}
function replaceModulePattern(bundleContent, moduleName, newModuleName) {
    var maxDepth = 5;
    var pattern = "\".\/" + moduleName + "\"";
    for (var level = 0; level < maxDepth; level++) {
        trace("Replacing any module usages of " + pattern);
        bundleContent = replaceAll(bundleContent, pattern, newModuleName);
        if (level == 0) {
            pattern = "\"..\/" + moduleName + "\"";
        }
        else {
            pattern = "\"..\/" + pattern.substring(1, pattern.length);
        }
    }
    return bundleContent;
}
function renameRelativeSharedModules(task, code) {
    var names = task.sharedModuleNames;
    for (var _a = 0, names_3 = names; _a < names_3.length; _a++) {
        var name = names_3[_a];
        var search = "\"./" + name + "\"";
        if (code.indexOf(search) > 0) {
            var replacement = "\"" + name + "\"";
            code = replaceAll(code, search, replacement);
        }
    }
    return code;
}
function fixRelativeSharedModulePaths(task) {
    var sharedModules = task.manifest.sharedModules;
    if (!sharedModules || sharedModules.length == 0) {
        trace("There are no shared modules");
        return;
    }
    trace("Converting relative shared module paths");
    fixRelativeSharedModulePathsRecusive(task, sharedModules, task.widgetTempDirectory);
}
function fixRelativeSharedModulePathsRecusive(task, sharedModules, directory) {
    var names = fs.readdirSync(directory);
    var isFolder;
    for (var _a = 0, names_4 = names; _a < names_4.length; _a++) {
        var name = names_4[_a];
        var filePath = path.join(directory, name);
        isFolder = fs.lstatSync(filePath).isDirectory();
        if (isFolder) {
            fixRelativeSharedModulePathsRecusive(task, sharedModules, filePath);
        }
        else {
            if (!name.endsWith(".js")) {
                continue;
            }
            var sourceCode = fs.readFileSync(filePath, "utf8");
            var modifiedCode = renameSharedModules(task, sharedModules, sourceCode);
            if (sourceCode !== modifiedCode) {
                info("Converting relative shared module paths: " + filePath);
                fs.writeFileSync(filePath, modifiedCode, "utf8");
            }
        }
    }
}
function renameSharedModules(task, sharedModules, sourceCode) {
    var sohoAbsolute = "@infor/sohoxi-angular/";
    for (var index = 0; index < sharedModules.length; index++) {
        var sharedModule = sharedModules[index];
        var name = sharedModule.name;
        var beforeNamePattern = "\".\/" + name + "\"";
        var afterNamePattern = "\"" + name + "\"";
        ;
        sourceCode = replaceAll(sourceCode, beforeNamePattern, afterNamePattern);
    }
    return sourceCode;
}
function fixRelativePathsByNgc(task, directory) {
    var names = fs.readdirSync(directory);
    var isFolder;
    for (var _a = 0, names_5 = names; _a < names_5.length; _a++) {
        var name = names_5[_a];
        var filePath = path.join(directory, name);
        isFolder = fs.lstatSync(filePath).isDirectory();
        if (isFolder) {
            fixRelativePathsByNgc(task, filePath);
        }
        else {
            if (!name.endsWith(".js")) {
                continue;
            }
            var sourceCode = fs.readFileSync(filePath, "utf8");
            var modifiedCode = renameDefinesAot(task, sourceCode);
            if (sourceCode !== modifiedCode) {
                info("Converting relative Soho XI paths for file: " + filePath);
                fs.writeFileSync(filePath, modifiedCode, "utf8");
            }
        }
    }
}
function renameDefinesAot(task, code) {
    var sohoAbsolute = "@infor/sohoxi-angular/";
    var sohoRelative = "scripts/typings/soho/";
    var limeAbsolute = "lime";
    var limeRelative = "scripts/typings/lime/index";
    var relativeSohoPath;
    var relativeLimePath;
    while (true) {
        relativeSohoPath = findRelativeTypingsPath(code, sohoRelative);
        if (relativeSohoPath) {
            trace("Converting " + relativeSohoPath + " to " + sohoAbsolute);
            code = replaceAll(code, relativeSohoPath, sohoAbsolute);
        }
        relativeLimePath = findRelativeTypingsPath(code, limeRelative);
        if (relativeLimePath) {
            trace("Converting " + relativeLimePath + " to " + limeAbsolute);
            code = replaceAll(code, relativeLimePath, limeAbsolute);
        }
        if (!relativeSohoPath && !relativeLimePath) {
            break;
        }
    }
    return code;
}
function findRelativeTypingsPath(code, search) {
    var index = code.indexOf(search);
    if (index < 0) {
        return null;
    }
    var currentIndex = index - 1;
    while (currentIndex > 0) {
        var c = code.charAt(currentIndex);
        if (c === "'" || c === "\"") {
            var relativePath = code.substring(currentIndex + 1, (index + search.length));
            info("Found relative path: " + relativePath);
            return relativePath;
        }
        if (!(c === "." || c === "/")) {
            return null;
        }
        currentIndex--;
    }
    return null;
}
function updateManifest(task) {
    var operation = begin("Updating manifest");
    var manifest = task.manifest;
    manifest.moduleName = task.widgetDirectoryName + "." + task.moduleName;
    var sharedModules = manifest.sharedModules;
    if (sharedModules) {
        for (var _a = 0, sharedModules_1 = sharedModules; _a < sharedModules_1.length; _a++) {
            var sharedModule = sharedModules_1[_a];
            sharedModule.isBundle = true;
        }
    }
    if (getBooleanArg("addDisplayVersion", false)) {
        info("Setting dislayVersion property: " + task.displayVersion);
        manifest.displayVersion = task.displayVersion;
    }
    if (getBooleanArg("asTenant", false)) {
        if (!manifest.displayVersion) {
            info("Setting dislayVersion property: " + task.displayVersion);
            manifest.displayVersion = task.displayVersion;
        }
        if (!manifest.widgetId.startsWith("tenant")) {
            var tenantWidgetId = "tenant." + manifest.widgetId;
            info("Setting widgetId: " + tenantWidgetId);
            manifest.widgetId = tenantWidgetId;
        }
        if (!manifest.author) {
            var author = "Widget Developer";
            info("Setting author: " + author);
            manifest.author = author;
        }
    }
    if (task.isAot) {
        var version = task.angularMajorVersion;
        if (version) {
            info("Setting aotVersion property: " + version);
            manifest.aotVersion = version;
            info("Setting sohoVersion property: " + sohoVersion);
            manifest.sohoVersion = sohoVersion;
        }
    }
    else if (manifest.aotVersion != null) {
        delete manifest.aotVersion;
        delete manifest.sohoVersion;
    }
    var filename = path.join(task.widgetTempDirectory, "widget.manifest");
    info("Manifest filename: " + filename);
    fs.writeFileSync(filename, JSON.stringify(manifest), "utf8");
    end(operation);
}
function packZip(task) {
    var operation = begin("Pack widget zip");
    var manifest = task.manifest;
    var widgetId = task.widgetDirectoryName;
    var outputName = task.manifest.widgetId + "-" + task.displayVersion;
    var extensions = [".png", ".jpg"];
    var sharedModules = manifest.sharedModules;
    var isMultiModule = task.isMultiModule;
    var moduleName = task.moduleName;
    var outputPath = path.join(task.outputDirectory, outputName + ".zip");
    var output = fs.createWriteStream(outputPath);
    var archive = archiver("zip");
    var zipDirectory = path.join(task.tempDirectory, task.widgetDirectoryName);
    output.on("close", function () {
        info("Created zip file: " + outputPath);
        end(operation);
        var message = _isMultiWidgetMode ? outputPath + "\n" : "\nWidget package file location:\n" + outputPath;
        exitSuccess(message, true);
    });
    archive.on("error", function (err) {
        error("Failed to create zip file: " + outputPath + " " + JSON.stringify(err));
        end(operation);
        exitError("");
    });
    var includeList = ["widget.manifest"];
    if (!task.isExternal) {
        includeList.push(isMultiModule ? widgetId + "." + moduleName + ".js" : moduleName + ".js");
        if (task.isAot) {
            includeList.push(widgetId + "." + moduleName + "-aot.js");
        }
        if (sharedModules && sharedModules.length) {
            includeList = includeList.concat(sharedModules.map(function (module) {
                var path = module.path;
                if (path) {
                    return path.substr(path.lastIndexOf("/", path.length) + 1) + ".js";
                }
                else {
                    return module.name + ".js";
                }
            }));
        }
        verifyFinalScriptFiles(task, includeList);
    }
    cleanFolderBeforeZip(archive, zipDirectory, includeList, extensions);
    archive.pipe(output);
    setTimeout(function () {
        archive.directory(zipDirectory, "");
        archive.finalize();
    }, ZIP_TIMEOUT);
}
function verifyFinalScriptFiles(task, filenames) {
    for (var _a = 0, filenames_1 = filenames; _a < filenames_1.length; _a++) {
        var filename = filenames_1[_a];
        var filePath = path.join(task.widgetTempDirectory, filename);
        if (!fse.existsSync(filePath)) {
            exitError("Mandatory file not found, expected: " + filePath);
            return;
        }
        trace("Verified mandatory file file: " + filename);
    }
}
function cleanFolderBeforeZip(archive, directory, includeList, extensions) {
    var names = fs.readdirSync(directory);
    var isFolder;
    for (var _a = 0, names_6 = names; _a < names_6.length; _a++) {
        var name = names_6[_a];
        var itemPath = path.join(directory, name);
        isFolder = fs.lstatSync(itemPath).isDirectory();
        if (isFolder) {
            trace("Deleting excluded directory: " + name);
            fse.removeSync(itemPath);
        }
        else {
            if (isMatch(includeList, name, extensions)) {
                trace("Found included file: " + name);
            }
            else {
                trace("Deleting excluded file: " + name);
                deleteFile(directory, name);
            }
        }
    }
}
function deleteFile(directory, fileName) {
    var options = { force: true };
    del(path.join(directory, fileName), options).then(function () {
        if (!fs.readdirSync(directory).length) {
            del(directory, options);
        }
    }, function (err) {
        error("Failed to delete " + fileName + " " + JSON.stringify(err));
    });
}
function execSync(command) {
    p.execSync(command, { stdio: "inherit" });
}
function resolveWidgetDirectory(task) {
    var widgetParameter = task.widgetParameter;
    var operation = begin("Resolve widget directory");
    var searchDirectory = widgetParameter;
    var widgetDirectory;
    if (fse.existsSync(searchDirectory)) {
        widgetDirectory = searchDirectory;
    }
    if (!widgetDirectory && task.basePath) {
        searchDirectory = path.join(task.basePath, widgetParameter);
        if (fse.existsSync(searchDirectory)) {
            widgetDirectory = searchDirectory;
        }
    }
    if (!widgetDirectory) {
        searchDirectory = path.join(task.scriptDirectory, widgetParameter);
        if (fse.existsSync(searchDirectory)) {
            widgetDirectory = searchDirectory;
        }
    }
    if (!widgetDirectory) {
        searchDirectory = path.join(path.join(task.scriptDirectory, "Widgets"), widgetParameter);
        if (fse.existsSync(searchDirectory)) {
            widgetDirectory = searchDirectory;
        }
    }
    if (!widgetDirectory) {
        error("Widget directory not found for " + widgetParameter);
        exitWithUsage(1);
        return;
    }
    task.widgetDirectory = widgetDirectory;
    info("Widget directory resolved to: " + widgetDirectory);
    end(operation);
}
function resolveRelativeDirectoryLocation(basePath, testPath) {
    var directory = path.join(basePath, testPath);
    if (fse.existsSync(directory)) {
        return "./";
    }
    var relativeDirectory = "";
    while (true) {
        relativeDirectory += "../";
        var relativeBaseDirectory = path.join(basePath, relativeDirectory);
        if (!path.basename(relativeBaseDirectory) || !fse.existsSync(relativeBaseDirectory)) {
            break;
        }
        directory = path.join(relativeBaseDirectory, testPath);
        if (fse.existsSync(directory)) {
            return relativeDirectory;
        }
    }
    return null;
}
function resolveRelativeNodeModulesPath(task) {
    if (_completedTask) {
        task.relativeNodeModulesPath = _completedTask.relativeNodeModulesPath;
        task.absoluteNodeModulesPath = _completedTask.absoluteNodeModulesPath;
        return;
    }
    var operation = begin("Resolve node_modules path");
    var basePath = __dirname;
    var testPath = "node_modules";
    var relativeDirectory = resolveRelativeDirectoryLocation(basePath, testPath);
    if (relativeDirectory) {
        task.relativeNodeModulesPath = relativeDirectory;
        task.absoluteNodeModulesPath = path.join(path.join(basePath, relativeDirectory), testPath);
        info("Resolved relative node_modules path: " + relativeDirectory);
        info("Resolved absolute node_modules path: " + task.absoluteNodeModulesPath);
    }
    else {
        exitError("Failed to resolve the path to the node_modules directory. The node_modules directory must exist in the same directory as this script or in a parent directory of this script.");
        return;
    }
    end(operation);
}
function resolveAngularVersion(task) {
    if (!task.isAot) {
        return;
    }
    var operation = begin("Resolve Angular version");
    var filename = path.join(task.absoluteNodeModulesPath, "@angular/core/package.json");
    if (!fse.existsSync(filename)) {
        error("Failed to resolve Angular version. Expected file: " + filename);
        return;
    }
    var content = fs.readFileSync(filename, "utf8");
    var packageJson = JSON.parse(content);
    var version = packageJson.version;
    if (version) {
        task.angularVersion = version;
        task.angularMajorVersion = version.split(".")[0];
        info("Angular version: " + version);
    }
    else {
        error("No version found in: " + filename);
    }
    end(operation);
}
function resolveRelativeScriptsPath(task) {
    var operation = begin("Resolve scripts path");
    var basePath = task.widgetDirectory;
    var testPath = "scripts/typings/lime";
    var relativeDirectory = resolveRelativeDirectoryLocation(basePath, testPath);
    if (relativeDirectory) {
        info("Resolved scripts path: " + relativeDirectory);
        task.relativeScriptsPath = relativeDirectory;
    }
    else {
        error("Failed to resolve relative script path, defaulting to \"./\" ");
        task.relativeScriptsPath = "./";
    }
    end(operation);
}
function validateAotWidgetFactoryModule(task) {
    var factoryFilename = task.moduleName + "-aot.ts";
    var filename = path.join(task.widgetDirectory, factoryFilename);
    if (!fse.existsSync(filename)) {
        exitError("Widget factory file for AOT missing. Expected: " + filename + "\n");
    }
}
function validateScreenshots(task) {
    var numScreenshots = task.manifest.screenshots;
    if (numScreenshots !== undefined) {
        info("Validating screenshots...");
        if (!Number.isInteger(numScreenshots)) {
            exitError("The 'screenshots' manifest property must be a number.");
        }
        if (numScreenshots < 1 || numScreenshots > 3) {
            exitError("Invalid number of screenshots: " + numScreenshots + ". Expected: 1, 2 or 3");
        }
        var screenshotFiles = fs.readdirSync(task.widgetDirectory).filter(function (filename) { return filename.match(/^screenshot\d*\.png$/); });
        if (screenshotFiles.length !== numScreenshots) {
            exitError("Manifest declares " + numScreenshots + " screenshot(s), but the directory contains " + screenshotFiles.length + " file(s) with valid names for screenshots.");
        }
        screenshotFiles.forEach(function (filename) {
            var maxSizeKB = 100;
            var filePath = path.join(task.widgetDirectory, filename);
            var stats = fs.statSync(filePath);
            var sizeKB = stats.size / 1000;
            if (sizeKB > maxSizeKB) {
                exitError("Screenshot file " + filename + " is too large (" + sizeKB + "KB). Maximum allowed is " + maxSizeKB + "KB");
            }
        });
    }
}
function validateWidgetId(task) {
    var widgetId = task.manifest.widgetId;
    if (widgetId.length > 64) {
        error("Widget id " + widgetId + " exceeds max length 64, recommended length is max 30");
    }
    var messageInfo = "Check the Developers Guide documentation for more information. Use lower case letters and dots.\n";
    var simpleReg = new RegExp(WidgetIdPattern);
    if (!simpleReg.test(widgetId)) {
        exitError("\nERROR: \nThe widget id " + widgetId + " has an invalid format. " + messageInfo);
    }
    else {
        var strictReg = new RegExp(WidgetIdPatternStrict);
        if (!strictReg.test(widgetId)) {
            error("\nWARNING: \nThe widget id " + widgetId + " does not have the recommended format. If this is new widget the widget id MUST be changed. " + messageInfo);
        }
    }
}
function validWidgetDirectoryPath(directory) {
    if (directory.indexOf(" ") >= 0) {
        var message = "Spaces are not allowed in the widget directory path due to issues with SystemJS builder.\n" +
            "Make sure that the following path do not contain any spaces:\n" + directory;
        exitError(message);
    }
}
function validate(task) {
    resolveWidgetDirectory(task);
    var operation = begin("Validate");
    var widgetDirectory = task.widgetDirectory;
    validWidgetDirectoryPath(widgetDirectory);
    var manifest = getManifest(widgetDirectory);
    task.manifest = manifest;
    validateScreenshots(task);
    validateWidgetId(task);
    executeInitialize(task);
    if (manifest.type !== "inline") {
        task.isExternal = true;
    }
    info("Type: " + (task.isExternal ? "external" : "inline"));
    if (!manifest.moduleName) {
        manifest.moduleName = "widget";
    }
    task.moduleName = manifest.moduleName;
    info("Widget module name: " + task.moduleName);
    task.widgetDirectoryName = path.basename(task.widgetDirectory);
    var widgetId = manifest.widgetId;
    if (getBooleanArg("validateDirectory", true)) {
        if (task.widgetDirectoryName !== widgetId) {
            error("Widget source code must be located in a folder with the same name as the widget id (" + widgetId + "). \n\nThis script cannot be used unless the folder: " + task.widgetDirectoryName + " is changed to: " + widgetId);
            exitWithUsage(1);
            return;
        }
    }
    if (task.isAot) {
        validateAotWidgetFactoryModule(task);
    }
    var sharedModules = manifest.sharedModules;
    if (sharedModules) {
        for (var _a = 0, sharedModules_2 = sharedModules; _a < sharedModules_2.length; _a++) {
            var sharedModule = sharedModules_2[_a];
            task.sharedModuleNames.push(sharedModule.name);
        }
    }
    task.displayVersion = manifest.version + "." + getTimestamp();
    end(operation);
}
function getBuildTasksArray(task) {
    var tasks = [];
    var widgets = getArg("widgets");
    if (widgets) {
        trace("widgets parameter: " + widgets);
    }
    var widgetParameter = task.widgetParameter;
    var multiWidgetParameter = getArg("widgets");
    if (!widgetParameter && !multiWidgetParameter) {
        error("No widget specified");
        exitWithUsage(1);
        return;
    }
    if (widgetParameter && multiWidgetParameter) {
        error("Invalid parameters. Using the default or the widget parameter and the widgets paramameter is not allowed.");
        exitWithUsage(1);
        return;
    }
    if (widgets && widgets.length > 0) {
        var widgetArray = widgets.split(",");
        var resultArray = [];
        widgetArray.forEach(function (widgetDirectory) {
            var trimmed = widgetDirectory.trim();
            if (trimmed.length > 0 && !trimmed.startsWith("_lime_temp_")) {
                resultArray.push(trimmed);
            }
        });
        var count = resultArray.length;
        if (count == 0) {
            trace("widgets parameter is used but one or no widget");
        }
        else if (count == 1) {
            trace("widgets parameter is used with single widget");
        }
        for (var _a = 0, resultArray_1 = resultArray; _a < resultArray_1.length; _a++) {
            var widget = resultArray_1[_a];
            var newTask = JSON.parse(JSON.stringify(task));
            newTask.widgetParameter = widget;
            tasks.push(newTask);
        }
    }
    else {
        task.widgetParameter = widgetParameter;
        tasks.push(task);
    }
    return tasks;
}
function createTempDirectory(task) {
    var name = "_lime_temp_" + new Date().getTime();
    var directory = path.join(path.join(task.widgetDirectory, "../", name));
    createDirectory(directory);
    task.tempDirectory = directory;
    task.widgetTempDirectory = path.join(directory, task.widgetDirectoryName);
    _tempDirectory = directory;
}
function resolveOutputDirectory(task) {
    if (_completedTask) {
        task.outputDirectory = _completedTask.outputDirectory;
        return;
    }
    var operation = begin("Resolve output directory");
    var directory = getArg("outputPath");
    if (directory) {
        createDirectory(directory);
        if (fse.existsSync(directory)) {
            task.outputDirectory = directory;
        }
    }
    if (!task.outputDirectory) {
        directory = path.join(task.scriptDirectory, "Builds");
        createDirectory(directory);
        task.outputDirectory = directory;
    }
    info("Output directory resolved to: " + directory);
    end(operation);
}
function copyBuildFiles(task) {
    var sourceDir = task.widgetDirectory;
    var targetDir = path.join(task.tempDirectory, task.widgetDirectoryName);
    var tempDirectoryName = path.basename(task.tempDirectory);
    var options = {
        filter: function (name) {
            return !(name.indexOf("_lime_temp_") >= 0);
        }
    };
    ncp(sourceDir, targetDir, options, function (err) {
        if (err) {
            error("Failed to copy files " + err);
            exitWithUsage(1);
            return;
        }
        packBuild(task);
    });
}
function executeInitialize(task) {
    var aotVersion = task.manifest.aotVersion;
    var isAot = aotVersion != undefined && aotVersion != null;
    if (isAot && getBooleanArg("aot", true)) {
        task.isAot = true;
    }
    task.isMultiModule = true;
}
function executeResolve(task) {
    resolveRelativeScriptsPath(task);
    resolveRelativeNodeModulesPath(task);
    resolveAngularVersion(task);
    resolveOutputDirectory(task);
}
function executeBuild(task) {
    if (task.isAot) {
        buildTypeScriptNgc(task);
        fixRelativePathsByNgc(task, task.widgetTempDirectory);
    }
    buildTypeScriptTsc(task);
    fixRelativeSharedModulePaths(task);
}
function executeBundle(task) {
    var isAot = task.isAot;
    var sharedModules = task.sharedModuleNames;
    if (sharedModules) {
        for (var _a = 0, sharedModules_3 = sharedModules; _a < sharedModules_3.length; _a++) {
            var sharedModule = sharedModules_3[_a];
            bundleWithSystemJs(task, isAot, sharedModule);
        }
    }
    if (isAot) {
        bundleWithSystemJs(task, true);
    }
    bundleWithSystemJs(task, false);
}
function executeManifestUpdate(task) {
    if (task.isMultiModule) {
        updateManifest(task);
    }
}
function executeZip(task) {
    if (task.isZip) {
        packZip(task);
    }
}
function packBuild(task) {
    try {
        executeResolve(task);
        if (!task.isExternal) {
            executeBuild(task);
            executeBundle(task);
        }
        else {
            info("Build phase skipped for external widget");
        }
        executeManifestUpdate(task);
        executeZip(task);
    }
    catch (ex) {
        exitError(ex);
    }
}
function pack(task) {
    if (_isMultiWidgetMode) {
        info("");
        info("Package");
        info("-------");
        info("Widget package: " + task.widgetParameter);
    }
    validate(task);
    createTempDirectory(task);
    copyBuildFiles(task);
}
function deleteTempDirectory() {
    try {
        if (!getBooleanArg("clearTemp", true)) {
            return;
        }
        if (!_tempDirectory || !fse.existsSync(_tempDirectory)) {
            return;
        }
        var operation = begin("Delete temporary directory");
        fse.removeSync(_tempDirectory);
        info("Deleted directory: " + _tempDirectory);
        end(operation);
    }
    catch (ex) {
        error("Failed to delete temporary directory: " + _tempDirectory + " - " + ex);
    }
}
function generateManifestTypes(task) {
    resolveWidgetDirectory(task);
    var fileContent = createFileContent();
    writeToFile("manifest-types.d.ts", fileContent);
    function createFileContent() {
        var result = "";
        var _a = parseManifest(), language = _a.language, settings = _a.settings;
        result += addHeader();
        result += addImports();
        result += addLanguageInterface(language);
        result += addSettingsInterface(settings);
        return result;
    }
    function parseManifest() {
        var manifest = getManifest(task.widgetDirectory);
        return {
            language: parseLanguage(manifest),
            settings: parseSettings(manifest),
        };
    }
    function parseLanguage(manifest) {
        if (manifest && manifest.localization && manifest.localization["en-US"]) {
            return manifest.localization["en-US"];
        }
        else {
            info("en-US localization not found in manifest. Language constants will not be generated.");
            return {};
        }
    }
    function parseSettings(manifest) {
        if (manifest.settings && manifest.settings.length) {
            return manifest.settings;
        }
        else {
            info("Manifest does not contain any settings. Settings constants will not be generated.");
            return [];
        }
    }
    function addHeader() {
        var result = "";
        result += "// NOTE: This file has been automatically generated. It should never be manually edited.\n";
        result += "/* tslint:disable */\n";
        return result;
    }
    function addImports() {
        var result = "";
        result += "import { ILanguage } from \"lime\";\n";
        return result;
    }
    function addLanguageInterface(localization) {
        var result = "";
        result += "export interface IManifestLanguage extends ILanguage<IManifestLanguage> {\n";
        Object.keys(localization).sort(sortAlphabetically).forEach(function (localizationKey) {
            result += formattedInterfaceProperty(localizationKey, "string", localization[localizationKey]);
        });
        result += "}\n";
        return result;
    }
    function addSettingsInterface(settings) {
        var result = "";
        result += "export interface IManifestSettings {\n";
        settings.sort(sortSettingsAlphabetically).forEach(function (setting) {
            result += formattedInterfaceProperty(setting.name, mapSettingType(setting.type), "Type: " + setting.type);
        });
        result += "}\n";
        return result;
        function mapSettingType(settingType) {
            switch (settingType) {
                case "boolean":
                    return settingType;
                case "number":
                    return settingType;
                case "string":
                    return settingType;
                case "object":
                    return "any";
                case "radio":
                    return "any";
                case "selector":
                    return "any";
                default:
                    return "any";
            }
        }
    }
    function formattedInterfaceProperty(name, type, comment) {
        if (type === void 0) { type = "unknown"; }
        var result = "";
        if (comment) {
            result += "\t/** " + escape(comment) + " */\n";
        }
        result += "\t" + escape(name) + ": " + type + ";\n";
        return result;
    }
    function escape(text) {
        if (text.length) {
            return JSON.stringify(text).replace(/^\"(.+)\"$/, "$1");
        }
        else {
            return "";
        }
    }
    function writeToFile(filename, content) {
        var filePath = path.join(task.widgetDirectory, filename);
        info("Writing to " + filePath);
        fs.writeFileSync(filePath, content, "utf8");
    }
    function sortSettingsAlphabetically(settingA, settingB) {
        return sortAlphabetically(settingA.name, settingB.name);
    }
    function sortAlphabetically(a, b) {
        return a.localeCompare(b);
    }
}
function _exit(code) {
    process.exit(code);
}
function exitSuccess(message, isFinalMessage) {
    if (message && !isFinalMessage) {
        info(message);
    }
    deleteTempDirectory();
    if (_isMultiWidgetMode) {
        _finalSuccessMessage = _finalSuccessMessage + message;
    }
    _completedTask = _buildTasksArray.shift();
    var isCompleted = _buildTasksArray.length == 0;
    if (isCompleted) {
        info("");
        info("Command completed successfully.");
        info("");
    }
    if (message && isFinalMessage && !isCompleted) {
        info(message);
    }
    if (!isCompleted) {
        var nextTask = _buildTasksArray[0];
        pack(nextTask);
    }
    else {
        if (_isMultiWidgetMode) {
            info("");
            info("Summary");
            info("-------");
            info("Widget package file location:\n");
            info(_finalSuccessMessage);
        }
        else {
            info(message + "\n");
        }
        info("");
        _exit(0);
    }
}
function exitError(message) {
    error("");
    if (typeof message === "object") {
        if (message.message) {
            error(message.message);
        }
        if (message.stack) {
            error(message.stack);
        }
    }
    else if (typeof message === "string") {
        error(message);
    }
    deleteTempDirectory();
    error("");
    error("Command completed with errors.");
    error("");
    if (_isMultiWidgetMode && _finalSuccessMessage.length > 0) {
        info("Build cancelled due to an error. The following build(s) completed:");
        info(_finalSuccessMessage);
    }
    _exit(1);
}
function exitWithUsage(code) {
    printUsage();
    _exit(code);
}
function info(message) {
    if (!_silent) {
        console.log(message);
    }
}
function warn(message) {
    console.warn(message);
}
function trace(message) {
    if (!_silent && _trace) {
        console.log(message);
    }
}
function error(message) {
    console.error(message);
}
function getBooleanArg(name, defaultValue) {
    var value = _argv[name];
    if (value == null || value === undefined) {
        return defaultValue;
    }
    return value === true || (value != null && value.toString().toLowerCase() === "true");
}
function getArg(name) {
    var value = _argv[name];
    return value != null ? value.toString() : value;
}
function printUsage() {
    info("");
    info("Usage");
    info("-----");
    info("node homepages [command] [parameters]");
    info("");
    info("Commands:");
    info("pack                Builds, minifies, bundles and creates a widget zip package");
    info("generate-types      Generate TypeScript types from manifest");
    info("help                Prints usage information");
    info("");
    info("Parameters:");
    info("--widget            The directory name of a widget. Directory names can be absolute or relative.");
    info("--widgets           One or more widget directory names separated by comma (,). Directory names can be absolute or relative.");
    info("--outputPath        The path to directory where the widget zip file will be created. Default: ./Builds");
    info("--basePath          Optional base path used to resolve relative widget directory paths.");
    info("--addDisplayVersion Adds or updates the displayVersion property in the widget manifest. Default: false");
    info("");
    info("Advanced parameters:");
    info("--clearTemp               Clears the temporary directory after command completion. Default: true");
    info("--mangle                  Mangles the JavaScript code. Default: true");
    info("--minify                  Minifies the JavaScript code. Default: true");
    info("--silent                  Run in silent mode with minimal console output. Default: false");
    info("--trace                   Output trace information to the console. Default: false");
    info("--zip                     Creates the widget zip packages. Default: true");
    info("--aot                     Compiles with Angular AOT for widget manifests that contains the aotVersion property. Default: true");
    info("--fullTemplateTypeCheck   Perform full Angular AOT template checks. Default: false");
    info("--asTenant                Pack the widget as an unsigned Tenant Widget for testing purposes. Default: false");
    info("");
    info("Examples");
    info("--------");
    info("node homepages pack --widget \"Widgets/infor.sample.angular.helloworld\" --outputPath \"C:\\Builds\"");
    info("node homepages pack --widget \"C:\\\\Source\\Widgets\\infor.sample.angular.helloworld\" --outputPath \"C:\\Builds\"");
    info("node homepages pack \"Widgets/infor.sample.angular.helloworld\"");
    info("node homepages generate-types \"Widgets/infor.sample.angular.helloworld\"");
    info("");
    info("Advanced examples");
    info("-----------------");
    info("Build troubleshooting example that keeps the build output in the temp directory.");
    info("node homepages pack \"Widgets/infor.sample.angular.helloworld\" --clearTemp=false --zip=false --trace");
    info("");
}
function start() {
    info("");
    info("Homepages SDK");
    info("=============");
    var argv = parseArgs(process.argv.slice(2));
    var commands = argv._;
    if (commands.length == 0) {
        error("No command specified");
        printUsage();
        _exit(1);
        return;
    }
    var command = commands[0];
    info("Command: " + command);
    _argv = argv;
    _trace = getBooleanArg("trace", false);
    _silent = getBooleanArg("silent", false);
    var commandValue = commands.length > 1 ? commands[1] : null;
    var widgetParameter = argv.widget || commandValue;
    var task = {
        argv: argv,
        command: command,
        commandValue: commandValue,
        scriptDirectory: __dirname,
        sharedModuleNames: [],
        isMinify: getBooleanArg("minify", true),
        isMangle: getBooleanArg("mangle", true),
        isZip: getBooleanArg("zip", true),
        widgetParameter: widgetParameter,
        basePath: getArg("basePath")
    };
    if (command == "help") {
        printUsage();
        _exit(0);
    }
    if (task.basePath && !fse.existsSync(task.basePath)) {
        error("Base path not found: " + task.basePath);
        exitWithUsage(1);
        return;
    }
    if (command == "pack") {
        _buildTasksArray = getBuildTasksArray(task);
        _isMultiWidgetMode = _buildTasksArray.length > 1;
        task = _buildTasksArray[0];
        pack(task);
    }
    else if (command === "generate-types") {
        _buildTasksArray = getBuildTasksArray(task);
        task = _buildTasksArray[0];
        generateManifestTypes(task);
    }
    else {
        error("The command \"" + command + "\" is not supported");
        exitWithUsage(1);
    }
}
start();
