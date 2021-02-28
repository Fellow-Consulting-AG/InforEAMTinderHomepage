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
    exports.AutocompleteComponent = void 0;
    var AutocompleteComponent = /** @class */ (function (_super) {
        __extends(AutocompleteComponent, _super);
        function AutocompleteComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.states = data_1.states;
            _this.source = function (term, response) {
                response(term, _this.states);
            };
            return _this;
        }
        AutocompleteComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? data_1.states[2] : {};
        };
        AutocompleteComponent.prototype.onSelected = function (event) {
            this.model = event[2];
        };
        AutocompleteComponent = __decorate([
            core_1.Component({
                selector: "ids-autocomplete",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label [required]=\"true\" data-lm-tst-smp=\"ac-lbl\">Autocomplete <br/> ngModel: {{model.value}}</label>\n\t\t\t<input soho-autocomplete\n\t\t\t\t\tdata-lm-tst-smp=\"ac-ipt\"\n\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t\t[source]=\"source\"\n\t\t\t\t\tfilterMode=\"contains\"\n\t\t\t\t\t[(ngModel)]=\"model.label\"\n\t\t\t\t\t(selected)=\"onSelected($event)\"\n\t\t\t\t\tdata-validate=\"required\"\n\t\t\t\t\tplaceholder=\"Type to search...\"/>\n\t\t</div>"
            })
        ], AutocompleteComponent);
        return AutocompleteComponent;
    }(base_component_1.ComponentBase));
    exports.AutocompleteComponent = AutocompleteComponent;
});
//# sourceMappingURL=autocomplete.component.js.map