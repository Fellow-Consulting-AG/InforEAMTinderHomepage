import { Component, Input, ViewContainerRef } from "@angular/core";
import { SohoContextualActionPanelService } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext2, IWidgetInstance2 } from "lime";
import { SharedCounterService } from "../services/shared-counter.service";
import { DialogComponent } from "./dialog.component";

@Component({
	template: `
		<div class="row top-padding">
			<div class="twelve columns lm-padding-md">
				<global-counter></global-counter>
			</div>
		</div>
		<div class="row">
			<div class="six columns lm-padding-md">
				<shared-counter></shared-counter>
			</div>
			<div class="six columns lm-padding-md">
				<shared-counter></shared-counter>
			</div>
		</div>
		<div class="row">
			<div class="six columns lm-padding-md">
				<local-counter></local-counter>
			</div>
			<div class="six columns lm-padding-md">
				<local-counter></local-counter>
			</div>
		</div>
		<div class="row">
			<div class="twelve columns lm-center-text">
				<button soho-button="tertiary" (click)="openCAP()">Open Dialog</button>
			</div>
		</div>
	`,
	providers: [
		SohoContextualActionPanelService,
		SharedCounterService,
	]
})
export class WidgetComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext2;
	@Input() widgetInstance: IWidgetInstance2;

	constructor(private capService: SohoContextualActionPanelService, private viewRef: ViewContainerRef) { }

	openCAP() {
		const cap = this.capService.contextualactionpanel(DialogComponent, this.viewRef);
		cap.title(this.widgetContext.getTitle());
		cap.buttons([{
			icon: "#icon-close",
			cssClass: "btn",
			click: () => cap.close(),
		}]);
		cap.open();
	}
}
