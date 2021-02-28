var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "./base.component"], function (require, exports, core_1, base_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TimepickerComponent = void 0;
    var TimepickerComponent = /** @class */ (function (_super) {
        __extends(TimepickerComponent, _super);
        function TimepickerComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimepickerComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? "15:30:00" : undefined;
        };
        TimepickerComponent = __decorate([
            core_1.Component({
                selector: "ids-timepicker",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label\n\t\t\t\t\t\tdata-lm-tst-smp=\"tp-lbl\">\n\t\t\t\tTimepicker\n\t\t\t\t<br/>\n\t\t\t\tngModel: {{model}}\n\t\t\t</label>\n\t\t\t<input soho-timepicker\n\t\t\t\t\t\ttimeFormat=\"HH:mm:ss\"\n\t\t\t\t\t\tplaceholder=\"HH:mm:ss\"\n\t\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t\tdata-validate=\"required\"\n\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"tp-ipt\"/>\n\t\t</div>"
            })
        ], TimepickerComponent);
        return TimepickerComponent;
    }(base_component_1.ComponentBase));
    exports.TimepickerComponent = TimepickerComponent;
});
//# sourceMappingURL=timepicker.component.js.map