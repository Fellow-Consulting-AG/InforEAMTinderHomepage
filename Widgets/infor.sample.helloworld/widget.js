define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    var HelloWorld = /** @class */ (function () {
        function HelloWorld(widgetContext) {
            this.widgetContext = widgetContext;
            // Add content to the widget element
            this.addContent();
            // Initial update of the message text
            this.updateMessage();
        }
        HelloWorld.prototype.settingsSaved = function () {
            this.updateMessage();
        };
        HelloWorld.prototype.addContent = function () {
            var div = $("<div/>");
            var h1 = $("<h1/>").css({ "margin-top": "20px", "text-align": "center" });
            div.append(h1);
            this.widgetContext.getElement().append(div);
            this.messageElement = h1;
        };
        HelloWorld.prototype.updateMessage = function () {
            var message = this.widgetContext.getSettings().get("Message");
            this.messageElement.text(message);
        };
        return HelloWorld;
    }());
    // Widget factory function
    exports.widgetFactory = function (context) {
        // Create and return the widget instance
        return new HelloWorld(context);
    };
});
//# sourceMappingURL=widget.js.map