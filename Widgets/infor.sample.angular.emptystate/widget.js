define(["require", "exports", "./main"], function (require, exports, main_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    exports.widgetFactory = function (context) {
        return {
            angularConfig: {
                moduleType: main_1.EmptyStateModule,
                componentType: main_1.EmptyStateComponent
            },
            isConfigured: function () {
                if (context.getSettings().get("Message")) {
                    return true;
                }
                else {
                    return false;
                }
            }
        };
    };
});
//# sourceMappingURL=widget.js.map