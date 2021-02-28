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
    exports.ComponentBase = void 0;
    var ComponentBase = /** @class */ (function () {
        function ComponentBase() {
        }
        Object.defineProperty(ComponentBase.prototype, "disabledAttr", {
            get: function () {
                return this.disabled ? "" : null;
            },
            enumerable: false,
            configurable: true
        });
        __decorate([
            core_1.Input(),
            __metadata("design:type", Boolean)
        ], ComponentBase.prototype, "setDefaultValue", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Boolean)
        ], ComponentBase.prototype, "disabled", void 0);
        return ComponentBase;
    }());
    exports.ComponentBase = ComponentBase;
});
//# sourceMappingURL=base.component.js.map