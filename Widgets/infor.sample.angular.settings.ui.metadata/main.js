/**
 * NOTE:
 * A custom settings UI shall only be implemented if settings are dynamic, for instance based on data
 * retrieved from a server and. Or if the settings structure is complicated, and not possible to handle using
 * supported metadata setting types (string, boolean, number, selector). For other cases, use metadata settings
 * handled by the default settings UI.
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
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "./core", "./settings", "./title-setting"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, core_2, settings_1, title_setting_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetModule = exports.WidgetComponent = void 0;
    var WidgetComponent = /** @class */ (function () {
        function WidgetComponent() {
            this.textStyle = {};
        }
        WidgetComponent.prototype.ngOnInit = function () {
            this.setupWidgetInstanceListeners();
            this.updateFromSettings(this.widgetContext.getSettings());
        };
        WidgetComponent.prototype.setupWidgetInstanceListeners = function () {
            var _this = this;
            this.widgetInstance.restored = function () { return _this.widgetContext.setStandardTitle(); };
            this.widgetInstance.settingsSaved = function (settingsArg) { return _this.updateFromSettings(settingsArg.settings); };
            this.widgetInstance.widgetSettingsFactory = function () {
                return {
                    angularConfig: {
                        componentType: settings_1.SettingsComponent,
                    },
                };
            };
        };
        WidgetComponent.prototype.updateFromSettings = function (settings) {
            var color = settings.get(core_2.SettingKey.Color);
            var textStyle = settings.get(core_2.SettingKey.Style).toLowerCase();
            this.textStyle.color = color;
            if (textStyle === "bold") {
                this.textStyle.fontWeight = textStyle;
            }
            else {
                this.textStyle.fontStyle = textStyle;
            }
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], WidgetComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], WidgetComponent.prototype, "widgetInstance", void 0);
        WidgetComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"lm-text-align-c lm-padding-xl\">\n\t\t<span class=\"label lm-margin-xl-b\">\n\t\t\tThis widget shows how to implement a Custom Settings UI using Angular.\n\t\t\tThe Settings UI can be used to change the style and color of the text shown below.\n\t\t</span>\n\t\t<h1 [style.color]=\"textStyle.color\"\n\t\t\t [style.fontStyle]=\"textStyle.fontStyle\"\n\t\t\t [style.fontWeight]=\"textStyle.fontWeight\">\n\t\t\tColored Text\n\t\t</h1>\n\t</div>\n\t",
            })
        ], WidgetComponent);
        return WidgetComponent;
    }());
    exports.WidgetComponent = WidgetComponent;
    var WidgetModule = /** @class */ (function () {
        function WidgetModule() {
        }
        WidgetModule = __decorate([
            core_1.NgModule({
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    sohoxi_angular_1.SohoButtonModule,
                    sohoxi_angular_1.SohoBusyIndicatorModule,
                    sohoxi_angular_1.SohoDropDownModule,
                    sohoxi_angular_1.SohoColorPickerModule
                ],
                declarations: [
                    WidgetComponent,
                    settings_1.SettingsComponent,
                    title_setting_1.TitleSettingComponent
                ],
                entryComponents: [
                    WidgetComponent,
                    settings_1.SettingsComponent
                ],
            })
        ], WidgetModule);
        return WidgetModule;
    }());
    exports.WidgetModule = WidgetModule;
});
//# sourceMappingURL=main.js.map