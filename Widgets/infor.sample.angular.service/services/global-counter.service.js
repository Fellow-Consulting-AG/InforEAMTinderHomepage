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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./counter"], function (require, exports, core_1, counter_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GlobalCounterService = void 0;
    /**
     * This service is automatically provided as a singleton in the root component.
     * This means that a single instance of the service will be shared among every component, pipe, service etc.
     * Note that the service instance (and its state) is shared among widget instances as well.
     *
     * Also note that THIS SERVICE IS NEVER DESTROYED, meaning that whatever state and resources
     * that are consumed by the service will persist indefinitely.
     */
    var GlobalCounterService = /** @class */ (function (_super) {
        __extends(GlobalCounterService, _super);
        function GlobalCounterService() {
            return _super.call(this, "GlobalCounterService") || this;
        }
        GlobalCounterService = __decorate([
            core_1.Injectable({
                providedIn: "root",
            }),
            __metadata("design:paramtypes", [])
        ], GlobalCounterService);
        return GlobalCounterService;
    }(counter_1.Counter));
    exports.GlobalCounterService = GlobalCounterService;
});
//# sourceMappingURL=global-counter.service.js.map