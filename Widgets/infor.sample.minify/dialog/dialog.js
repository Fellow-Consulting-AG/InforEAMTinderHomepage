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
    exports.MyDialogComponent = void 0;
    var MyDialogComponent = /** @class */ (function () {
        function MyDialogComponent() {
            this.buttonMessage = "Divide images";
            this.show = true;
        }
        MyDialogComponent.prototype.ngOnInit = function () {
            this.topIcon = this.parameters.topIcon;
            this.middleIcon = this.parameters.middleIcon;
            this.bottomIcon = this.parameters.bottomIcon;
        };
        MyDialogComponent.prototype.toggleClass = function () {
            if (this.show) {
                this.show = false;
                this.buttonMessage = "Combine images";
            }
            else {
                this.show = true;
                this.buttonMessage = "Divide images";
            }
        };
        MyDialogComponent.prototype.onClose = function () {
            this.dialog.close({
                value: "someResult"
            });
        };
        MyDialogComponent = __decorate([
            core_1.Component({
                template: "\n\t<div>\n\t\t<div class=\"lm-text-align-c\">\n\t\t<button soho-button=\"icon\" icon=\"minimize\" toggle=\"maximize\" (click)=\"toggleClass()\"></button>\n\t\t\t{{buttonMessage}}\n\t\t</div>\n\t\t<div class=\"infor-sample-minify-widget-dialog-max-width\">\n\t\t\t<img class=\"merge\" src=\"{{topIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t\t<img class=\"merge\" src=\"{{middleIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t\t<img class=\"merge\" src=\"{{bottomIcon}}\" [ngClass]=\"{'show': show}\" />\n\t\t</div>\n\t\t<div class=\"modal-buttonset\">\n\t\t\t<button class=\"btn-modal\" (click)=\"onClose()\">Close</button>\n\t\t</div>\n\t</div>\n\t",
                styles: [
                    "\n\t.infor-sample-minify-widget-dialog-max-width{max-width:400px;min-height:240px;}\n\t"
                ]
            }),
            __metadata("design:paramtypes", [])
        ], MyDialogComponent);
        return MyDialogComponent;
    }());
    exports.MyDialogComponent = MyDialogComponent;
});
//# sourceMappingURL=dialog.js.map