/**
 * This script will go through .resx files and copy translations to the localization object of specified widgets.
 * 
 * Usage:
 * node .\LangFromResxToManifests.js <baseLineResx> <pathToResxFiles> true <widgetFolderNames>
 * <baseLineResx>           File used as the baseline for translations, usually en-US.
 * <pathToResxFiles>        Path to a folder containing .resx-files. Filename should be <languageCode>-Widgets.resx.
 *                          Example: en-US-Widgets.resx
 * <checkSubdirectories>    If true, the script assumes that each specified folder in <widgetFolderNames> contains one or more widget folders.
 *                          If false, the script assumes that each folder specified in <widgetFolderNames> is a widget folder.
 * <widgetFolderNames>      One or more paths to folder(s) containing widget folders.
 *                          Or, one or more direct path to widget folder(s).
 * 
 * Example:
 * node .\LangFromResxToManifests.js \Translations\en-US-Widgets.resx \Translations true \Widgets
 * or
 * node .\LangFromResxToManifests.js \Translations\en-US-Widgets.resx \Translations false \Widgets\infor.sample.angular.helloworld
 */
const fs = require("fs");
const path = require("path");
const jsonFromResx = require("jsonfromresx");
const widgetTitleMaxLength = 40;
const widgetTitleMaxDescription = 1024;
const baselineFileLocation = __dirname + process.argv[2];
const resourceFolder = process.argv[3];
const checkSubdirectories = (process.argv[4] === "true");
const widgetFolders = process.argv.splice(5);
let resourceFilesPaths = [];
let widgetManifestPaths = [];
let baselineTranslations;
let hasWarnings = false;
let hasErrors = false;

/**
 * Create an object based on the baseline file. This will be used to check the other resx files
 * and provide the baseline localization if a translation does not exist.
 */
function getBaseline() {
    return new Promise((resolve, reject) => {
        fs.readFile(baselineFileLocation, "utf8", (err) => {
            if (!err) {
                jsonFromResx.convert(baselineFileLocation, null, null, function (result) {
                    if (result) {
                        resolve(result);
                    } else {
                        reject("Could not create a baseline file.");
                    }
                });
            } else {
                reject("ERROR: Could not find baseline file at " + baselineFileLocation);
                hasErrors = true;
            }
        });
    });
}

/**
 * Creates an object containing all translations.
 */
function getAllTranslations(baseline) {
    return new Promise((resolve, reject) => {
        let allTranslations = {};
        let processedFilesCount = 0;
        let nrOfFiles = resourceFilesPaths.length;

        // Go through each resx file and save the languages and their translations to one object.
        resourceFilesPaths.forEach((resourceFilePath) => {
            const langCode = path.basename(resourceFilePath).slice(0, 5);
            allTranslations[langCode] = {}

            // Convert resx to json
            try {
                jsonFromResx.convert(resourceFilePath, null, null, function (resourceJson) {

                    console.log("");
                    console.log("Processing language: " + langCode);

                    // For each entry in the baseline file, copy the corresponding entry from the resource file.
                    // If an entry does not exist in the resource file, use the baseline value.
                    for (let key in baseline) {
                        if (baseline.hasOwnProperty(key)) {
                            try {
                                // Give warning if the title is longer than allowed
                                if ((key.indexOf("widgetTitle") != -1) && resourceJson[key] && (resourceJson[key].length > widgetTitleMaxLength)) {
                                    console.log("---------------------------------------------------------------");
                                    console.log(`WARNING! Widget title is longer than the allowed ${widgetTitleMaxLength} characters`);
                                    console.log(`Term: ${key}`);
                                    console.log(`Length: ${resourceJson[key].length}`);
                                    console.log("---------------------------------------------------------------");
                                    hasWarnings = true;
                                }

                                // Give warning if the description is longer than allowed
                                if ((key.indexOf("widgetDescription") != -1) && resourceJson[key] && (resourceJson[key].length > widgetTitleMaxDescription)) {
                                    console.log("---------------------------------------------------------------");
                                    console.log(`WARNING! Widget description is longer than the allowed ${widgetTitleMaxDescription} characters`);
                                    console.log(`Term: ${key}`);
                                    console.log(`Length: ${resourceJson[key].length}`);
                                    console.log("---------------------------------------------------------------");
                                    hasWarnings = true;
                                }

                                if (resourceJson[key]) {
                                    allTranslations[langCode][key] = resourceJson[key];
                                } else {
                                    allTranslations[langCode][key] = baseline[key];
                                    console.log(`WARNING! ${key} does not exist for ${langCode}. Using en-US translation for this term.`);
                                }
                            } catch (e) {
                                hasErrors = true;
                                console.log(`ERROR! Could not process key: ${key}, with value: ${resourceJson[key]}.`)
                            }
                        }
                    }

                    processedFilesCount++;
                    if (processedFilesCount === nrOfFiles) {
                        resolve(allTranslations);
                    }

                });
            } catch (err) {
                reject(`ERROR: Could not process resource file at location ${resourceFilePath}`);
                hasErrors = true;
            }
        });
    });
}

