var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./core", "./pipes"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, core_2, pipes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardGroupActionModule = exports.CardGroupActionComponent = void 0;
    var CardGroupActionComponent = /** @class */ (function () {
        function CardGroupActionComponent() {
            this.items = [];
            this.categories = [core_2.Category.All, core_2.Category.Customer, core_2.Category.Warehouse];
            this.selectedCategory = core_2.Category.All;
        }
        CardGroupActionComponent.prototype.ngOnInit = function () {
            this.items = core_2.mockData;
        };
        CardGroupActionComponent.prototype.setCategory = function (category) {
            this.selectedCategory = category;
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], CardGroupActionComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], CardGroupActionComponent.prototype, "widgetInstance", void 0);
        CardGroupActionComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<div class=\"card-group-action\">\n\t\t\t<soho-toolbar-flex>\n\t\t\t\t<soho-toolbar-flex-section [isTitle]=\"true\"></soho-toolbar-flex-section>\n\t\t\t\t<soho-toolbar-flex-section [isButtonSet]=\"true\">\n\t\t\t\t\t<button soho-menu-button\n\t\t\t\t\t\t\t  icon=\"filter\"\n\t\t\t\t\t\t\t  menu=\"filtermenu\">\n\t\t\t\t\t\t<span>{{selectedCategory}}</span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<ul soho-popupmenu\n\t\t\t\t\t\t id=\"filtermenu\">\n\t\t\t\t\t\t<li soho-popupmenu-item\n\t\t\t\t\t\t\t *ngFor=\"let category of categories\"\n\t\t\t\t\t\t\t (click)=\"setCategory(category)\">\n\t\t\t\t\t\t\t<a soho-popupmenu-label>{{category}}</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</soho-toolbar-flex-section>\n\t\t\t</soho-toolbar-flex>\n\t\t</div>\n\t\t<soho-listview>\n\t\t\t<li soho-listview-item\n\t\t\t\t *ngFor=\"let item of items | filterBy: selectedCategory\">\n\t\t\t\t<p soho-listview-header>{{item.title}}</p>\n\t\t\t\t<p soho-listview-subheader>{{item.description}}</p>\n\t\t\t</li>\n\t\t</soho-listview>\n\t",
                styles: ["\n\t\t:host {\n\t\t\theight: 100%;\n\t\t\twidth: 100%;\n\t\t\toverflow: hidden;\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t}\n\n\t\t.card-group-action {\n\t\t\tflex: 0 0 auto;\n\t\t}\n\n\t\tsoho-listview {\n\t\t\toverflow: auto;\n\t\t\tflex: 1 1 auto;\n\t\t}\n\t"],
                changeDetection: core_1.ChangeDetectionStrategy.OnPush
            })
        ], CardGroupActionComponent);
        return CardGroupActionComponent;
    }());
    exports.CardGroupActionComponent = CardGroupActionComponent;
    var CardGroupActionModule = /** @class */ (function () {
        function CardGroupActionModule() {
        }
        CardGroupActionModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule, sohoxi_angular_1.SohoMenuButtonModule, sohoxi_angular_1.SohoPopupMenuModule, sohoxi_angular_1.SohoToolbarFlexModule],
                declarations: [CardGroupActionComponent, pipes_1.CategoryFilterPipe],
                entryComponents: [CardGroupActionComponent]
            })
        ], CardGroupActionModule);
        return CardGroupActionModule;
    }());
    exports.CardGroupActionModule = CardGroupActionModule;
});
//# sourceMappingURL=main.js.map