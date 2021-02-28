var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "./components/counter.component", "./components/dialog.component", "./components/global-counter.component", "./components/local-counter.component", "./components/shared-counter.component", "./components/widget.component"], function (require, exports, common_1, core_1, sohoxi_angular_1, counter_component_1, dialog_component_1, global_counter_component_1, local_counter_component_1, shared_counter_component_1, widget_component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetModule = void 0;
    var WidgetModule = /** @class */ (function () {
        function WidgetModule() {
        }
        WidgetModule = __decorate([
            core_1.NgModule({
                imports: [
                    common_1.CommonModule,
                    sohoxi_angular_1.SohoButtonModule,
                    sohoxi_angular_1.SohoTooltipModule,
                ],
                declarations: [
                    widget_component_1.WidgetComponent,
                    counter_component_1.CounterComponent,
                    global_counter_component_1.GlobalCounterComponent,
                    local_counter_component_1.LocalCounterComponent,
                    shared_counter_component_1.SharedCounterComponent,
                    dialog_component_1.DialogComponent,
                ],
                entryComponents: [
                    widget_component_1.WidgetComponent,
                    dialog_component_1.DialogComponent,
                ],
            })
        ], WidgetModule);
        return WidgetModule;
    }());
    exports.WidgetModule = WidgetModule;
});
//# sourceMappingURL=widget.module.js.map