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
    exports.EmptyStateModule = exports.EmptyStateComponent = void 0;
    var EmptyStateComponent = /** @class */ (function () {
        /**
         * Empty State configuration (icon, titleId, descriptionId, buttonId) is set in the widget manifest.
         * Possible icon choices: "generic", "error-loading", "new-project", "no-alerts", "no-analytics", "no-budget",
         * "no-data", "no-events", "no-notes", "no-orders", "no-tasks"
         */
        function EmptyStateComponent() {
        }
        EmptyStateComponent.prototype.ngOnInit = function () {
            var _this = this;
            // Subscribe to the event that is triggered when settings are saved to be able to update the message text
            this.widgetInstance.settingsSaved = function () {
                _this.updateContent();
            };
            // Initial update of the message text
            this.updateContent();
            /*
                The optional function
                emptyConfigClicked? () => void;
                can be used to override the default behaviour of the empty state button, which is to open the Settings Dialog.
                Code example:
                ----------------------------------------------------
                this.widgetInstance.emptyConfigClicked = () => {
                    // custom behaviour
                }
                ----------------------------------------------------
            */
        };
        EmptyStateComponent.prototype.updateContent = function () {
            this.message = this.widgetContext.getSettings().get("Message");
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], EmptyStateComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], EmptyStateComponent.prototype, "widgetInstance", void 0);
        EmptyStateComponent = __decorate([
            core_1.Component({
                template: "\n\t<div>\n\t\t<h1>\n\t\t\t{{message}}\n\t\t</h1>\n\t</div>",
                styles: ["\n\t\th1 {\n\t\t\tpadding: 40px 40px;\n\t\t\ttext-align: center;\n\t\t}\n\t"]
            })
            /**
             * Empty State configuration (icon, titleId, descriptionId, buttonId) is set in the widget manifest.
             * Possible icon choices: "generic", "error-loading", "new-project", "no-alerts", "no-analytics", "no-budget",
             * "no-data", "no-events", "no-notes", "no-orders", "no-tasks"
             */
        ], EmptyStateComponent);
        return EmptyStateComponent;
    }());
    exports.EmptyStateComponent = EmptyStateComponent;
    var EmptyStateModule = /** @class */ (function () {
        function EmptyStateModule() {
        }
        EmptyStateModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [EmptyStateComponent],
                entryComponents: [EmptyStateComponent]
            })
        ], EmptyStateModule);
        return EmptyStateModule;
    }());
    exports.EmptyStateModule = EmptyStateModule;
});
//# sourceMappingURL=main.js.map