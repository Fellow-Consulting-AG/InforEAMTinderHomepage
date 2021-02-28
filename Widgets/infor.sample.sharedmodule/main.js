var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "lime", "sample-shared-usercontext"], function (require, exports, common_1, core_1, lime_1, sample_shared_usercontext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SharedModuleSampleOneModule = exports.SharedModuleSampleOneComponent = void 0;
    var SharedModuleSampleOneComponent = /** @class */ (function () {
        function SharedModuleSampleOneComponent(userContextService) {
            this.userContextService = userContextService;
        }
        SharedModuleSampleOneComponent.prototype.ngOnInit = function () {
            this.getAndSetUserContext();
        };
        SharedModuleSampleOneComponent.prototype.getAndSetUserContext = function () {
            var _this = this;
            this.setBusy(true);
            this.userContextService.getUserContext(this.widgetContext).subscribe(function (result) {
                _this.userContext = result;
            }, function (onError) {
                lime_1.Log.error("Failed to get User Context " + onError);
            }, function () {
                _this.setBusy(false);
            });
        };
        SharedModuleSampleOneComponent.prototype.setBusy = function (isBusy) {
            this.widgetContext.setState(isBusy ? lime_1.WidgetState.busy : lime_1.WidgetState.running);
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], SharedModuleSampleOneComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], SharedModuleSampleOneComponent.prototype, "widgetInstance", void 0);
        SharedModuleSampleOneComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"lm-padding-lg\">\n\t\t<p class=\"lm-text-align-c lm-italic-text lm-info-text\">\n\t\t\tUser context will be loaded only once and shared among all widgets using the specified shared module\n\t\t</p>\n\t\t<div *ngIf=\"userContext\" class=\"lm-margin-xl-t\">\n\t\t\t<p>\n\t\t\t\t<label>Name</label>\n\t\t\t\t<span>{{userContext.name}}</span>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<label>User ID</label>\n\t\t\t\t<span>{{userContext.userId}}</span>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<label>Department</label>\n\t\t\t\t<span>{{userContext.department}}</span>\n\t\t\t</p>\n\t\t\t<p>\n\t\t\t\t<label>Area</label>\n\t\t\t\t<span>{{userContext.area}}</span>\n\t\t\t</p>\n\t\t</div>\n\t</div>\n\t",
                styles: ["p > label { margin-bottom: 5px; font-weight: bold; }"]
            }),
            __metadata("design:paramtypes", [sample_shared_usercontext_1.UserContextService])
        ], SharedModuleSampleOneComponent);
        return SharedModuleSampleOneComponent;
    }());
    exports.SharedModuleSampleOneComponent = SharedModuleSampleOneComponent;
    var SharedModuleSampleOneModule = /** @class */ (function () {
        function SharedModuleSampleOneModule() {
        }
        SharedModuleSampleOneModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [SharedModuleSampleOneComponent],
                entryComponents: [SharedModuleSampleOneComponent]
            })
        ], SharedModuleSampleOneModule);
        return SharedModuleSampleOneModule;
    }());
    exports.SharedModuleSampleOneModule = SharedModuleSampleOneModule;
});
//# sourceMappingURL=main.js.map