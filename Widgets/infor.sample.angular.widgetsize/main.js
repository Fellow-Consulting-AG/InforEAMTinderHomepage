var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "lime", "./styles"], function (require, exports, common_1, core_1, lime_1, styles_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WidgetSizeModule = exports.WidgetSizeComponent = void 0;
    var WidgetSizeComponent = /** @class */ (function () {
        function WidgetSizeComponent() {
        }
        WidgetSizeComponent.prototype.ngOnInit = function () {
            this.size$ = this.widgetContext.getSize();
            this.infoMsg = this.widgetContext.getLanguage().get("infoMsg");
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], WidgetSizeComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], WidgetSizeComponent.prototype, "widgetInstance", void 0);
        WidgetSizeComponent = __decorate([
            core_1.Component({
                template: "<div *ngIf=\"size$ | async as size\" [class.stacked]=\"size.cols < 3\">\n\t\t\t<h1 [class.red]=\"size.cols === 1\"\n\t\t\t\t [class.blue]=\"size.cols === 2\"\n\t\t\t\t [class.orange]=\"size.cols === 3\"\n\t\t\t\t [class.green]=\"size.cols === 4\">\n\t\t\t\t{{size.cols}} x {{size.rows}}\n\t\t\t</h1>\n\t\t\t<p>{{infoMsg}}</p>\n\t\t</div>\n\t\t",
                styles: styles_1.styles,
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            })
        ], WidgetSizeComponent);
        return WidgetSizeComponent;
    }());
    exports.WidgetSizeComponent = WidgetSizeComponent;
    var WidgetSizeModule = /** @class */ (function () {
        function WidgetSizeModule() {
        }
        WidgetSizeModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [WidgetSizeComponent],
                entryComponents: [WidgetSizeComponent]
            })
        ], WidgetSizeModule);
        return WidgetSizeModule;
    }());
    exports.WidgetSizeModule = WidgetSizeModule;
});
//# sourceMappingURL=main.js.map