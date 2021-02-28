var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "@infor/sohoxi-angular", "../services/shared-counter.service", "./dialog.component"], function (require, exports, core_1, sohoxi_angular_1, shared_counter_service_1, dialog_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetComponent = void 0;
    var WidgetComponent = /** @class */ (function () {
        function WidgetComponent(capService, viewRef) {
            this.capService = capService;
            this.viewRef = viewRef;
        }
        WidgetComponent.prototype.openCAP = function () {
            var cap = this.capService.contextualactionpanel(dialog_component_1.DialogComponent, this.viewRef);
            cap.title(this.widgetContext.getTitle());
            cap.buttons([{
                    icon: "#icon-close",
                    cssClass: "btn",
                    click: function () { return cap.close(); },
                }]);
            cap.open();
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], WidgetComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], WidgetComponent.prototype, "widgetInstance", void 0);
        WidgetComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<div class=\"row top-padding\">\n\t\t\t<div class=\"twelve columns lm-padding-md\">\n\t\t\t\t<global-counter></global-counter>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t\t<shared-counter></shared-counter>\n\t\t\t</div>\n\t\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t\t<shared-counter></shared-counter>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t\t<local-counter></local-counter>\n\t\t\t</div>\n\t\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t\t<local-counter></local-counter>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"twelve columns lm-center-text\">\n\t\t\t\t<button soho-button=\"tertiary\" (click)=\"openCAP()\">Open Dialog</button>\n\t\t\t</div>\n\t\t</div>\n\t",
                providers: [
                    sohoxi_angular_1.SohoContextualActionPanelService,
                    shared_counter_service_1.SharedCounterService,
                ]
            }),
            __metadata("design:paramtypes", [sohoxi_angular_1.SohoContextualActionPanelService, core_1.ViewContainerRef])
        ], WidgetComponent);
        return WidgetComponent;
    }());
    exports.WidgetComponent = WidgetComponent;
});
//# sourceMappingURL=widget.component.js.map