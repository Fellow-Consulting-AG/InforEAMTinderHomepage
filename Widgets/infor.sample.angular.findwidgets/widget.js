define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            actions: main_1.getActions(context),
            angularConfig: {
                componentType: main_1.FindWidgetsComponent,
                moduleType: main_1.FindWidgetsModule,
            }
        };
    };
});
//# sourceMappingURL=widget.js.map