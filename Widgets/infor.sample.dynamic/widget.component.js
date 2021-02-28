var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "./dynamic-one.component", "./dynamic-two.component"], function (require, exports, core_1, dynamic_one_component_1, dynamic_two_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetComponent = void 0;
    var WidgetComponent = /** @class */ (function () {
        function WidgetComponent(resolver) {
            this.resolver = resolver;
        }
        WidgetComponent.prototype.loadOne = function () {
            this.load(dynamic_one_component_1.DynamicOneComponent);
        };
        WidgetComponent.prototype.loadTwo = function () {
            this.load(dynamic_two_component_1.DynamicTwoComponent);
        };
        WidgetComponent.prototype.load = function (component) {
            var factory = this.resolver.resolveComponentFactory(component);
            this.dynamicHost.clear();
            var ref = this.dynamicHost.createComponent(factory);
            return ref;
        };
        __decorate([
            core_1.ViewChild("dynamicHost", { read: core_1.ViewContainerRef }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], WidgetComponent.prototype, "dynamicHost", void 0);
        WidgetComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<button soho-button=\"primary\" (click)=\"loadOne()\">Load One</button>\n\t\t<button soho-button=\"primary\" (click)=\"loadTwo()\">Load Two</button>\n\t\t<ng-container #dynamicHost></ng-container>\n\t",
            }),
            __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
        ], WidgetComponent);
        return WidgetComponent;
    }());
    exports.WidgetComponent = WidgetComponent;
});
//# sourceMappingURL=widget.component.js.map