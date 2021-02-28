var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "@infor/sohoxi-angular", "./core", "./title-setting"], function (require, exports, core_1, sohoxi_angular_1, core_2, title_setting_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SettingsComponent = void 0;
    var SettingsComponent = /** @class */ (function () {
        function SettingsComponent() {
        }
        SettingsComponent.prototype.ngOnInit = function () {
            this.initFromSettings();
            this.fetchStyleSettingsAsync();
            this.setupSettingsClosingHandler();
        };
        SettingsComponent.prototype.initFromSettings = function () {
            var widgetContext = this.widgetSettingsContext.getWidgetContext();
            var settings = widgetContext.getSettings();
            this.textColor = settings.get(core_2.SettingKey.Color);
            this.styleEditLabel = widgetContext.getLanguage().get("textStyleSettingLabel");
            this.colorEditVisible = settings.isSettingVisible(core_2.SettingKey.Color);
            this.colorEditEnabled = settings.isSettingEnabled(core_2.SettingKey.Color);
            this.colorEditLabel = widgetContext.getLanguage().get("textColorSettingLabel");
            this.styleEditVisible = settings.isSettingVisible(core_2.SettingKey.Style);
            this.styleEditEnabled = settings.isSettingEnabled(core_2.SettingKey.Style);
        };
        SettingsComponent.prototype.fetchStyleSettingsAsync = function () {
            var _this = this;
            this.busyIndicator.activated = true;
            setTimeout(function () {
                var settings = _this.widgetSettingsContext.getWidgetContext().getSettings();
                _this.textStyleOptions = ["Normal", "Italic", "Bold"];
                _this.textStyle = settings.get(core_2.SettingKey.Style);
                _this.busyIndicator.activated = false;
            }, 3000);
        };
        SettingsComponent.prototype.setupSettingsClosingHandler = function () {
            var _this = this;
            this.widgetSettingsInstance.closing = function (closingArg) {
                var settings = _this.widgetSettingsContext.getWidgetContext().getSettings();
                if (closingArg.isSave) {
                    if (_this.colorEditEnabled) {
                        settings.set(core_2.SettingKey.Color, _this.textColor);
                    }
                    if (_this.styleEditEnabled) {
                        settings.set(core_2.SettingKey.Style, _this.textStyle);
                    }
                    _this.titleSettingComponent.save();
                }
            };
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], SettingsComponent.prototype, "widgetSettingsContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], SettingsComponent.prototype, "widgetSettingsInstance", void 0);
        __decorate([
            core_1.ViewChild(title_setting_1.TitleSettingComponent, { static: true }),
            __metadata("design:type", title_setting_1.TitleSettingComponent)
        ], SettingsComponent.prototype, "titleSettingComponent", void 0);
        __decorate([
            core_1.ViewChild(sohoxi_angular_1.SohoBusyIndicatorDirective, { static: true }),
            __metadata("design:type", sohoxi_angular_1.SohoBusyIndicatorDirective)
        ], SettingsComponent.prototype, "busyIndicator", void 0);
        SettingsComponent = __decorate([
            core_1.Component({
                template: "\n\t<div soho-busyindicator blockUI=\"true\" displayDelay=\"0\">\n\t\t<infor-sample-setting-title-field\n\t\t\t[widgetSettingsContext]=\"widgetSettingsContext\"\n\t\t\tlabel=\"Title\">\n\t\t</infor-sample-setting-title-field>\n\t\t<div class=\"field\" *ngIf=\"styleEditVisible\">\n\t\t\t<label>{{styleEditLabel}}</label>\n\t\t\t<select soho-dropdown [(ngModel)]=\"textStyle\" [disabled]=\"!styleEditEnabled\" noSearch>\n\t\t\t\t<option *ngFor=\"let styleOption of textStyleOptions\" [value]=\"styleOption\">{{styleOption}}</option>\n\t\t\t</select>\n\t\t</div>\n\t\t<div class=\"field\" *ngIf=\"colorEditVisible\">\n\t\t\t<label>{{colorEditLabel}}</label>\n\t\t\t<input soho-colorpicker [(ngModel)]=\"textColor\" [disabled]=\"!colorEditEnabled\"/>\n\t\t</div>\n\t</div>\n\t",
            })
        ], SettingsComponent);
        return SettingsComponent;
    }());
    exports.SettingsComponent = SettingsComponent;
});
//# sourceMappingURL=settings.js.map