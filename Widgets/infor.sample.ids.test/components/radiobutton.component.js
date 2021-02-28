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
define(["require", "exports", "@angular/core", "lime", "./base.component"], function (require, exports, core_1, lime_1, base_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RadiobuttonComponent = void 0;
    var RadiobuttonComponent = /** @class */ (function (_super) {
        __extends(RadiobuttonComponent, _super);
        function RadiobuttonComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = lime_1.CommonUtil.random(3);
            return _this;
        }
        RadiobuttonComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? 3 : 1;
        };
        RadiobuttonComponent = __decorate([
            core_1.Component({
                selector: "ids-radiobutton",
                template: "\n\t<div class=\"field\">\n\t\t<label soho-label\n\t\t\t\t\tdata-lm-tst-smp=\"rb-lbl\">\n\t\t\tRadiobutton\n\t\t\t<br/>\n\t\t\tngModel: {{model}}\n\t\t</label>\n\t\t<input soho-radiobutton\n\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t[value]=\"1\"\n\t\t\t\t\t[id]=\"id + '1'\"\n\t\t\t\t\t[attr.disabled]=\"disabledAttr\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-1-ipt\" />\n\t\t<label soho-label\n\t\t\t\t\t[for]=\"id + '1'\"\n\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-1-lbl\">One</label>\n\t\t<input soho-radiobutton\n\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t[value]=\"2\"\n\t\t\t\t\t[id]=\"id + '2'\"\n\t\t\t\t\t[attr.disabled]=\"disabledAttr\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-2-ipt\" />\n\t\t<label soho-label\n\t\t\t\t\t[for]=\"id + '2'\"\n\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-2-lbl\">Two</label>\n\t\t<input soho-radiobutton\n\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t[value]=\"3\"\n\t\t\t\t\t[id]=\"id + '3'\"\n\t\t\t\t\t[attr.disabled]=\"disabledAttr\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-2-ipt\" />\n\t\t<label soho-label\n\t\t\t\t\t[for]=\"id + '3'\" [forRadioButton]=\"true\"\n\t\t\t\t\tdata-lm-tst-smp=\"rb-3-lbl\">Three</label>\n\t\t<br>\n\t</div>"
            })
        ], RadiobuttonComponent);
        return RadiobuttonComponent;
    }(base_component_1.ComponentBase));
    exports.RadiobuttonComponent = RadiobuttonComponent;
});
//# sourceMappingURL=radiobutton.component.js.map