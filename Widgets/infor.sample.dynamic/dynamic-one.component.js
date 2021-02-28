var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DynamicOneComponent = void 0;
    var DynamicOneComponent = /** @class */ (function () {
        function DynamicOneComponent() {
        }
        DynamicOneComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<p>Hello dynamic-<b>one</b></p>\n\t",
                selector: "dynamic-one",
            })
        ], DynamicOneComponent);
        return DynamicOneComponent;
    }());
    exports.DynamicOneComponent = DynamicOneComponent;
});
//# sourceMappingURL=dynamic-one.component.js.map