/**
 * Copies translations to specified widget manifests.
 */
function copyToManifests(allTranslations) {
    return new Promise((resolve, reject) => {
        let processedFilesCount = 0;
        let nrOfFiles = widgetManifestPaths.length;

        widgetManifestPaths.forEach((widgetManifestPath) => {
            try {
                let manifest = JSON.parse(fs.readFileSync(widgetManifestPath, "utf8"));
                const widgetId = manifest.widgetId;
                manifest.localization = {};

                // Create alphabetically ordered array with language codes.
                let sortedLangCodes = Object.keys(allTranslations).sort((a, b) => {
                    if (a < b) return -1;
                    if (a > b) return 1;
                    return 0;
                });

                sortedLangCodes.forEach((language) => {
                    for (let key in allTranslations[language]) {
                        if (key.indexOf(widgetId + "_") === 0) {

                            if(!manifest.localization[language]) {
                                manifest.localization[language] = {};
                            }

                            const term = key.replace(widgetId + "_", "");
                            manifest.localization[language][term] = allTranslations[language][key];
                        }
                    }
                })
                fs.writeFileSync(widgetManifestPath, JSON.stringify(manifest, null, 4), (err) => {
                    processedFilesCount++;
                    if (processedFilesCount === nrOfFiles) {
                        resolve();
                    }
                });
            } catch (err) {
                console.log(`WARNING! Could not process manifest at location ${widgetManifestPath}`);
                hasWarnings = true;
            }

        })
        resolve();
    });
}

// ----- Script start ----- //

// Get resource files.
try {
    const files = fs.readdirSync(__dirname + "\\" + resourceFolder, "utf8");
    files.forEach((file) => {
        const validFile = file.match(new RegExp("-Widgets.resx"));
        if (validFile) {
            resourceFilesPaths.push(__dirname + "\\" + resourceFolder + "\\" + validFile.input);
        }
    });
} catch (err) {
    console.log(`ERROR: Could not read resource files at location ${__dirname + "\\" + resourceFolder}`);
    hasErrors = true;
}

// Get paths to the widget manifests.
if (checkSubdirectories) {
    widgetFolders.forEach((folder) => {
        const folders = fs.readdirSync(__dirname + "\\" + folder);
        folders.forEach((subFolder) => {
            if (fs.statSync(__dirname + "\\" + folder + "\\" + subFolder).isDirectory()) {
                widgetManifestPaths.push(__dirname + "\\" + folder + "\\" + subFolder + "\\" + "widget.manifest");
            }
        });
    })
} else {
    widgetFolders.forEach((folder) => {
        widgetManifestPaths.push(__dirname + "\\" + folder + "\\" + "widget.manifest");
    });
}

// Get baseline translation object on which to base other translations on.
getBaseline().then((baseline) => {
    // Get an object containing all the translations.
    console.log("");
    console.log("Converting resx files to json...");
    getAllTranslations(baseline).then((allTranslations) => {
        // Copy translations from translations object to each specified widget manifest.
        console.log("");
        console.log("Copying translations to manifests...");
        copyToManifests(allTranslations).then(() => {
            let msg;

            if (hasErrors) {
                msg = "Finished with errors!"
            } else if (hasWarnings) {
                msg = "Finished with warnings!";
            } else {
                msg = "Finised!";
            }

            console.log("");
            console.log(msg);

        }).catch((reason) => { console.log(reason); });
    }).catch((reason) => { console.log(reason); });
}).catch((reason) => { console.log(reason); });