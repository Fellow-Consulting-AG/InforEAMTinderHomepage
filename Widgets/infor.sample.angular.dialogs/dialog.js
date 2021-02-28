var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomDialogComponent = void 0;
    var CustomDialogComponent = /** @class */ (function () {
        function CustomDialogComponent() {
            this.dialogResult = "Sample dialog result";
        }
        CustomDialogComponent.prototype.onOk = function () {
            this.dialog.close({ value: this.dialogResult });
        };
        CustomDialogComponent = __decorate([
            core_1.Component({
                template: "\n\t<div>\n\t\t<form role=\"form\">\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"one-half column\">\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label for=\"infor-sample-dialogs-input-parameter\">Dialog parameter</label>\n\t\t\t\t\t\t<input id=\"infor-sample-dialogs-input-parameter\"\n\t\t\t\t\t\t\t[(ngModel)]=\"dialogParameter\"\n\t\t\t\t\t\t\tmaxlength=\"64\"\n\t\t\t\t\t\t\tname=\"dialogparam\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"one-half column\">\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label for=\"infor-sample-dialogs-input-result\">Dialog result</label>\n\t\t\t\t\t\t<input id=\"infor-sample-dialogs-input-result\"\n\t\t\t\t\t\t\t[(ngModel)]=\"dialogResult\"\n\t\t\t\t\t\t\tmaxlength=\"64\"\n\t\t\t\t\t\t\tname=\"dialogresult\" />\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"modal-buttonset\">\n\t\t\t\t<button class=\"btn-modal\" (click)=\"dialog?.close()\">Cancel</button>\n\t\t\t\t<button class=\"btn-modal-primary\" (click)=\"onOk()\">OK</button>\n\t\t\t</div>\n\t\t</form>\n\t</div>"
            })
        ], CustomDialogComponent);
        return CustomDialogComponent;
    }());
    exports.CustomDialogComponent = CustomDialogComponent;
});
//# sourceMappingURL=dialog.js.map