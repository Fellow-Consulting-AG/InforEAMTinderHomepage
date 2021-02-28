define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function () {
        return {
            angularConfig: {
                moduleType: main_1.WidgetSizeModule,
                componentType: main_1.WidgetSizeComponent
            }
        };
    };
});
//# sourceMappingURL=widget.js.map