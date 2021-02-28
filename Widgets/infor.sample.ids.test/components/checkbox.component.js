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
    exports.CheckboxComponent = void 0;
    var CheckboxComponent = /** @class */ (function (_super) {
        __extends(CheckboxComponent, _super);
        function CheckboxComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.random = lime_1.CommonUtil.random(3);
            return _this;
        }
        CheckboxComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? true : undefined;
        };
        CheckboxComponent = __decorate([
            core_1.Component({
                selector: "ids-checkbox",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label data-lm-tst-smp=\"cb-val\">Checkbox & Switch <br/> ngModel: {{model}}</label>\n\t\t\t<input soho-checkbox\n\t\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t\t[id]=\"random + 'checkbox'\"\n\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"cb-box\">\n\t\t\t<label soho-label\n\t\t\t\t\t\t[for]=\"random + 'checkbox'\"\n\t\t\t\t\t\t[forCheckBox]=\"true\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"cb-box-lbl\">Tick</label>\n\t\t</div>\n\t\t<div class=\"field switch\">\n\t\t\t<input type=\"checkbox\"\n\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t[id]=\"random + 'switch'\"\n\t\t\t\t\tclass=\"switch\"\n\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\tdata-lm-tst-smp=\"cb-swi\">\n\t\t\t<label soho-label\n\t\t\t\t\t\t[for]=\"random + 'switch'\"\n\t\t\t\t\t\t[forCheckBox]=\"true\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"cb-swi-lbl\">Tick</label>\n\t\t</div>"
            })
        ], CheckboxComponent);
        return CheckboxComponent;
    }(base_component_1.ComponentBase));
    exports.CheckboxComponent = CheckboxComponent;
});
//# sourceMappingURL=checkbox.component.js.map