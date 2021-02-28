var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActions = exports.QuicknoteModule = exports.QuicknoteComponent = void 0;
    var QuicknoteComponent = /** @class */ (function () {
        function QuicknoteComponent() {
        }
        QuicknoteComponent.prototype.ngOnInit = function () {
            this.lang = this.widgetContext.getLanguage();
            this.init();
            this.updateAction();
            this.setCustomTitle();
        };
        QuicknoteComponent.prototype.addNote = function (note) {
            this.notes = __spreadArrays([note], this.notes);
            this.widgetInstance.actions[0].isEnabled = this.getIsActionEnabled();
            if (this.notesEnabled) {
                this.widgetContext.save();
            }
            this.note = "";
        };
        QuicknoteComponent.prototype.clear = function () {
            this.notes = [];
            this.widgetInstance.actions[0].isEnabled = false;
            this.widgetContext.save();
        };
        QuicknoteComponent.prototype.init = function () {
            var settings = this.widgetContext.getSettings();
            this.notes = settings.get("notes");
            this.notesEnabled = settings.isSettingEnabled("notes");
        };
        QuicknoteComponent.prototype.updateAction = function () {
            var _this = this;
            var customAction = this.widgetInstance.actions[0];
            customAction.execute = function () { return _this.clear(); };
            customAction.isEnabled = this.getIsActionEnabled();
            customAction.text = this.lang.get("clear");
        };
        QuicknoteComponent.prototype.setCustomTitle = function () {
            var context = this.widgetContext;
            if (context.isTitleEditEnabled()) {
                context.setTitle("QuickNote");
            }
        };
        QuicknoteComponent.prototype.getIsActionEnabled = function () {
            return this.notesEnabled && !!this.notes.length;
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], QuicknoteComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], QuicknoteComponent.prototype, "widgetInstance", void 0);
        QuicknoteComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"card-group-action\" *ngIf=\"notesEnabled\">\n\t\t<soho-toolbar-flex>\n\t\t\t<soho-toolbar-flex-section [isButtonSet]=\"true\">\n\t\t\t\t<input class=\"input-sm\" type=\"text\" [(ngModel)]=\"note\">\n\t\t\t\t<button soho-button=\"tertiary\" [disabled]=\"!note\" (click)=\"addNote(note)\">{{lang.add}}</button>\n\t\t\t</soho-toolbar-flex-section>\n\t\t</soho-toolbar-flex>\n\t</div>\n\t<soho-listview>\n\t\t<li soho-listview-item *ngFor=\"let note of notes\">\n\t\t\t<p soho-listview-header>{{note}}</p>\n\t\t</li>\n\t</soho-listview>",
                styles: ["\n\t\t:host {\n\t\t\theight: 100%;\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\toverflow: hidden;\n\t\t}\n\n\t\tsoho-listview {\n\t\t\tflex: 1 1 auto;\n\t\t\toverflow-y: auto;\n\t\t}\n\n\t\tsoho-toolbar-flex-section {\n\t\t\tdisplay: flex;\n\t\t}\n\n\t\tinput {\n\t\t\tflex: 1 0 auto;\n\t\t}\n\t"]
            })
        ], QuicknoteComponent);
        return QuicknoteComponent;
    }());
    exports.QuicknoteComponent = QuicknoteComponent;
    var QuicknoteModule = /** @class */ (function () {
        function QuicknoteModule() {
        }
        QuicknoteModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, forms_1.FormsModule, sohoxi_angular_1.SohoListViewModule, sohoxi_angular_1.SohoButtonModule, sohoxi_angular_1.SohoToolbarFlexModule, sohoxi_angular_1.SohoInputModule],
                declarations: [QuicknoteComponent],
                entryComponents: [QuicknoteComponent]
            })
        ], QuicknoteModule);
        return QuicknoteModule;
    }());
    exports.QuicknoteModule = QuicknoteModule;
    exports.getActions = function () {
        return [{ isPrimary: true, standardIconName: "#icon-delete" }];
    };
});
//# sourceMappingURL=main.js.map