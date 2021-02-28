/**
 * This is a sample widget which can be minified.
 *
 * Addtional information about minification can be found in the
 * /Samples/ReadMe.md and /Documentation/DevelopersGuide.pdf files.
 *
 * When developing your own widget, which you want to minify, the following prerequisites are needed:
 *
 * Your structure should look something like this [Example top folder name = my.widget.top.folder.name]
 * my.widget.id.folder.name/
 * my.widget.id.folder.name/widget.ts
 * my.widget.id.folder.name/widget.manifest
 *
 * Option files for Angular and AOT
 * my.widget.id.folder.name/widget-aot.ts
 * my.widget.id.folder.name/main.ts
 *
 * Please note that images are no longer supported to be in a folder. Code files can still be in subdirectories as they
 * will be bundled, but images must be in the root level. The Homepages framework will no longer support directories for
 * images.
 *
 * Specific content that is needed are marked REQUIRED in files
 * [widget.ts] (read comments in file for the specifics)
 *
 * When you have added all the needed changes based on the comments you are ready to minify your widget.
 *
 * The following preparation steps are only required once and you may already have done these steps previously.
 * If you have updated the Homepages SDK you should always perform this step again.
 *
 * 1. Open a command window in the Samples directory.
 * 2. Verify that Node.js is installed by running the command "node -v". Install Node.js if missing.
 * 3. Install the Node.js dependencies using the command "npm install", on Windows you can also run "Install.cmd"
 *
 * A widget can be minified and a package will be created using the following step:
 * 1. Run the homepages script with the command pack to bundle and minify the widget, and create a production zip file.
 *
 * node homepages pack --widget "infor.sample.minify"
 *
 * The output of the final command is a widget zip file with a name such as:
 * ./Build/infor_sample_minify_1_0_20170305_073216.zip
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./dialog/dialog"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActions = exports.MinifySampleModule = exports.MinifySampleComponent = void 0;
    var MinifySampleComponent = /** @class */ (function () {
        function MinifySampleComponent(sohoDialogService) {
            this.sohoDialogService = sohoDialogService;
            this.buttonMessage = "Divide images";
            this.show = true;
        }
        MinifySampleComponent.prototype.ngOnInit = function () {
            var _this = this;
            /*
             * REQUIRED for image resources
             *
             * When minifying a widget, resources will be copied such as (.png, .jpg, .gif)
             * When you are using such resources you must use the
             * this.widgetContext.getUrl() function to reference the resources.
             */
            this.topIcon = this.widgetContext.getUrl("/top.png");
            this.middleIcon = this.widgetContext.getUrl("/middle.png");
            this.bottomIcon = this.widgetContext.getUrl("/bottom.png");
            this.widgetInstance.actions[0].execute = function () { return _this.createDialog(); };
        };
        MinifySampleComponent.prototype.toggleClass = function () {
            if (this.show) {
                this.show = false;
                this.buttonMessage = "Combine images";
            }
            else {
                this.show = true;
                this.buttonMessage = "Divide images";
            }
        };
        MinifySampleComponent.prototype.createDialog = function () {
            var myParameters = {
                topIcon: this.topIcon,
                middleIcon: this.middleIcon,
                bottomIcon: this.bottomIcon
            };
            var dialog = this.sohoDialogService
                .modal(dialog_1.MyDialogComponent, this.dialogViewRef)
                .title("My dialog")
                .afterClose(function (result) {
                lime_1.Log.debug("Dialog result:", result);
            });
            dialog.apply(function (component) {
                component.dialog = dialog;
                component.parameters = myParameters;
            }).open();
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], MinifySampleComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], MinifySampleComponent.prototype, "widgetInstance", void 0);
        __decorate([
            core_1.ViewChild("dialogViewRef", { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], MinifySampleComponent.prototype, "dialogViewRef", void 0);
        MinifySampleComponent = __decorate([
            core_1.Component({
                template: "\n\t<div #dialogViewRef class=\"infor-sample-minify-widget\">\n\t\t<div class=\"lm-text-align-c\">\n\t\t\t<button soho-button=\"icon\" icon=\"minimize\" toggle=\"maximize\" (click)=\"toggleClass()\"></button>\n\t\t\t{{buttonMessage}}\n\t\t</div>\n\t\t<div>\n\t\t\t<img class=\"merge\" src=\"{{topIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t\t<img class=\"merge\" src=\"{{middleIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t\t<img class=\"merge\" src=\"{{bottomIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t</div>\n\t</div>\n\t",
                styles: ["\n\t\t.infor-sample-minify-widget .merge{display:inline;margin-bottom:5px;}\n\t\t.infor-sample-minify-widget .merge.show{display:block;margin-bottom:0;}\n\t"]
            }),
            __metadata("design:paramtypes", [sohoxi_angular_1.SohoModalDialogService])
        ], MinifySampleComponent);
        return MinifySampleComponent;
    }());
    exports.MinifySampleComponent = MinifySampleComponent;
    var MinifySampleModule = /** @class */ (function () {
        function MinifySampleModule() {
        }
        MinifySampleModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoButtonModule, sohoxi_angular_1.SohoModalDialogModule],
                declarations: [MinifySampleComponent, dialog_1.MyDialogComponent],
                entryComponents: [MinifySampleComponent, dialog_1.MyDialogComponent]
            })
        ], MinifySampleModule);
        return MinifySampleModule;
    }());
    exports.MinifySampleModule = MinifySampleModule;
    exports.getActions = function () {
        return [{
                isPrimary: true,
                standardIconName: "#icon-add",
                text: "Open Dialog"
            }];
    };
});
//# sourceMappingURL=main.js.map