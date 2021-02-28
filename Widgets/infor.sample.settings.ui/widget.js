define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.widgetFactory = void 0;
    /**
     * Custom settings sample widget.
     *
     * The widget shows a large SVG icon with a color that can be changed in settings.
     * The widget uses a custom settings UI with a color picker for changing the icon color.
     */
    var SettingsSample = /** @class */ (function () {
        function SettingsSample(widgetContext) {
            this.widgetContext = widgetContext;
            this.defaultColor = "#13a7fe";
            // Get the language object from the widget context.
            this.language = widgetContext.getLanguage();
            // Create the widget content and add it to the parent element from the widget context.
            this.svg = this.createContent();
            this.widgetContext.getElement().append($("<div/>").addClass("lm-size-full lm-padding-lg").append(this.svg));
            this.updateColor();
        }
        /**
         * Custom settings UI factory function.
         */
        SettingsSample.prototype.widgetSettingsFactory = function (settingsContext) {
            var _this = this;
            var element = settingsContext.getElement();
            this.picker = this.addSettings(element);
            element.initialize(null);
            var instance = {
                closing: function (arg) {
                    if (arg.isSave) {
                        _this.onSettingsSaved();
                    }
                }
            };
            return instance;
        };
        /**
         * Gets the icon color from settings.
         * @returns The color from the widget settings or a default color.
         */
        SettingsSample.prototype.getColor = function () {
            var color = this.widgetContext.getSettings().get("color");
            return color || this.defaultColor;
        };
        /**
         * Updates the color of the SVG icon.
         */
        SettingsSample.prototype.updateColor = function () {
            this.svg.css("color", this.getColor());
        };
        /**
         * Saves the color setting value and updates the content with the new color.
         */
        SettingsSample.prototype.onSettingsSaved = function () {
            var color = this.picker.val();
            this.widgetContext.getSettings().set("color", color);
            this.updateColor();
        };
        /**
         * Adds the settings content.
         * @param element The parent settings element.
         * @returns The color picker element.
         */
        SettingsSample.prototype.addSettings = function (element) {
            // Get the localized label text
            var labelText = this.language.color;
            var div = $('<div class="field"></div>');
            div.append($("<label/>").text(labelText));
            var picker = $('<input class="colorpicker" type="text" />');
            picker.val(this.getColor());
            div.append(picker);
            element.append(div);
            return picker;
        };
        /**
         * Creates an SVG element with a large time picker icon.
         * @returns An SVG JQuery element.
         */
        SettingsSample.prototype.createContent = function () {
            var svg = $("<svg class='icon' focusable='false' aria-hidden='true'><use xlink:href='#icon-clock'></use></svg>");
            svg.addClass("lm-size-full");
            return svg;
        };
        return SettingsSample;
    }());
    // Widget factory function
    exports.widgetFactory = function (context) {
        // Create and return the widget instance
        return new SettingsSample(context);
    };
});
//# sourceMappingURL=widget.js.map