var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ContextParametersModule = exports.ContextParametersComponent = exports.InformationDialogComponent = void 0;
    var InformationDialogComponent = /** @class */ (function () {
        function InformationDialogComponent() {
        }
        InformationDialogComponent.prototype.ngOnInit = function () {
            this.infoMessage =
                "infor.companyon.client.listeningMessageTypes.applicationDrillback[0].handler" +
                    ("({ \"applicationDrillback\": \"?LogicalId=lid://infor.homepages.1&page=" + this.pageId + "&") +
                    "param1=hellofromparamone&param2=contentfromparam2\" })";
        };
        InformationDialogComponent.prototype.close = function () {
            this.dialog.close();
        };
        InformationDialogComponent = __decorate([
            core_1.Component({
                template: "\n\t<span class=\"label\">\n\t\tCopy and execute below code in the Browser developer tools console to mock a drillback to Homepages.\n\t</span>\n\t<span class=\"label\">\n\t\tTo open another page from the drillback, find the page id in My Pages by right-clicking the card header.\n\t</span>\n\t<span class=\"label\">\n\t\tThis widget resolves parameters \"param1\" and \"param2\" from the URL.\n\t</span>\n\t<div class=\"field\">\n\t\t<textarea soho-textarea style=\"width: 100%; min-height: 110px;\"\n\t\t\t[resizable]=\"true\"\n\t\t\tname=\"test\"\n\t\t\t[(ngModel)]=\"infoMessage\">\n\t\t</textarea>\n\t</div>\n\t<div class=\"modal-buttonset\">\n\t\t<button class=\"btn-modal-primary\" (click)=\"close()\">OK</button>\n\t</div>"
            })
        ], InformationDialogComponent);
        return InformationDialogComponent;
    }());
    exports.InformationDialogComponent = InformationDialogComponent;
    var ContextParametersComponent = /** @class */ (function () {
        function ContextParametersComponent(widgetContext, widgetInstance, sohoModalDialogService) {
            var _this = this;
            this.widgetContext = widgetContext;
            this.widgetInstance = widgetInstance;
            this.sohoModalDialogService = sohoModalDialogService;
            widgetInstance.activated = function () {
                _this.updateValues();
            };
            widgetInstance.actions = [{
                    isPrimary: true,
                    standardIconName: "#icon-info",
                    text: "Information",
                    execute: function () { return _this.openInformationDialog(); }
                }];
        }
        ContextParametersComponent.prototype.ngOnInit = function () {
            this.updateValues();
        };
        ContextParametersComponent.prototype.updateValues = function () {
            // Only update members if the parameter values have changed
            var param1 = this.getParameterValue("param1");
            if (param1 !== this.paramValue1) {
                this.paramValue1 = param1;
            }
            var param2 = this.getParameterValue("param2");
            if (param2 !== this.paramValue2) {
                this.paramValue2 = param2;
            }
        };
        ContextParametersComponent.prototype.getParameterValue = function (name) {
            return this.widgetContext.getContextParameter(name);
        };
        ContextParametersComponent.prototype.openInformationDialog = function () {
            var _this = this;
            var dialog = this.sohoModalDialogService
                .modal(InformationDialogComponent, this.widgetView)
                .title("Information");
            dialog.apply(function (component) {
                component.dialog = dialog;
                component.pageId = _this.widgetContext.getPageId();
            }).open();
        };
        __decorate([
            core_1.ViewChild("widgetView", { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], ContextParametersComponent.prototype, "widgetView", void 0);
        ContextParametersComponent = __decorate([
            core_1.Component({
                template: "\n\t<div #widgetView class=\"lm-text-align-c lm-padding-xl\">\n\t\t<p>Parameter one:</p>\n\t\t<p class=\"param-value\" [class.value-found]=\"paramValue1\">\n\t\t\t{{ paramValue1 || \"No value found for URL parameter 'param1'\" }}\n\t\t</p>\n\t\t<p>Parameter two:</p>\n\t\t<p class=\"param-value\" [class.value-found]=\"paramValue2\">\n\t\t\t{{ paramValue2 || \"No value found for URL parameter 'param2'\" }}\n\t\t</p>\n\t</div>\n\t",
                styles: ["\n\t\t.param-value {\n\t\t\tcolor: #E84F4F;\n\t\t\tmargin-top: 0;\n\t\t}\n\n\t\t.param-value.value-found  {\n\t\t\tcolor: #80CE4D;\n\t\t}\n\t"]
            }),
            __param(0, core_1.Inject(lime_1.widgetContextInjectionToken)),
            __param(1, core_1.Inject(lime_1.widgetInstanceInjectionToken)),
            __metadata("design:paramtypes", [lime_1.IWidgetContext,
                lime_1.IWidgetInstance,
                sohoxi_angular_1.SohoModalDialogService])
        ], ContextParametersComponent);
        return ContextParametersComponent;
    }());
    exports.ContextParametersComponent = ContextParametersComponent;
    var ContextParametersModule = /** @class */ (function () {
        function ContextParametersModule() {
        }
        ContextParametersModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, forms_1.FormsModule, sohoxi_angular_1.SohoTextAreaModule],
                declarations: [ContextParametersComponent, InformationDialogComponent],
                entryComponents: [ContextParametersComponent, InformationDialogComponent]
            })
        ], ContextParametersModule);
        return ContextParametersModule;
    }());
    exports.ContextParametersModule = ContextParametersModule;
});
//# sourceMappingURL=main.js.map