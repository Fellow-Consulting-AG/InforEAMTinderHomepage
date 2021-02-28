import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoComponentsModule, SohoModalDialogService } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, Mode, SubMode } from "lime";
import { AutocompleteComponent } from "./components/autocomplete.component";
import { CheckboxComponent } from "./components/checkbox.component";
import { ColorpickerComponent } from "./components/colorpicker.component";
import { DatepickerComponent } from "./components/datepicker.component";
import { DropdownComponent } from "./components/dropdown.component";
import { InputComponent } from "./components/input.component";
import { LookupDatasetComponent } from "./components/lookup.dataset.component";
import { LookupSourceComponent } from "./components/lookup.source.component";
import { MultiselectComponent } from "./components/multiselect.component";
import { RadiobuttonComponent } from "./components/radiobutton.component";
import { TextareaComponent } from "./components/textarea.component";
import { TimepickerComponent } from "./components/timepicker.component";
import { IDSModalComponent } from "./modal";

@Component({
	selector: "ids-components",
	template: `
		<div class="row lm-padding-lg-t">
			<div class="three columns">
				<ids-input [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-input>
			</div>
			<div class="three columns">
				<ids-dropdown [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-dropdown>
			</div>
			<div class="three columns">
				<ids-multiselect [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-multiselect>
			</div>
			<div class="three columns">
				<ids-autocomplete [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-autocomplete>
			</div>
		</div>
		<div class="row">
			<div class="three columns">
				<ids-dataset-lookup [isMulti]="false"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'dss'"></ids-dataset-lookup>
			</div>
			<div class="three columns">
				<ids-dataset-lookup [isMulti]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'dms'"></ids-dataset-lookup>
			</div>
			<div class="three columns">
				<ids-dataset-lookup [isMulti]="false"
											[isAsync]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'ads'"></ids-dataset-lookup>
			</div>
			<div class="three columns">
				<ids-dataset-lookup [isMulti]="true"
											[isAsync]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'adm'"></ids-dataset-lookup>
			</div>
		</div>
		<div class="row">
			<div class="three columns">
				<ids-source-lookup [isMulti]="false"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'sss'"></ids-source-lookup>
			</div>
			<div class="three columns">
				<ids-source-lookup [isMulti]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'sms'"></ids-source-lookup>
			</div>
			<div class="three columns">
				<ids-source-lookup [isMulti]="false"
											[isAsync]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'ass'"></ids-source-lookup>
			</div>
			<div class="three columns">
				<ids-source-lookup [isMulti]="true"
											[isAsync]="true"
											[setDefaultValue]="setDefaultValues"
											[disabled]="disableAll"
											[testId]="'asm'"></ids-source-lookup>
			</div>
		</div>
		<div class="row">
			<div class="three columns">
				<ids-colorpicker [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-colorpicker>
			</div>
			<div class="three columns">
				<ids-datepicker [setDefaultValue]="setDefaultValues" [disabled]="disableAll" [testId]="'dp'"></ids-datepicker>
			</div>
			<div class="three columns">
				<ids-datepicker [withTime]="true"
										[setDefaultValue]="setDefaultValues"
										[disabled]="disableAll"
										[testId]="'dpt'"></ids-datepicker>
			</div>
			<div class="three columns">
				<ids-timepicker [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-timepicker>
			</div>
		</div>
		<div class="row">
			<div class="three columns">
				<ids-radiobutton [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-radiobutton>
			</div>
			<div class="three columns">
				<ids-checkbox [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-checkbox>
			</div>
			<div class="three columns">
				<ids-textarea [setDefaultValue]="setDefaultValues" [disabled]="disableAll"></ids-textarea>
			</div>
		</div>
		<div class="row">
			<div class="field lm-margin-lg-l">
				<button soho-button="secondary"
							(click)="disableAll = !disableAll">
					{{(disableAll ? "Enable" : "Disable") + " all components"}}
				</button>
			</div>
		</div>
		<div class="row">
			<div class="field">
				<div class="lm-margin-lg-l">Mode : {{modeInfo}}, SubMode: {{subModeInfo}}</div>
			</div>
		</div>
		`
})
export class IDSTestComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;
	@Input() openedAsModal = false;
	@Input() setDefaultValues = false;
	modeInfo = "";
	subModeInfo = "";

	disableAll = false;

	constructor(
		private readonly dialogService: SohoModalDialogService,
		private readonly viewRef: ViewContainerRef) {
	}

	ngOnInit() {
		if (!this.openedAsModal) {
			this.widgetInstance.actions[0].execute = () => this.openModal();
			this.widgetInstance.actions[1].execute = () => this.openModal(true);
		}

		this.initializeSubModeInfo();
	}

	openModal(setDefaultValues = false) {
		const dialog = this.dialogService
			.modal(IDSModalComponent, this.viewRef)
			.title("Modal");

		dialog.apply((component: IDSModalComponent) => {
			component.modalRef = dialog;
			component.setDefaultValues = setDefaultValues;
			component.widgetContext = this.widgetContext;
			component.widgetInstance = this.widgetInstance;
		}).open();
	}

	private initializeSubModeInfo(): void {
		const mode = this.widgetContext.getMode();
		this.modeInfo = this.getDisplayTextMode(mode) + " (" + mode + ")";

		const subMode = this.widgetContext.getSubMode();
		this.subModeInfo = this.getDisplayTextSubMode(subMode) + " (" + subMode + ")";
	}

	private getDisplayTextMode(mode: Mode): string {
		if (mode === Mode.Default) {
			return "Default";
		}
		if (mode === Mode.ContextApp) {
			return "ContextApp";
		}
		if (mode === Mode.Mobile) {
			return "Mobile";
		}
		return "";
	}

	private getDisplayTextSubMode(subMode: SubMode): string {
		if (subMode === SubMode.Default) {
			return "Default";
		}
		if (subMode === SubMode.MobilePage) {
			return "MobilePage";
		}
		if (subMode === SubMode.MobileSingle) {
			return "MobileSingle";
		}
		return "";
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SohoComponentsModule],
	declarations: [
		IDSTestComponent,
		IDSModalComponent,
		DropdownComponent,
		InputComponent,
		MultiselectComponent,
		CheckboxComponent,
		LookupDatasetComponent,
		RadiobuttonComponent,
		TextareaComponent,
		LookupSourceComponent,
		TimepickerComponent,
		ColorpickerComponent,
		DatepickerComponent,
		AutocompleteComponent],
	entryComponents: [IDSTestComponent, IDSModalComponent]
})
export class IDSTestModule { }
