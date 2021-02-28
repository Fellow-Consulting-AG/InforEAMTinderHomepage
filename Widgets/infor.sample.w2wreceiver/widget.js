define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            angularConfig: {
                moduleType: main_1.W2WReceiverModule,
                componentType: main_1.W2WReceiverComponent
            }
        };
    };
});
//# sourceMappingURL=widget.js.map