var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DialogComponent = void 0;
    var DialogComponent = /** @class */ (function () {
        function DialogComponent() {
        }
        DialogComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"row\">\n\t\t<div class=\"twelve columns\">\n\t\t\t<p>\n\t\t\t\tThis component is created outside the widget component tree, so it has to provide its own SharedCounterService.\n\t\t\t\tIt will only share state with the rest of the widget (and other widget instances) through the GlobalCounterService.\n\t\t\t</p>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"twelve columns lm-padding-md\">\n\t\t\t<global-counter></global-counter>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t<shared-counter></shared-counter>\n\t\t</div>\n\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t<shared-counter></shared-counter>\n\t\t</div>\n\t</div>\n\t<div class=\"row\">\n\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t<local-counter></local-counter>\n\t\t</div>\n\t\t<div class=\"six columns lm-padding-md\">\n\t\t\t<local-counter></local-counter>\n\t\t</div>\n\t</div>\n\t",
            })
        ], DialogComponent);
        return DialogComponent;
    }());
    exports.DialogComponent = DialogComponent;
});
//# sourceMappingURL=dialog.component.js.map