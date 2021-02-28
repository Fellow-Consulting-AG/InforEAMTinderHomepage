define(["require", "exports", "./lifecycle.component", "./lifecycle.module"], function (require, exports, lifecycle_component_1, lifecycle_module_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            angularConfig: {
                moduleType: lifecycle_module_1.LifecycleModule,
                componentType: lifecycle_component_1.LifecycleComponent,
            },
        };
    };
});
//# sourceMappingURL=widget.js.map