import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import { IWidgetComponent, IWidgetContext, IWidgetInstance } from "lime";

@Component({
	template: `
	<div>
		<h1>
			{{message}}
		</h1>
	</div>`,
	styles: [`
		h1 {
			padding: 40px 40px;
			text-align: center;
		}
	`]
})

/**
 * Empty State configuration (icon, titleId, descriptionId, buttonId) is set in the widget manifest.
 * Possible icon choices: "generic", "error-loading", "new-project", "no-alerts", "no-analytics", "no-budget",
 * "no-data", "no-events", "no-notes", "no-orders", "no-tasks"
 */

export class EmptyStateComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;
	message: string;

	ngOnInit() {
		// Subscribe to the event that is triggered when settings are saved to be able to update the message text
		this.widgetInstance.settingsSaved = () => {
			this.updateContent();
		};

		// Initial update of the message text
		this.updateContent();

		/*
			The optional function
			emptyConfigClicked? () => void;
			can be used to override the default behaviour of the empty state button, which is to open the Settings Dialog.
			Code example:
			----------------------------------------------------
			this.widgetInstance.emptyConfigClicked = () => {
				// custom behaviour
			}
			----------------------------------------------------
		*/
	}

	private updateContent() {
		this.message = this.widgetContext.getSettings().get<string>("Message");
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [EmptyStateComponent],
	entryComponents: [EmptyStateComponent]
})
export class EmptyStateModule { }
