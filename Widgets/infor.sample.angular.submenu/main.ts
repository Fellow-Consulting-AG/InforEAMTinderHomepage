import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { DialogService, ILanguage, IWidgetAction, IWidgetComponent, IWidgetContext, IWidgetInstance, Log } from "lime";

interface IMyLanguage extends ILanguage {
	widgetText?: string;
}

@Component({
	template: `
	<div class="container">
		<div class="twelve columns lm-margin-md-t">
			<div class="row">
				<p>{{language.widgetText}}</p>
			</div>
		</div>
	</div>`
})
export class SubmenuComponent implements OnInit, IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;
	language: IMyLanguage;

	constructor(private dialogService: DialogService) { }

	ngOnInit() {
		this.language = this.widgetContext.getLanguage();

		// Hook up execute handlers for the toast and log actions
		this.widgetInstance.actions[0].submenuItems[0].execute = () => {
			this.showToastMessage();
		};
		this.widgetInstance.actions[0].submenuItems[2].execute = () => {
			this.logMessage();
		};
	}

	showToastMessage() {
		this.dialogService.showToast({
			title: "A sample title",
			message: "A dismissable sample toast message"
		});
	}

	logMessage() {
		Log.debug("[SubmenuComponent] Log sample message.");
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [SubmenuComponent],
	entryComponents: [SubmenuComponent]
})
export class SubmenuModule { }

export const getActions = (context: IWidgetContext): IWidgetAction[] => {
	const language = context.getLanguage();
	return [{
		isSubmenu: true,
		text: language.get("submenu"),
		submenuItems: [
			{ text: language.get("toastMessage") },
			{ isSeparator: true },
			{ text: language.get("logMessage") },
			{ text: language.get("disabledAction"), isEnabled: false }
		]
	}];
};
