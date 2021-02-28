var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "lime"], function (require, exports, common_1, core_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HelloWorldModule = exports.HelloWorldComponent = void 0;
    var HelloWorldComponent = /** @class */ (function () {
        function HelloWorldComponent() {
            this.defaultColor = "1A1A1A";
        }
        HelloWorldComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Subscribe to the event that is triggered when settings are saved to be able to update the message text
            this.widgetInstance.settingsSaved = function () {
                _this.updateContent();
            };
            // Initial update of the message text and color
            this.updateContent();
        };
        HelloWorldComponent.prototype.getColor = function () {
            var color = this.widgetContext.getSettings().get("Color");
            return color || this.defaultColor;
        };
        HelloWorldComponent.prototype.getFontSize = function () {
            var textSize = this.widgetContext.getSettings().get("TextSize");
            switch (textSize) {
                case "small":
                    return "10px";
                case "medium":
                    return "14px";
                case "large":
                    return "18px";
                case "extraLarge":
                    return "22px";
                default:
                    return "14px";
            }
        };
        HelloWorldComponent.prototype.updateContent = function () {
            this.message = this.widgetContext.getSettings().get("Message");
            this.color = "#" + this.getColor();
            this.fontSize = this.getFontSize();
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], HelloWorldComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], HelloWorldComponent.prototype, "widgetInstance", void 0);
        HelloWorldComponent = __decorate([
            core_1.Component({
                template: "\n\t<div>\n\t\t<h1 [ngStyle]=\"{'margin-top': '20px', 'text-align': 'center', 'color': color, 'font-size': fontSize}\">\n\t\t\t{{message}}\n\t\t</h1>\n\t</div>",
                styles: ["\n\t\t:host-context(.lm-theme-dark) div {\n\t\t\tbackground-color: rgba(255,255,255,0.7);\n\t\t}\n\t"]
            })
        ], HelloWorldComponent);
        return HelloWorldComponent;
    }());
    exports.HelloWorldComponent = HelloWorldComponent;
    var HelloWorldModule = /** @class */ (function () {
        function HelloWorldModule() {
        }
        HelloWorldModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [HelloWorldComponent],
                entryComponents: [HelloWorldComponent]
            })
        ], HelloWorldModule);
        return HelloWorldModule;
    }());
    exports.HelloWorldModule = HelloWorldModule;
});
//# sourceMappingURL=main.js.map