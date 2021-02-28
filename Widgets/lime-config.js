SystemJS.config({
	authorization: true,
	transpiler: false,
	meta: {
		"*": {
			authorization: true
		}
	},
	map: {
		"@angular/common": "node_modules/@angular/common/bundles/common.umd.js",
		"@angular/common/http": "node_modules/@angular/common/bundles/common-http.umd.js",
		"@angular/compiler": "node_modules/@angular/compiler/bundles/compiler.umd.js",
		"@angular/core": "node_modules/@angular/core/bundles/core.umd.js",
		"@angular/forms": "node_modules/@angular/forms/bundles/forms.umd.js",
		"@angular/platform-browser": "node_modules/@angular/platform-browser/bundles/platform-browser.umd.js",
		"@angular/platform-browser-dynamic": "node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
		"@angular/router": "node_modules/@angular/router/bundles/router.umd.js",
		"tslib": "scripts/vendor/tslib.js",
		"@infor/sohoxi-angular": "scripts/soho/index",
		"@infor/sohoxi-angular/": "scripts/soho/",
		"lime": "scripts/lime/core/lime.js",
		"lime/core": "scripts/lime/core/index",
		"lime/common": "scripts/lime/common/index",
		"lime.lazy": "scripts/lime/lazy/lazy.module-aot",
		"main": "scripts/lime/core/main-aot.js",
		"marked": "node_modules/marked/marked.min.js",
		"yggdrasil": "yggdrasil/yggdrasil.mock.js",
		"ng-yggdrasil": "yggdrasil/ng-yggdrasil.mock.js",
		"rxjs/operators/": "node_modules/rxjs/operators/",
		"rxjs/operators": "node_modules/rxjs/operators/index.js",
		"rxjs/": "node_modules/rxjs/",
		"rxjs": "node_modules/rxjs/index.js",
		"sample-shared-usercontext": "infor.sample.sharedmodule/sample-shared-usercontext"
	},
	paths: {
		"@infor/sohoxi-angular/*": "scripts/soho/*.js"
	},
	packages: {
		"scripts": {
			defaultExtension: "js"
		},
		"scripts/soho": {
			main: "index.js",
			defaultExtension: "js"
		},
		"node_modules": {
			defaultExtension: "js"
		}
	}
});
