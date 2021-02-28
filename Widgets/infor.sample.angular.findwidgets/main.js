var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "./search-dialog"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, search_dialog_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getActions = exports.FindWidgetsModule = exports.FindWidgetsComponent = void 0;
    var FindWidgetsComponent = /** @class */ (function () {
        function FindWidgetsComponent(dialogService) {
            this.dialogService = dialogService;
            this.logPrefix = "[FindWidgetsComponent] ";
        }
        FindWidgetsComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.language = this.widgetContext.getLanguage();
            this.addSearchActionExecute();
            // Subscribe to the event that is triggered when settings are saved to be able to update the widget list
            this.widgetInstance.settingsSaved = function () {
                _this.updateContent();
            };
            // Initial update of the widget list
            this.updateContent();
        };
        FindWidgetsComponent.prototype.addSearchActionExecute = function () {
            var _this = this;
            // Add the 'execute' method to the Search action object
            var searchAction = this.widgetInstance.actions[0];
            var executableAction = {
                execute: function () {
                    _this.openSearchDialog();
                },
            };
            Object.assign(searchAction, executableAction);
        };
        FindWidgetsComponent.prototype.findWidgets = function (includeSelf) {
            lime_1.Log.debug(this.logPrefix + " Finding widgets with the following options: includeSelf=" + includeSelf);
            // Find the widgets that are part of the same page as this widget
            this.widgets = this.widgetContext.findWidgetsOnPage({ includeSelf: includeSelf });
        };
        FindWidgetsComponent.prototype.openSearchDialog = function () {
            var _this = this;
            lime_1.Log.debug(this.logPrefix + " Opening search dialog");
            var dialog = this.dialogService.modal(search_dialog_1.SearchDialogComponent, this.placeholder);
            // Set a localized title
            dialog.title(this.language.get("searchWidgetTitle"));
            // Handle the results when the dialog is closed with OK/Cancel
            dialog.afterClose(function (result) {
                if (result) {
                    lime_1.Log.debug(_this.logPrefix + " SearchDialog closed with result: " + result);
                    _this.showWidgetMessageWithResult(result);
                }
                else {
                    lime_1.Log.debug(_this.logPrefix + " SearchDialog was canceled,");
                }
            });
            // Add the OK and cancel buttons, and define click handlers
            dialog.buttons([
                {
                    click: function () { return dialog.close(); },
                    text: this.language.cancel,
                },
                {
                    click: function () { return dialog.close(dialog.componentDialog.query); },
                    isDefault: true,
                    text: this.language.ok,
                },
            ]);
            // Set the inputs to the SearchDialogComponent
            dialog.apply(function (component) {
                component.searchLabel = _this.language.get("searchWidgetText");
            });
            dialog.open();
        };
        FindWidgetsComponent.prototype.showWidgetMessageWithResult = function (query) {
            // Check if there is one or more widgets with an ID that matches the query entered in dialog.
            // With the options below we will search using all the three IDs for a widget so there can be
            // multiple matches. Note that for a standard widget the id and standardWidgetId will have
            // the same value (compared to a published widget where the id is a GUID).
            var options = {
                id: query,
                includeSelf: this.isIncludeSelf(),
                instanceId: query,
                standardWidgetId: query,
            };
            // Show a dismissable result message inside the widget container
            var foundWidget = this.widgetContext.isWidgetOnPage(options);
            var foundWidgetMessage = "Widget found! (" + query + ")";
            var widgetNotFoundMessage = "Widget not found! (" + query + ")";
            this.widgetContext.showWidgetMessage({
                message: foundWidget ? foundWidgetMessage : widgetNotFoundMessage,
                type: foundWidget ? lime_1.WidgetMessageType.Info : lime_1.WidgetMessageType.Alert,
            });
        };
        FindWidgetsComponent.prototype.isIncludeSelf = function () {
            return this.widgetContext.getSettings().get("IncludeSelf");
        };
        FindWidgetsComponent.prototype.updateContent = function () {
            this.findWidgets(this.isIncludeSelf());
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], FindWidgetsComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], FindWidgetsComponent.prototype, "widgetInstance", void 0);
        __decorate([
            core_1.ViewChild("findWidgetsContainer", { read: core_1.ViewContainerRef, static: true }),
            __metadata("design:type", core_1.ViewContainerRef)
        ], FindWidgetsComponent.prototype, "placeholder", void 0);
        FindWidgetsComponent = __decorate([
            core_1.Component({
                template: "\n\t<div #findWidgetsContainer>\n\t\t<soho-listview>\n\t\t\t<li soho-listview-item *ngFor=\"let widget of widgets\">\n\t\t\t\t<p soho-listview-header>{{widget.title}}</p>\n\t\t\t\t<p soho-listview-subheader>Instance ID: {{widget.instanceId}}</p>\n\t\t\t\t<p soho-listview-subheader>ID: {{widget.id}}</p>\n\t\t\t\t<p soho-listview-subheader>Standard ID: {{widget.standardWidgetId}}</p>\n\t\t\t</li>\n\t\t</soho-listview>\n\t</div>\n\t"
            }),
            __metadata("design:paramtypes", [sohoxi_angular_1.SohoModalDialogService])
        ], FindWidgetsComponent);
        return FindWidgetsComponent;
    }());
    exports.FindWidgetsComponent = FindWidgetsComponent;
    var FindWidgetsModule = /** @class */ (function () {
        function FindWidgetsModule() {
        }
        FindWidgetsModule = __decorate([
            core_1.NgModule({
                declarations: [FindWidgetsComponent, search_dialog_1.SearchDialogComponent],
                entryComponents: [FindWidgetsComponent, search_dialog_1.SearchDialogComponent],
                imports: [common_1.CommonModule, forms_1.FormsModule, sohoxi_angular_1.SohoListViewModule, sohoxi_angular_1.SohoInputValidateModule]
            })
        ], FindWidgetsModule);
        return FindWidgetsModule;
    }());
    exports.FindWidgetsModule = FindWidgetsModule;
    exports.getActions = function (context) {
        var language = context.getLanguage();
        return [{
                isPrimary: true,
                standardIconName: "#icon-search",
                text: language.get("searchWidgetTitle"),
            }];
    };
});
//# sourceMappingURL=main.js.map