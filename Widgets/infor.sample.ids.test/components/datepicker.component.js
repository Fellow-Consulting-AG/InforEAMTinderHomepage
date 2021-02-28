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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./base.component"], function (require, exports, core_1, base_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatepickerComponent = void 0;
    var DatepickerComponent = /** @class */ (function (_super) {
        __extends(DatepickerComponent, _super);
        function DatepickerComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.withTime = false;
            return _this;
        }
        DatepickerComponent.prototype.ngOnInit = function () {
            this.model = this.setDefaultValue ? this.withTime ? "01/01/2019 15:30:00" : "01/01/2019" : undefined;
            this.options = {
                dateFormat: "MM/dd/yyyy",
            };
            if (this.withTime) {
                this.options = __assign(__assign({}, this.options), { showTime: true, timeFormat: "HH:mm:ss", useCurrentTime: true });
            }
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], DatepickerComponent.prototype, "withTime", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], DatepickerComponent.prototype, "testId", void 0);
        DatepickerComponent = __decorate([
            core_1.Component({
                selector: "ids-datepicker",
                template: "\n\t\t<div class=\"field\">\n\t\t\t<label soho-label\n\t\t\t\t\t[attr.data-lm-tst-smp]=\"testId + '-lbl'\">\n\t\t\t\t{{ \"Datepicker\" + (withTime ? \" (with time)\" : \"\")}}\n\t\t\t\t<br/>\n\t\t\t\tngModel: {{model}}\n\t\t\t</label>\n\t\t\t<input soho-datepicker\n\t\t\t\t\t\tplaceholder=\"MM/dd/yyyy\"\n\t\t\t\t\t\t[options]=\"options\"\n\t\t\t\t\t\t[(ngModel)]=\"model\"\n\t\t\t\t\t\t[class.input-mm]=\"withTime\"\n\t\t\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t[attr.data-lm-tst-smp]=\"testId + '-ipt'\"/>\n\t\t</div>"
            })
        ], DatepickerComponent);
        return DatepickerComponent;
    }(base_component_1.ComponentBase));
    exports.DatepickerComponent = DatepickerComponent;
});
//# sourceMappingURL=datepicker.component.js.map