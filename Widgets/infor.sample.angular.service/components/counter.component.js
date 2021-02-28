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
    exports.CounterComponent = void 0;
    var CounterComponent = /** @class */ (function () {
        function CounterComponent() {
            this.plus = new core_1.EventEmitter();
            this.minus = new core_1.EventEmitter();
        }
        __decorate([
            core_1.Input(),
            __metadata("design:type", Number)
        ], CounterComponent.prototype, "value", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], CounterComponent.prototype, "label", void 0);
        __decorate([
            core_1.Output(),
            __metadata("design:type", Object)
        ], CounterComponent.prototype, "plus", void 0);
        __decorate([
            core_1.Output(),
            __metadata("design:type", Object)
        ], CounterComponent.prototype, "minus", void 0);
        CounterComponent = __decorate([
            core_1.Component({
                selector: "counter",
                template: "\n\t\t<div class=\"larger-heavy-text\">\n\t\t\t{{label}}\n\t\t</div>\n\t\t<div>\n\t\t\t<button soho-button=\"icon\" icon=\"minus\" (click)=\"minus.emit()\"></button>\n\t\t\t<span class=\"data-large vertical-middle\">\n\t\t\t\t{{value}}\n\t\t\t</span>\n\t\t\t<button soho-button=\"icon\" icon=\"add\" (click)=\"plus.emit()\"></button>\n\t\t</div>\n\t",
                styles: ["\n\t\t:host {\n\t\t\ttext-align: center;\n\t\t}\n\t\t.vertical-middle {\n\t\t\tvertical-align: middle;\n\t\t}\n\t"]
            })
        ], CounterComponent);
        return CounterComponent;
    }());
    exports.CounterComponent = CounterComponent;
});
//# sourceMappingURL=counter.component.js.map