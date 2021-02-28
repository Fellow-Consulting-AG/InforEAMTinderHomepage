var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "./components/autocomplete.component", "./components/checkbox.component", "./components/colorpicker.component", "./components/datepicker.component", "./components/dropdown.component", "./components/input.component", "./components/lookup.dataset.component", "./components/lookup.source.component", "./components/multiselect.component", "./components/radiobutton.component", "./components/textarea.component", "./components/timepicker.component", "./modal"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, autocomplete_component_1, checkbox_component_1, colorpicker_component_1, datepicker_component_1, dropdown_component_1, input_component_1, lookup_dataset_component_1, lookup_source_component_1, multiselect_component_1, radiobutton_component_1, textarea_component_1, timepicker_component_1, modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IDSTestModule = exports.IDSTestComponent = void 0;
    var IDSTestComponent = /** @class */ (function () {
        function IDSTestComponent(dialogService, viewRef) {
            this.dialogService = dialogService;
            this.viewRef = viewRef;
            this.openedAsModal = false;
            this.setDefaultValues = false;
            this.modeInfo = "";
            this.subModeInfo = "";
            this.disableAll = false;
        }
        IDSTestComponent.prototype.ngOnInit = function () {
            var _this = this;
            if (!this.openedAsModal) {
                this.widgetInstance.actions[0].execute = function () { return _this.openModal(); };
                this.widgetInstance.actions[1].execute = function () { return _this.openModal(true); };
            }
            this.initializeSubModeInfo();
        };
        IDSTestComponent.prototype.openModal = function (setDefaultValues) {
            var _this = this;
            if (setDefaultValues === void 0) { setDefaultValues = false; }
            var dialog = this.dialogService
                .modal(modal_1.IDSModalComponent, this.viewRef)
                .title("Modal");
            dialog.apply(function (component) {
                component.modalRef = dialog;
                component.setDefaultValues = setDefaultValues;
                component.widgetContext = _this.widgetContext;
                component.widgetInstance = _this.widgetInstance;
            }).open();
        };
        IDSTestComponent.prototype.initializeSubModeInfo = function () {
            var mode = this.widgetContext.getMode();
            this.modeInfo = this.getDisplayTextMode(mode) + " (" + mode + ")";
            var subMode = this.widgetContext.getSubMode();
            this.subModeInfo = this.getDisplayTextSubMode(subMode) + " (" + subMode + ")";
        };
        IDSTestComponent.prototype.getDisplayTextMode = function (mode) {
            if (mode === lime_1.Mode.Default) {
                return "Default";
            }
            if (mode === lime_1.Mode.ContextApp) {
                return "ContextApp";
            }
            if (mode === lime_1.Mode.Mobile) {
                return "Mobile";
            }
            return "";
        };
        IDSTestComponent.prototype.getDisplayTextSubMode = function (subMode) {
            if (subMode === lime_1.SubMode.Default) {
                return "Default";
            }
            if (subMode === lime_1.SubMode.MobilePage) {
                return "MobilePage";
            }
            if (subMode === lime_1.SubMode.MobileSingle) {
                return "MobileSingle";
            }
            return "";
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], IDSTestComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], IDSTestComponent.prototype, "widgetInstance", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], IDSTestComponent.prototype, "openedAsModal", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", Object)
        ], IDSTestComponent.prototype, "setDefaultValues", void 0);
        IDSTestComponent = __decorate([
            core_1.Component({
                selector: "ids-components",
                template: "\n\t\t<div class=\"row lm-padding-lg-t\">\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-input [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-input>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-dropdown [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-dropdown>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-multiselect [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-multiselect>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-autocomplete [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-autocomplete>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-dataset-lookup [isMulti]=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'dss'\"></ids-dataset-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-dataset-lookup [isMulti]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'dms'\"></ids-dataset-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-dataset-lookup [isMulti]=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t[isAsync]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'ads'\"></ids-dataset-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-dataset-lookup [isMulti]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[isAsync]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'adm'\"></ids-dataset-lookup>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-source-lookup [isMulti]=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'sss'\"></ids-source-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-source-lookup [isMulti]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'sms'\"></ids-source-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-source-lookup [isMulti]=\"false\"\n\t\t\t\t\t\t\t\t\t\t\t[isAsync]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'ass'\"></ids-source-lookup>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-source-lookup [isMulti]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[isAsync]=\"true\"\n\t\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t\t[testId]=\"'asm'\"></ids-source-lookup>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-colorpicker [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-colorpicker>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-datepicker [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\" [testId]=\"'dp'\"></ids-datepicker>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-datepicker [withTime]=\"true\"\n\t\t\t\t\t\t\t\t\t\t[setDefaultValue]=\"setDefaultValues\"\n\t\t\t\t\t\t\t\t\t\t[disabled]=\"disableAll\"\n\t\t\t\t\t\t\t\t\t\t[testId]=\"'dpt'\"></ids-datepicker>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-timepicker [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-timepicker>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-radiobutton [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-radiobutton>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-checkbox [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-checkbox>\n\t\t\t</div>\n\t\t\t<div class=\"three columns\">\n\t\t\t\t<ids-textarea [setDefaultValue]=\"setDefaultValues\" [disabled]=\"disableAll\"></ids-textarea>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"field lm-margin-lg-l\">\n\t\t\t\t<button soho-button=\"secondary\"\n\t\t\t\t\t\t\t(click)=\"disableAll = !disableAll\">\n\t\t\t\t\t{{(disableAll ? \"Enable\" : \"Disable\") + \" all components\"}}\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"row\">\n\t\t\t<div class=\"field\">\n\t\t\t\t<div class=\"lm-margin-lg-l\">Mode : {{modeInfo}}, SubMode: {{subModeInfo}}</div>\n\t\t\t</div>\n\t\t</div>\n\t\t"
            }),
            __metadata("design:paramtypes", [sohoxi_angular_1.SohoModalDialogService,
                core_1.ViewContainerRef])
        ], IDSTestComponent);
        return IDSTestComponent;
    }());
    exports.IDSTestComponent = IDSTestComponent;
    var IDSTestModule = /** @class */ (function () {
        function IDSTestModule() {
        }
        IDSTestModule = __decorate([
            core_1.NgModule({
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    sohoxi_angular_1.SohoComponentsModule
                ],
                declarations: [
                    IDSTestComponent,
                    modal_1.IDSModalComponent,
                    dropdown_component_1.DropdownComponent,
                    input_component_1.InputComponent,
                    multiselect_component_1.MultiselectComponent,
                    checkbox_component_1.CheckboxComponent,
                    lookup_dataset_component_1.LookupDatasetComponent,
                    radiobutton_component_1.RadiobuttonComponent,
                    textarea_component_1.TextareaComponent,
                    lookup_source_component_1.LookupSourceComponent,
                    timepicker_component_1.TimepickerComponent,
                    colorpicker_component_1.ColorpickerComponent,
                    datepicker_component_1.DatepickerComponent,
                    autocomplete_component_1.AutocompleteComponent
                ],
                entryComponents: [IDSTestComponent, modal_1.IDSModalComponent]
            })
        ], IDSTestModule);
        return IDSTestModule;
    }());
    exports.IDSTestModule = IDSTestModule;
});
//# sourceMappingURL=main.js.map