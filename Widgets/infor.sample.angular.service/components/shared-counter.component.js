var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "../services/shared-counter.service"], function (require, exports, core_1, shared_counter_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SharedCounterComponent = void 0;
    var SharedCounterComponent = /** @class */ (function () {
        function SharedCounterComponent(counter) {
            this.counter = counter;
        }
        SharedCounterComponent = __decorate([
            core_1.Component({
                selector: "shared-counter",
                template: "\n\t\t<counter\n\t\t\tlabel=\"shared-counter\"\n\t\t\t[value]=\"counter.count\"\n\t\t\t(plus)=\"counter.increment()\"\n\t\t\t(minus)=\"counter.decrement()\"\n\t\t\tsoho-tooltip\n\t\t\ttitle=\"This counter shares state within the component tree since the service is provided in a parent component.\">\n\t\t</counter>\n\t",
            }),
            __metadata("design:paramtypes", [shared_counter_service_1.SharedCounterService])
        ], SharedCounterComponent);
        return SharedCounterComponent;
    }());
    exports.SharedCounterComponent = SharedCounterComponent;
});
//# sourceMappingURL=shared-counter.component.js.map