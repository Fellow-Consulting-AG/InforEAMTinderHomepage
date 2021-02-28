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
define(["require", "exports", "@angular/core", "../data", "./base.component"], function (require, exports, core_1, data_1, base_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiselectComponent = void 0;
    var MultiselectComponent = /** @class */ (function (_super) {
        __extends(MultiselectComponent, _super);
        function MultiselectComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.states = data_1.states;
            return _this;
        }
        MultiselectComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? ["CA", "ND"] : undefined;
        };
        MultiselectComponent = __decorate([
            core_1.Component({
                selector: "ids-multiselect",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label\n\t\t\t\t\t\t[required]=\"true\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"ms-lbl\">\n\t\t\t\tMultiselect\n\t\t\t\t<br/>\n\t\t\t\tngModel: {{model}}\n\t\t\t</label>\n\t\t\t<select soho-dropdown\n\t\t\t\t\t\tmultiple\n\t\t\t\t\t\t[closeOnSelect]=\"false\"\n\t\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t\tdata-validate=\"required\"\n\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t\tdata-lm-tst-smp=\"ms-sel\">\n\t\t\t\t<option *ngFor=\"let state of states\"\n\t\t\t\t\t\t\t[value]=\"state.value\">{{state.label}}</option>\n\t\t\t</select>\n\t\t</div>"
            })
        ], MultiselectComponent);
        return MultiselectComponent;
    }(base_component_1.ComponentBase));
    exports.MultiselectComponent = MultiselectComponent;
});
//# sourceMappingURL=multiselect.component.js.map