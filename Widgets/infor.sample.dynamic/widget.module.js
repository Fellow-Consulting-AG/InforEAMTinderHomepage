var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "./dynamic-one.component", "./dynamic-two.component", "./widget.component"], function (require, exports, common_1, core_1, sohoxi_angular_1, dynamic_one_component_1, dynamic_two_component_1, widget_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetModule = void 0;
    var WidgetModule = /** @class */ (function () {
        function WidgetModule() {
        }
        WidgetModule = __decorate([
            core_1.NgModule({
                declarations: [
                    widget_component_1.WidgetComponent,
                    dynamic_one_component_1.DynamicOneComponent,
                    dynamic_two_component_1.DynamicTwoComponent,
                ],
                imports: [
                    common_1.CommonModule,
                    sohoxi_angular_1.SohoButtonModule,
                ],
                entryComponents: [
                    widget_component_1.WidgetComponent,
                    dynamic_one_component_1.DynamicOneComponent,
                    dynamic_two_component_1.DynamicTwoComponent,
                ],
            })
        ], WidgetModule);
        return WidgetModule;
    }());
    exports.WidgetModule = WidgetModule;
});
//# sourceMappingURL=widget.module.js.map