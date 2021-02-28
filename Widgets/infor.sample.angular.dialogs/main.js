var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "./dialog"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DialogsModule = exports.DialogsComponent = void 0;
    var DialogsComponent = /** @class */ (function () {
        function DialogsComponent(widgetContext, widgetInstance, dialogService, sohoModalDialogService) {
            this.widgetContext = widgetContext;
            this.widgetInstance = widgetInstance;
            this.dialogService = dialogService;
            this.sohoModalDialogService = sohoModalDialogService;
            this.instanceId = widgetContext.getWidgetInstanceId();
        }
        DialogsComponent.prototype.showMessage = function () {
            this.dialogService.showMessage({
                title: "A sample title",
                message: "A sample message"
            });
        };
        DialogsComponent.prototype.showConfirm = function () {
            var _this = this;
            this.dialogService.showMessage({
                title: "Confirm",
                message: "Are you sure?",
                standardButtons: lime_1.StandardDialogButtons.YesNo
            }).subscribe(function (result) {
                var message;
                var title;
                if (result.button === lime_1.DialogButtonType.Yes) {
                    title = "Confirmed";
                    message = "You are sure.";
                }
                else {
                    title = "Not confirmed";
                    message = "You are not sure.";
                }
                _this.dialogService.showMessage({
                    title: title,
                    message: message
                });
            });
        };
        DialogsComponent.prototype.showToast = function () {
            this.dialogService.showToast({
                title: "A sample toast title",
                message: "A sample toast message"
            });
        };
        DialogsComponent.prototype.showCustom = function () {
            var _this = this;
            // To show a custom dialog we now use the SohoModalDialogService instead of DialogService
            var dialog = this.sohoModalDialogService
                .modal(dialog_1.CustomDialogComponent, this.dialogWidgetView)
                .title("A custom dialog title")
                .afterClose(function (result) {
                var message = result ? result.value : "Dialog cancelled";
                _this.dialogService.showMessage({
                    title: "Result",
                    message: message
                });
            });
            dialog.apply(function (component) {
                component.dialog = dialog;
                component.dialogParameter = "A sample custom dialog parameter";
            }).open();
        };
        __decorate([
            core_1.ViewChild("dialogWidgetView", { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], DialogsComponent.prototype, "dialogWidgetView", void 0);
        DialogsComponent = __decorate([
            core_1.Component({
                template: "\n\t<div #dialogWidgetView class=\"container\">\n\t\t<div class=\"twelve columns lm-margin-md-t\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"field lm-margin-md-b\">\n\t\t\t\t\t<label for=\"{{instanceId}}-message-btn\">Open message dialog</label>\n\t\t\t\t\t<button soho-button=\"primary\" id=\"{{instanceId}}-message-btn\" (click)=\"showMessage()\">Message</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"field lm-margin-md-b\">\n\t\t\t\t\t<label for=\"{{instanceId}}-confirm-btn\">Open confirm dialog</label>\n\t\t\t\t\t<button soho-button=\"primary\" id=\"{{instanceId}}-confirm-btn\" (click)=\"showConfirm()\">Confirm</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"field lm-margin-md-b\">\n\t\t\t\t\t<label for=\"{{instanceId}}-custom-btn\">Open custom dialog</label>\n\t\t\t\t\t<button soho-button=\"primary\" id=\"{{instanceId}}-custom-btn\" (click)=\"showCustom()\">Custom</button>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"field lm-margin-md-b\">\n\t\t\t\t\t<label for=\"{{instanceId}}-toast-btn\">Show toast message</label>\n\t\t\t\t\t<button soho-button=\"primary\" id=\"{{instanceId}}-toast-btn\" (click)=\"showToast()\">Toast</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>"
            }),
            __param(0, core_1.Inject(lime_1.widgetContextInjectionToken)),
            __param(1, core_1.Inject(lime_1.widgetInstanceInjectionToken)),
            __metadata("design:paramtypes", [lime_1.IWidgetContext,
                lime_1.IWidgetInstance,
                lime_1.DialogService,
                sohoxi_angular_1.SohoModalDialogService])
        ], DialogsComponent);
        return DialogsComponent;
    }());
    exports.DialogsComponent = DialogsComponent;
    var DialogsModule = /** @class */ (function () {
        function DialogsModule() {
        }
        DialogsModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, forms_1.FormsModule, sohoxi_angular_1.SohoButtonModule],
                declarations: [DialogsComponent, dialog_1.CustomDialogComponent],
                entryComponents: [DialogsComponent, dialog_1.CustomDialogComponent]
            })
        ], DialogsModule);
        return DialogsModule;
    }());
    exports.DialogsModule = DialogsModule;
});
//# sourceMappingURL=main.js.map