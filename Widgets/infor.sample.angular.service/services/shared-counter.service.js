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
    exports.SharedCounterService = void 0;
    /**
     * This service is provided in the WidgetComponent, together with the SohoContextualActionPanelService.
     * This will create one instance of the service in each individual widget instance.
     */
    var SharedCounterService = /** @class */ (function (_super) {
        __extends(SharedCounterService, _super);
        function SharedCounterService() {
            return _super.call(this, "SharedCounterService") || this;
        }
        SharedCounterService = __decorate([
            core_1.Injectable(),
            __metadata("design:paramtypes", [])
        ], SharedCounterService);
        return SharedCounterService;
    }(counter_1.Counter));
    exports.SharedCounterService = SharedCounterService;
});
//# sourceMappingURL=shared-counter.service.js.map