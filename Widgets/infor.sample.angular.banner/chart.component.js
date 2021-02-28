var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ChartComponent = void 0;
    var ChartComponent = /** @class */ (function () {
        function ChartComponent() {
            this.chartData = [
                {
                    data: [
                        { name: "Automotive", value: 7 },
                        { name: "Distribution", value: 10 },
                        { name: "Equipment", value: 20 },
                        { name: "Fashion", value: 20 },
                        { name: "Food & Beverage", value: 15 },
                        { name: "Healthcare", value: 10 },
                        { name: "Other", value: 18 }
                    ]
                }
            ];
        }
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], ChartComponent.prototype, "chartType", void 0);
        ChartComponent = __decorate([
            core_1.Component({
                selector: "chart",
                template: "\n\t\t<ng-container [ngSwitch]=\"chartType\">\n\t\t\t<div soho-line [isArea]=\"true\" [dataset]=\"chartData\" *ngSwitchCase=\"'area'\"></div>\n\t\t\t<div soho-bar type=\"bar\" [dataset]=\"chartData\" *ngSwitchCase=\"'bar'\"></div>\n\t\t\t<div soho-column type=\"column\" [dataset]=\"chartData\" *ngSwitchCase=\"'column'\"></div>\n\t\t\t<div soho-pie [isDonut]=\"true\" [dataset]=\"chartData\" *ngSwitchCase=\"'donut'\"></div>\n\t\t</ng-container>\n\t",
                styles: ["\n\t\t:host {\n\t\t\tdisplay: block;\n\t\t\theight: 100%;\n\t\t\twidth: 100%;\n\t\t}\n\t"]
            })
        ], ChartComponent);
        return ChartComponent;
    }());
    exports.ChartComponent = ChartComponent;
});
//# sourceMappingURL=chart.component.js.map