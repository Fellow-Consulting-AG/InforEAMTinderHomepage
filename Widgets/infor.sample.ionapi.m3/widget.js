define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            angularConfig: {
                moduleType: main_1.IonApiM3Module,
                componentType: main_1.IonApiM3Component
            }
        };
    };
});
//# sourceMappingURL=widget.js.map