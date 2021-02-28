import { CommonModule } from "@angular/common";
import { Component, Inject, NgModule, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoModalDialogRef, SohoModalDialogService, SohoTextAreaModule } from "@infor/sohoxi-angular";
import { IWidgetContext, IWidgetInstance, widgetContextInjectionToken, widgetInstanceInjectionToken } from "lime";

@Component({
	template: `
	<span class="label">
		Copy and execute below code in the Browser developer tools console to mock a drillback to Homepages.
	</span>
	<span class="label">
		To open another page from the drillback, find the page id in My Pages by right-clicking the card header.
	</span>
	<span class="label">
		This widget resolves parameters "param1" and "param2" from the URL.
	</span>
	<div class="field">
		<textarea soho-textarea style="width: 100%; min-height: 110px;"
			[resizable]="true"
			name="test"
			[(ngModel)]="infoMessage">
		</textarea>
	</div>
	<div class="modal-buttonset">
		<button class="btn-modal-primary" (click)="close()">OK</button>
	</div>`
})
export class InformationDialogComponent implements OnInit {
	dialog: SohoModalDialogRef<InformationDialogComponent>;
	infoMessage: string;
	pageId: string;

	ngOnInit(): void {
		this.infoMessage =
			`infor.companyon.client.listeningMessageTypes.applicationDrillback[0].handler` +
			`({ "applicationDrillback": "?LogicalId=lid://infor.homepages.1&page=${this.pageId}&` +
			`param1=hellofromparamone&param2=contentfromparam2" })`;
	}

	close(): void {
		this.dialog.close();
	}
}

@Component({
	template: `
	<div #widgetView class="lm-text-align-c lm-padding-xl">
		<p>Parameter one:</p>
		<p class="param-value" [class.value-found]="paramValue1">
			{{ paramValue1 || "No value found for URL parameter 'param1'" }}
		</p>
		<p>Parameter two:</p>
		<p class="param-value" [class.value-found]="paramValue2">
			{{ paramValue2 || "No value found for URL parameter 'param2'" }}
		</p>
	</div>
	`,
	styles: [`
		.param-value {
			color: #E84F4F;
			margin-top: 0;
		}

		.param-value.value-found  {
			color: #80CE4D;
		}
	`]
})
export class ContextParametersComponent implements OnInit {
	@ViewChild("widgetView", { read: ViewContainerRef, static: true }) widgetView: ViewContainerRef;

	paramValue1: string;
	paramValue2: string;

	constructor(
		@Inject(widgetContextInjectionToken) private readonly widgetContext: IWidgetContext,
		@Inject(widgetInstanceInjectionToken) private readonly widgetInstance: IWidgetInstance,
		private readonly sohoModalDialogService: SohoModalDialogService) {

		widgetInstance.activated = () => {
			this.updateValues();
		};

		widgetInstance.actions = [{
			isPrimary: true,
			standardIconName: "#icon-info",
			text: "Information",
			execute: () => this.openInformationDialog()
		}];
	}

	ngOnInit() {
		this.updateValues();
	}

	private updateValues(): void {
		// Only update members if the parameter values have changed
		const param1 = this.getParameterValue("param1");
		if (param1 !== this.paramValue1) {
			this.paramValue1 = param1;
		}

		const param2 = this.getParameterValue("param2");
		if (param2 !== this.paramValue2) {
			this.paramValue2 = param2;
		}
	}

	private getParameterValue(name: string): string {
		return this.widgetContext.getContextParameter(name);
	}

	private openInformationDialog(): void {
		const dialog = this.sohoModalDialogService
			.modal(InformationDialogComponent, this.widgetView)
			.title("Information");

		dialog.apply((component) => {
			component.dialog = dialog;
			component.pageId = this.widgetContext.getPageId();
		}).open();
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, SohoTextAreaModule],
	declarations: [ContextParametersComponent, InformationDialogComponent],
	entryComponents: [ContextParametersComponent, InformationDialogComponent]
})
export class ContextParametersModule { }
