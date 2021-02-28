var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "lime"], function (require, exports, core_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EditItemComponent = void 0;
    var EditItemComponent = /** @class */ (function () {
        function EditItemComponent(translationService) {
            this.translationService = translationService;
            this.item = {};
            this.maxTitle = 40;
            this.maxDescription = 100;
            this.isTranslation = translationService.isEnabled();
        }
        EditItemComponent.prototype.ngOnInit = function () {
            this.item = this.parameter.item;
            this.lang = this.parameter.lang;
        };
        EditItemComponent.prototype.onClose = function () {
            this.dialog.close();
        };
        EditItemComponent.prototype.onSave = function () {
            this.dialog.close(this.item);
        };
        EditItemComponent.prototype.canSave = function () {
            var item = this.item;
            return !!item.title && !!item.description;
        };
        EditItemComponent.prototype.onTranslations = function () {
            var item = this.item;
            var options = {
                view: this.view,
                data: item.translations || {},
                items: [
                    {
                        name: "title",
                        label: this.lang.name,
                        labelId: "sample-ct-tr-ttl-lbl",
                        valueId: "sample-ct-tr-ttl-v",
                        maxLength: this.maxTitle,
                        isPrimary: true,
                        defaultValue: item.title
                    }, {
                        name: "description",
                        label: this.lang.description,
                        labelId: "sample-ct-tr-desc-lbl",
                        valueId: "sample-ct-tr-desc-v",
                        maxLength: this.maxDescription,
                        defaultValue: item.description
                    }
                ]
            };
            this.translationService.translate(options).subscribe(function (result) {
                item.translations = result.data;
            }, function (cancelResult) {
                // Handle cancel
            });
        };
        __decorate([
            core_1.ViewChild("editItemView", { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], EditItemComponent.prototype, "view", void 0);
        EditItemComponent = __decorate([
            core_1.Component({
                template: "\n\t<div #editItemView style=\"max-width: 390px\">\n\t\t<div>\n\t\t\t<div class=\"field\">\n\t\t\t\t<label class=\"required\" for=\"sample-ct-edt-ttl\">{{lang.title}}</label>\n\t\t\t\t<input id=\"sample-ct-edt-ttl\" name=\"sample-ct-edt-ttl\" type=\"text\"\n\t\t\t\t[(ngModel)]=\"item.title\"\n\t\t\t\t[maxlength]=\"maxTitle\"\n\t\t\t\tdata-validate=\"required\" />\n\t\t\t</div>\n\n\t\t\t<div class=\"field\">\n\t\t\t\t<label class=\"required\" for=\"sample-ct-edt-desc\">{{lang.description}}</label>\n\t\t\t\t<input id=\"sample-ct-edt-desc\" type=\"text\"\n\t\t\t\t[(ngModel)]=\"item.description\"\n\t\t\t\t[maxlength]=\"maxDescription\"\n\t\t\t\tdata-validate=\"required\" />\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div *ngIf=\"isTranslation\" class=\"field\">\n\t\t\t<button class=\"btn-secondary\" (click)=\"onTranslations()\">{{lang.translations}}</button>\n\t\t</div>\n\n\t\t<div class=\"modal-buttonset\">\n\t\t\t<button class=\"btn-modal\" (click)=\"onClose()\">{{lang.cancel}}</button>\n\t\t\t<button class=\"btn-modal-primary no-validation\" [disabled]=\"!canSave()\" (click)=\"onSave()\">\n\t\t\t\t{{lang.save}}\n\t\t\t</button>\n\t\t</div>\n\t</div>"
            }),
            __metadata("design:paramtypes", [lime_1.TranslationService])
        ], EditItemComponent);
        return EditItemComponent;
    }());
    exports.EditItemComponent = EditItemComponent;
});
//# sourceMappingURL=item-dialog.js.map