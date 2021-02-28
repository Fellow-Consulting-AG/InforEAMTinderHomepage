var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "lime"], function (require, exports, common_1, core_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActions = exports.SubmenuModule = exports.SubmenuComponent = void 0;
    var SubmenuComponent = /** @class */ (function () {
        function SubmenuComponent(dialogService) {
            this.dialogService = dialogService;
        }
        SubmenuComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.language = this.widgetContext.getLanguage();
            // Hook up execute handlers for the toast and log actions
            this.widgetInstance.actions[0].submenuItems[0].execute = function () {
                _this.showToastMessage();
            };
            this.widgetInstance.actions[0].submenuItems[2].execute = function () {
                _this.logMessage();
            };
        };
        SubmenuComponent.prototype.showToastMessage = function () {
            this.dialogService.showToast({
                title: "A sample title",
                message: "A dismissable sample toast message"
            });
        };
        SubmenuComponent.prototype.logMessage = function () {
            lime_1.Log.debug("[SubmenuComponent] Log sample message.");
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], SubmenuComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], SubmenuComponent.prototype, "widgetInstance", void 0);
        SubmenuComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"container\">\n\t\t<div class=\"twelve columns lm-margin-md-t\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<p>{{language.widgetText}}</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>"
            }),
            __metadata("design:paramtypes", [lime_1.DialogService])
        ], SubmenuComponent);
        return SubmenuComponent;
    }());
    exports.SubmenuComponent = SubmenuComponent;
    var SubmenuModule = /** @class */ (function () {
        function SubmenuModule() {
        }
        SubmenuModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [SubmenuComponent],
                entryComponents: [SubmenuComponent]
            })
        ], SubmenuModule);
        return SubmenuModule;
    }());
    exports.SubmenuModule = SubmenuModule;
    exports.getActions = function (context) {
        var language = context.getLanguage();
        return [{
                isSubmenu: true,
                text: language.get("submenu"),
                submenuItems: [
                    { text: language.get("toastMessage") },
                    { isSeparator: true },
                    { text: language.get("logMessage") },
                    { text: language.get("disabledAction"), isEnabled: false }
                ]
            }];
    };
});
//# sourceMappingURL=main.js.map