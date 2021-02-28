import { Component } from "@angular/core";
import { SohoModalDialogRef } from "@infor/sohoxi-angular";
import { IWidgetContext, IWidgetInstance } from "lime";

@Component({
	template: `
		<div id="lm-tst-mod">
			<ids-components
				[widgetContext]="widgetContext"
				[widgetInstance]="widgetInstance"
				[openedAsModal]="true"
				[setDefaultValues]="setDefaultValues">
			</ids-components>
			<div class="modal-buttonset">
				<button class="btn-modal" (click)="modalRef.close()">Cancel</button>
				<button class="btn-modal-primary" (click)="modalRef.close()">OK</button>
			</div>
		</div>
	`
})
export class IDSModalComponent {
	widgetContext: IWidgetContext;
	widgetInstance: IWidgetInstance;
	modalRef: SohoModalDialogRef<IDSModalComponent>;
	setDefaultValues = false;
}
