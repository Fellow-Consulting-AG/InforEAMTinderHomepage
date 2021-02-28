var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./chart.component"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, chart_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetModule = exports.WidgetComponent = void 0;
    var WidgetComponent = /** @class */ (function () {
        function WidgetComponent(toastService) {
            this.toastService = toastService;
        }
        WidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (this.widgetContext.isBanner()) {
                this.showInitialBannerColorToast();
                this.widgetInstance.bannerBackgroundChanged = function (newColor) {
                    _this.showBackgroundColorChangedToast(newColor);
                };
            }
            this.widgetInstance.settingsSaved = function () { return _this.setChartType(); };
            this.setChartType();
        };
        WidgetComponent.prototype.setChartType = function () {
            this.chartType = this.widgetContext.getSettings().get("chartType");
        };
        WidgetComponent.prototype.showInitialBannerColorToast = function () {
            var bannerColor = this.widgetContext.getBannerBackgroundColor();
            this.toastService.show({
                title: "Banner added",
                message: "The banner widget container is using background color " + bannerColor,
                timeout: 5000,
                position: sohoxi_angular_1.SohoToastService.BOTTOM_RIGHT
            });
        };
        WidgetComponent.prototype.showBackgroundColorChangedToast = function (newColor) {
            this.toastService.show({
                title: "Banner container changed",
                message: "The banner container is now using background color " + newColor,
                timeout: 5000,
                position: sohoxi_angular_1.SohoToastService.BOTTOM_RIGHT
            });
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
                template: "<chart [chartType]=\"chartType\"></chart>"
            }),
            __metadata("design:paramtypes", [sohoxi_angular_1.SohoToastService])
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
                    sohoxi_angular_1.SohoLineModule,
                    sohoxi_angular_1.SohoBarModule,
                    sohoxi_angular_1.SohoColumnModule,
                    sohoxi_angular_1.SohoPieModule
                ],
                declarations: [
                    chart_component_1.ChartComponent,
                    WidgetComponent
                ],
                entryComponents: [
                    WidgetComponent
                ]
            })
        ], WidgetModule);
        return WidgetModule;
    }());
    exports.WidgetModule = WidgetModule;
});
//# sourceMappingURL=main.js.map