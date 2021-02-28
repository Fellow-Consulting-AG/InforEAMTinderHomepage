define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            actions: main_1.getActions(context),
            angularConfig: {
                moduleType: main_1.SubmenuModule,
                componentType: main_1.SubmenuComponent
            }
        };
    };
});
//# sourceMappingURL=widget.js.map