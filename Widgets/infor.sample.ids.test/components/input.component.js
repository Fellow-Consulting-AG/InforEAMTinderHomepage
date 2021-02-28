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
    exports.InputComponent = void 0;
    var InputComponent = /** @class */ (function (_super) {
        __extends(InputComponent, _super);
        function InputComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InputComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? "a text" : undefined;
        };
        InputComponent = __decorate([
            core_1.Component({
                selector: "ids-input",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label [required]=\"true\" data-lm-tst-smp=\"in-lbl\">Input <br/> ngModel: {{model}}</label>\n\t\t\t<input soho-input [(ngModel)]=\"model\" data-validate=\"required\" [disabled]=\"disabled\" data-lm-tst-smp=\"in-ipt\"/>\n\t\t</div>"
            })
        ], InputComponent);
        return InputComponent;
    }(base_component_1.ComponentBase));
    exports.InputComponent = InputComponent;
});
//# sourceMappingURL=input.component.js.map