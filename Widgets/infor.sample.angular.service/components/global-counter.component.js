var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "../services/global-counter.service"], function (require, exports, core_1, global_counter_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalCounterComponent = void 0;
    var GlobalCounterComponent = /** @class */ (function () {
        function GlobalCounterComponent(counter) {
            this.counter = counter;
        }
        GlobalCounterComponent = __decorate([
            core_1.Component({
                selector: "global-counter",
                template: "\n\t\t<counter\n\t\t\tlabel=\"global-counter\"\n\t\t\t[value]=\"counter.count\"\n\t\t\t(plus)=\"counter.increment()\"\n\t\t\t(minus)=\"counter.decrement()\"\n\t\t\tsoho-tooltip\n\t\t\ttitle=\"This counter shares state with other widget instances since the service is provided in 'root'\">\n\t\t</counter>\n\t",
            }),
            __metadata("design:paramtypes", [global_counter_service_1.GlobalCounterService])
        ], GlobalCounterComponent);
        return GlobalCounterComponent;
    }());
    exports.GlobalCounterComponent = GlobalCounterComponent;
});
//# sourceMappingURL=global-counter.component.js.map