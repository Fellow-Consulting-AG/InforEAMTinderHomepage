define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function () {
        return {
            angularConfig: {
                moduleType: main_1.IDSTestModule,
                componentType: main_1.IDSTestComponent
            },
            actions: [
                { isPrimary: true, standardIconName: "#icon-cascade-objects", text: "Modal" },
                { text: "Modal with default values" }
            ]
        };
    };
});
//# sourceMappingURL=widget.js.map