var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "sample-shared-usercontext"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, sample_shared_usercontext_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SharedModuleSampleTwoModule = exports.SharedModuleSampleTwoComponent = void 0;
    var SharedModuleSampleTwoComponent = /** @class */ (function () {
        function SharedModuleSampleTwoComponent(userContextService) {
            this.userContextService = userContextService;
        }
        SharedModuleSampleTwoComponent.prototype.getAndSetUserContext = function () {
            var _this = this;
            this.setBusy(true);
            this.userContextService.getUserContext(this.widgetContext).subscribe(function (result) {
                _this.userContext = result;
            }, function (onError) {
                lime_1.Log.error("Failed to get User Context " + onError);
            }, function () {
                _this.setBusy(false);
            });
        };
        SharedModuleSampleTwoComponent.prototype.setBusy = function (isBusy) {
            this.widgetContext.setState(isBusy ? lime_1.WidgetState.busy : lime_1.WidgetState.running);
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], SharedModuleSampleTwoComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], SharedModuleSampleTwoComponent.prototype, "widgetInstance", void 0);
        SharedModuleSampleTwoComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"lm-padding-lg\">\n\t\t<p>User context will be loaded only once and shared among all widgets using the specified shared module</p>\n\t\t<div class=\"lm-margin-md-t\">\n\t\t\t<button soho-button=\"primary\" (click)=\"getAndSetUserContext()\">Get user info</button>\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>Name</label>\n\t\t\t<input [value]=\"userContext?.name\" readonly/>\n\t\t</div>\n\t\t<div class=\"field\">\n\t\t\t<label>User ID</label>\n\t\t\t<input [value]=\"userContext?.userId\" readonly class=\"input-sm\"/>\n\t\t</div>\n\t\t<div class=\"compound-field\">\n\t\t\t<div class=\"field\">\n\t\t\t\t<label>Department</label>\n\t\t\t\t<input [value]=\"userContext?.department\" readonly class=\"input-sm\"/>\n\t\t\t</div>\n\t\t\t<div class=\"field\">\n\t\t\t\t<label>Area</label>\n\t\t\t\t<input [value]=\"userContext?.area\" readonly class=\"input-xs\"/>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t",
                styles: ["\n\t\tdiv > p {\n\t\t\ttext-align: center;\n\t\t\tfont-style: italic;\n\t\t\tfont-size: 12px;\n\t\t}\n\n\t\tdiv > p + div {\n\t\t\ttext-align: center;\n\t\t}\n\n\t\t.field {\n\t\t\tmargin-bottom: 10px;\n\t\t}\n\n\t\t.compound-field > field {\n\t\t\tmargin-bottom: 0;\n\t\t}\n\t"]
            }),
            __metadata("design:paramtypes", [sample_shared_usercontext_1.UserContextService])
        ], SharedModuleSampleTwoComponent);
        return SharedModuleSampleTwoComponent;
    }());
    exports.SharedModuleSampleTwoComponent = SharedModuleSampleTwoComponent;
    var SharedModuleSampleTwoModule = /** @class */ (function () {
        function SharedModuleSampleTwoModule() {
        }
        SharedModuleSampleTwoModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, forms_1.FormsModule, sohoxi_angular_1.SohoButtonModule],
                declarations: [SharedModuleSampleTwoComponent],
                entryComponents: [SharedModuleSampleTwoComponent]
            })
        ], SharedModuleSampleTwoModule);
        return SharedModuleSampleTwoModule;
    }());
    exports.SharedModuleSampleTwoModule = SharedModuleSampleTwoModule;
});
//# sourceMappingURL=main.js.map