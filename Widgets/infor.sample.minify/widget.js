define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            angularConfig: {
                moduleType: main_1.MinifySampleModule,
                componentType: main_1.MinifySampleComponent
            },
            actions: main_1.getActions()
        };
    };
});
//# sourceMappingURL=widget.js.map