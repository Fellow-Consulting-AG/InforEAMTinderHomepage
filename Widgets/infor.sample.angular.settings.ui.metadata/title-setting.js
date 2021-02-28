var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TitleSettingComponent = void 0;
    /**
     * This component can be used to display a Title setting field with a padlock.
     * It works with the given (required) widgetSettingContext to determine whether title should
     * be locked, unlocked, editable, unlockable etc.
     *
     * Call save() to commit the changes to the widget settings.
     */
    var TitleSettingComponent = /** @class */ (function () {
        function TitleSettingComponent() {
        }
        TitleSettingComponent.prototype.ngOnInit = function () {
            if (!this.widgetSettingsContext) {
                throw new Error("Required input: widgetSettingsContext");
            }
            var widgetContext = this.widgetSettingsContext.getWidgetContext();
            this.isTitleEditEnabled = widgetContext.isTitleEditEnabled();
            this.isTitleLocked = widgetContext.isTitleLocked();
            this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
            this.isTitleUnlockable = widgetContext.isTitleUnlockable();
        };
        Object.defineProperty(TitleSettingComponent.prototype, "lockIcon", {
            get: function () {
                return this.isTitleLocked ? "locked" : "unlocked";
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Persist changes to the title and lock by saving to widget context.
         */
        TitleSettingComponent.prototype.save = function () {
            var widgetContext = this.widgetSettingsContext.getWidgetContext();
            widgetContext.setTitleLocked(this.isTitleLocked);
            if (this.isTitleEditEnabled) {
                widgetContext.setTitle(this.title);
            }
        };
        TitleSettingComponent.prototype.onLockClicked = function () {
            this.isTitleLocked = !!!this.isTitleLocked;
            if (this.isTitleLocked) {
                var widgetContext = this.widgetSettingsContext.getWidgetContext();
                this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
            }
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], TitleSettingComponent.prototype, "widgetSettingsContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], TitleSettingComponent.prototype, "label", void 0);
        TitleSettingComponent = __decorate([
            core_1.Component({
                selector: "infor-sample-setting-title-field",
                template: "\n\t<div class=\"field\">\n\t\t<label *ngIf=\"label\">{{label}}</label>\n\t\t<input [readOnly]=\"!isTitleEditEnabled || isTitleLocked\" [(ngModel)]=\"title\" />\n\t\t<button\n\t\t\tsoho-button=\"icon\"\n\t\t\t[icon]=\"lockIcon\"\n\t\t\t[disabled]=\"!isTitleUnlockable\"\n\t\t\t(click)=\"onLockClicked()\">\n\t\t</button>\n\t</div>\n\t",
            })
        ], TitleSettingComponent);
        return TitleSettingComponent;
    }());
    exports.TitleSettingComponent = TitleSettingComponent;
});
//# sourceMappingURL=title-setting.js.map