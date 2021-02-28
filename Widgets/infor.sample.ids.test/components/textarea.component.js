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
    exports.TextareaComponent = void 0;
    var TextareaComponent = /** @class */ (function (_super) {
        __extends(TextareaComponent, _super);
        function TextareaComponent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TextareaComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? "This textarea has a default text" : undefined;
        };
        TextareaComponent = __decorate([
            core_1.Component({
                selector: "ids-textarea",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label\n\t\t\t\t\t[required]=\"true\"\n\t\t\t\t\tdata-lm-tst-smp=\"ta-lbl\">\n\t\t\t\tTextarea\n\t\t\t\t<br/>\n\t\t\t\tngModel: {{model}}\n\t\t\t</label>\n\t\t\t<textarea soho-textarea\n\t\t\t\t\t\t\tmaxlength=\"100\"\n\t\t\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t\t\tdata-validate=\"required\"\n\t\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\t\tdata-lm-tst-smp=\"ta\"></textarea>\n\t\t</div>"
            })
        ], TextareaComponent);
        return TextareaComponent;
    }(base_component_1.ComponentBase));
    exports.TextareaComponent = TextareaComponent;
});
//# sourceMappingURL=textarea.component.js.map