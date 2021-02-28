var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NgYggdrasilModule = exports.YgTrackFieldDirective = exports.YgTrackContentDirective = exports.YgTrackClickDirective = exports.YgTrackViewDirective = exports.YgTrackAppDirective = exports.TRACKING_CLIENT = exports.YgViewTrackerContext = exports.YgApplicationTrackerContext = exports.YgClientService = void 0;
    var YgClientService = /** @class */ (function () {
        function YgClientService() {
        }
        YgClientService = __decorate([
            core_1.Injectable({
                providedIn: "root",
            })
        ], YgClientService);
        return YgClientService;
    }());
    exports.YgClientService = YgClientService;
    var YgApplicationTrackerContext = /** @class */ (function () {
        function YgApplicationTrackerContext() {
        }
        YgApplicationTrackerContext.prototype.getTracker = function () {
            return new Promise(function () { });
        };
        YgApplicationTrackerContext = __decorate([
            core_1.Injectable({
                providedIn: "root",
            })
        ], YgApplicationTrackerContext);
        return YgApplicationTrackerContext;
    }());
    exports.YgApplicationTrackerContext = YgApplicationTrackerContext;
    var YgViewTrackerContext = /** @class */ (function () {
        function YgViewTrackerContext() {
        }
        YgViewTrackerContext.prototype.getTracker = function () {
            return new Promise(function () { });
        };
        YgViewTrackerContext = __decorate([
            core_1.Injectable({
                providedIn: "root",
            })
        ], YgViewTrackerContext);
        return YgViewTrackerContext;
    }());
    exports.YgViewTrackerContext = YgViewTrackerContext;
    exports.TRACKING_CLIENT = new core_1.InjectionToken("TRACKING_CLIENT");
    var YgTrackAppDirective = /** @class */ (function () {
        function YgTrackAppDirective() {
        }
        YgTrackAppDirective.prototype.ngAfterViewInit = function () { };
        YgTrackAppDirective.prototype.ngOnDestroy = function () { };
        YgTrackAppDirective = __decorate([
            core_1.Directive({
                selector: "ygTrackApp",
                inputs: [
                    "ygTrackApp",
                    "ygAppId",
                    "ygAttributes",
                ]
            })
        ], YgTrackAppDirective);
        return YgTrackAppDirective;
    }());
    exports.YgTrackAppDirective = YgTrackAppDirective;
    var YgTrackViewDirective = /** @class */ (function () {
        function YgTrackViewDirective() {
        }
        YgTrackViewDirective.prototype.ngAfterViewInit = function () { };
        YgTrackViewDirective.prototype.ngOnDestroy = function () { };
        YgTrackViewDirective = __decorate([
            core_1.Directive({
                selector: "ygTrackView",
                inputs: [
                    "ygTrackView",
                    "ygAttributes",
                ]
            })
        ], YgTrackViewDirective);
        return YgTrackViewDirective;
    }());
    exports.YgTrackViewDirective = YgTrackViewDirective;
    var YgTrackClickDirective = /** @class */ (function () {
        function YgTrackClickDirective() {
        }
        YgTrackClickDirective = __decorate([
            core_1.Directive({
                selector: "ygTrackClick",
                inputs: [
                    "ygTrackClick",
                    "ygAttributes",
                ]
            })
        ], YgTrackClickDirective);
        return YgTrackClickDirective;
    }());
    exports.YgTrackClickDirective = YgTrackClickDirective;
    var YgTrackContentDirective = /** @class */ (function () {
        function YgTrackContentDirective() {
        }
        YgTrackContentDirective = __decorate([
            core_1.Directive({
                selector: "ygTrackContent",
                inputs: [
                    "ygTrackContent",
                    "ygAttributes",
                ]
            })
        ], YgTrackContentDirective);
        return YgTrackContentDirective;
    }());
    exports.YgTrackContentDirective = YgTrackContentDirective;
    var YgTrackFieldDirective = /** @class */ (function () {
        function YgTrackFieldDirective() {
        }
        YgTrackFieldDirective.prototype.ngAfterViewInit = function () { };
        YgTrackFieldDirective.prototype.ngOnDestroy = function () { };
        YgTrackFieldDirective = __decorate([
            core_1.Directive({
                selector: "ygTrackField",
                inputs: [
                    "ygTrackField",
                    "ygAttributes",
                ]
            })
        ], YgTrackFieldDirective);
        return YgTrackFieldDirective;
    }());
    exports.YgTrackFieldDirective = YgTrackFieldDirective;
    var NgYggdrasilModule = /** @class */ (function () {
        function NgYggdrasilModule() {
        }
        NgYggdrasilModule = __decorate([
            core_1.NgModule({
                declarations: [
                    YgTrackAppDirective,
                    YgTrackViewDirective,
                    YgTrackClickDirective,
                    YgTrackContentDirective,
                    YgTrackFieldDirective,
                ],
                exports: [
                    YgTrackAppDirective,
                    YgTrackViewDirective,
                    YgTrackClickDirective,
                    YgTrackContentDirective,
                    YgTrackFieldDirective,
                ]
            })
        ], NgYggdrasilModule);
        return NgYggdrasilModule;
    }());
    exports.NgYggdrasilModule = NgYggdrasilModule;
});
//# sourceMappingURL=ng-yggdrasil.mock.js.map