var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IDSModalComponent = void 0;
    var IDSModalComponent = /** @class */ (function () {
        function IDSModalComponent() {
            this.setDefaultValues = false;
        }
        IDSModalComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<div id=\"lm-tst-mod\">\n\t\t\t<ids-components\n\t\t\t\t[widgetContext]=\"widgetContext\"\n\t\t\t\t[widgetInstance]=\"widgetInstance\"\n\t\t\t\t[openedAsModal]=\"true\"\n\t\t\t\t[setDefaultValues]=\"setDefaultValues\">\n\t\t\t</ids-components>\n\t\t\t<div class=\"modal-buttonset\">\n\t\t\t\t<button class=\"btn-modal\" (click)=\"modalRef.close()\">Cancel</button>\n\t\t\t\t<button class=\"btn-modal-primary\" (click)=\"modalRef.close()\">OK</button>\n\t\t\t</div>\n\t\t</div>\n\t"
            })
        ], IDSModalComponent);
        return IDSModalComponent;
    }());
    exports.IDSModalComponent = IDSModalComponent;
});
//# sourceMappingURL=modal.js.map