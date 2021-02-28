var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActions = exports.ResponsiveWidgetModule = exports.ResponsiveWidgetComponent = void 0;
    var ResponsiveWidgetComponent = /** @class */ (function () {
        function ResponsiveWidgetComponent() {
        }
        ResponsiveWidgetComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.size$ = this.widgetContext.getSize();
            this.items = ["Customer A", "Customer 2", "Customer 12345", "Lead customer", "Customer prospect"];
            this.widgetInstance.actions[0].execute = function () { return _this.showInfo(); };
        };
        ResponsiveWidgetComponent.prototype.updateChart = function (customer) {
            this.widgetContext.removeWidgetMessage();
            this.selectedCustomer = customer;
            this.chartData = [
                {
                    data: [
                        { name: "2014", value: this.getRandomChartValue() },
                        { name: "2015", value: this.getRandomChartValue() },
                        { name: "2016", value: this.getRandomChartValue() },
                        { name: "2017", value: this.getRandomChartValue() }
                    ]
                }
            ];
        };
        ResponsiveWidgetComponent.prototype.showInfo = function () {
            this.widgetContext.showWidgetMessage({
                type: lime_1.WidgetMessageType.Info,
                message: "Select a customer to show chart"
            });
        };
        ResponsiveWidgetComponent.prototype.getRandomChartValue = function () {
            return Math.floor(Math.random() * 1000000);
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], ResponsiveWidgetComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], ResponsiveWidgetComponent.prototype, "widgetInstance", void 0);
        ResponsiveWidgetComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"lm-height-full\"\n\t\t  [class.item-selected]=\"selectedCustomer\"\n\t\t  [class.single-width]=\"(size$ | async)?.cols === 1\">\n\t\t<button class=\"lm-margin-md-l\"\n\t\t\t\t  soho-button=\"icon\"\n\t\t\t\t  icon=\"left-arrow\"\n\t\t\t\t  (click)=\"selectedCustomer = null\"\n\t\t\t\t  *ngIf=\"selectedCustomer\">\n\t\t\tGo back\n\t\t</button>\n\t\t<soho-listview class=\"lm-scroll-no-x\" [class.lm-brd]=\"selectedCustomer\">\n\t\t\t<li soho-listview-item\n\t\t\t\t *ngFor=\"let item of items\"\n\t\t\t\t (click)=\"updateChart(item)\">\n\t\t\t\t<p soho-listview-header>{{item}}</p>\n\t\t\t</li>\n\t\t</soho-listview>\n\t\t<div class=\"chart-wrapper\"\n\t\t\t  *ngIf=\"selectedCustomer\">\n\t\t\t<div soho-column\n\t\t\t\t  [dataset]=\"chartData\"\n\t\t\t\t  formatterString=\"$,\"\n\t\t\t\t  type=\"column\">\n\t\t\t</div>\n\t\t</div>\n\t</div>",
                styles: ["\n\t\tsoho-listview {\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tfloat: left;\n\t\t}\n\n\t\t.item-selected soho-listview {\n\t\t\twidth: 50%;\n\t\t\tborder-right: 1px solid;\n\t\t}\n\n\t\t.item-selected.single-width soho-listview {\n\t\t\tdisplay: none;\n\t\t}\n\n\t\t.chart-wrapper {\n\t\t\twidth: 50%;\n\t\t\theight: calc(100% - 36px);\n\t\t\tfloat: left;\n\t\t}\n\n\t\t.single-width .chart-wrapper {\n\t\t\twidth: 100%;\n\t\t}\n\t"]
            })
        ], ResponsiveWidgetComponent);
        return ResponsiveWidgetComponent;
    }());
    exports.ResponsiveWidgetComponent = ResponsiveWidgetComponent;
    var ResponsiveWidgetModule = /** @class */ (function () {
        function ResponsiveWidgetModule() {
        }
        ResponsiveWidgetModule = __decorate([
            core_1.NgModule({
                imports: [
                    common_1.CommonModule,
                    sohoxi_angular_1.SohoButtonModule,
                    sohoxi_angular_1.SohoListViewModule,
                    sohoxi_angular_1.SohoColumnModule
                ],
                declarations: [ResponsiveWidgetComponent],
                entryComponents: [ResponsiveWidgetComponent]
            })
        ], ResponsiveWidgetModule);
        return ResponsiveWidgetModule;
    }());
    exports.ResponsiveWidgetModule = ResponsiveWidgetModule;
    exports.getActions = function () {
        return [{ isPrimary: true, standardIconName: "#icon-info", text: "Information" }];
    };
});
//# sourceMappingURL=main.js.map