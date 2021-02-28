import { CommonModule } from "@angular/common";
import { Component, Inject, NgModule, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoButtonModule, SohoModalDialogService } from "@infor/sohoxi-angular";
import { DialogButtonType, DialogService, IDialogResult, IWidgetContext, IWidgetInstance, StandardDialogButtons, widgetContextInjectionToken, widgetInstanceInjectionToken } from "lime";
import { CustomDialogComponent } from "./dialog";

@Component({
	template: `
	<div #dialogWidgetView class="container">
		<div class="twelve columns lm-margin-md-t">
			<div class="row">
				<div class="field lm-margin-md-b">
					<label for="{{instanceId}}-message-btn">Open message dialog</label>
					<button soho-button="primary" id="{{instanceId}}-message-btn" (click)="showMessage()">Message</button>
				</div>
				<div class="field lm-margin-md-b">
					<label for="{{instanceId}}-confirm-btn">Open confirm dialog</label>
					<button soho-button="primary" id="{{instanceId}}-confirm-btn" (click)="showConfirm()">Confirm</button>
				</div>
				<div class="field lm-margin-md-b">
					<label for="{{instanceId}}-custom-btn">Open custom dialog</label>
					<button soho-button="primary" id="{{instanceId}}-custom-btn" (click)="showCustom()">Custom</button>
				</div>
				<div class="field lm-margin-md-b">
					<label for="{{instanceId}}-toast-btn">Show toast message</label>
					<button soho-button="primary" id="{{instanceId}}-toast-btn" (click)="showToast()">Toast</button>
				</div>
			</div>
		</div>
	</div>`
})
export class DialogsComponent {
	@ViewChild("dialogWidgetView", { read: ViewContainerRef, static: true }) dialogWidgetView: ViewContainerRef;

	instanceId: string;

	constructor(
		@Inject(widgetContextInjectionToken) private readonly widgetContext: IWidgetContext,
		@Inject(widgetInstanceInjectionToken) private readonly widgetInstance: IWidgetInstance,
		private readonly dialogService: DialogService,
		private readonly sohoModalDialogService: SohoModalDialogService) {
		this.instanceId = widgetContext.getWidgetInstanceId();
	}

	showMessage(): void {
		this.dialogService.showMessage({
			title: "A sample title",
			message: "A sample message"
		});
	}

	showConfirm(): void {
		this.dialogService.showMessage({
			title: "Confirm",
			message: "Are you sure?",
			standardButtons: StandardDialogButtons.YesNo
		}).subscribe((result: IDialogResult) => {
			let message: string;
			let title: string;

			if (result.button === DialogButtonType.Yes) {
				title = "Confirmed";
				message = "You are sure.";
			} else {
				title = "Not confirmed";
				message = "You are not sure.";
			}
			this.dialogService.showMessage({
				title: title,
				message: message
			});
		});
	}

	showToast(): void {
		this.dialogService.showToast({
			title: "A sample toast title",
			message: "A sample toast message"
		});
	}

	showCustom() {
		// To show a custom dialog we now use the SohoModalDialogService instead of DialogService
		const dialog = this.sohoModalDialogService
			.modal(CustomDialogComponent, this.dialogWidgetView)
			.title("A custom dialog title")
			.afterClose((result: IDialogResult) => {
				const message: string = result ? result.value as string : "Dialog cancelled";
				this.dialogService.showMessage({
					title: "Result",
					message: message
				});
			});

		dialog.apply((component: CustomDialogComponent) => {
			component.dialog = dialog;
			component.dialogParameter = "A sample custom dialog parameter";
		}).open();
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, SohoButtonModule],
	declarations: [DialogsComponent, CustomDialogComponent],
	entryComponents: [DialogsComponent, CustomDialogComponent]
})
export class DialogsModule { }
