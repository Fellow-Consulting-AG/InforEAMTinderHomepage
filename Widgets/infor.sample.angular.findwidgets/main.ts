import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoInputValidateModule, SohoListViewModule, SohoModalDialogService } from "@infor/sohoxi-angular";
import { IFindWidgetOptions, ILanguage, IWidgetAction, IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetInstanceInfo, Log, WidgetMessageType } from "lime";
import { SearchDialogComponent } from "./search-dialog";

@Component({
	template: `
	<div #findWidgetsContainer>
		<soho-listview>
			<li soho-listview-item *ngFor="let widget of widgets">
				<p soho-listview-header>{{widget.title}}</p>
				<p soho-listview-subheader>Instance ID: {{widget.instanceId}}</p>
				<p soho-listview-subheader>ID: {{widget.id}}</p>
				<p soho-listview-subheader>Standard ID: {{widget.standardWidgetId}}</p>
			</li>
		</soho-listview>
	</div>
	`
})
export class FindWidgetsComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	@ViewChild("findWidgetsContainer", { read: ViewContainerRef, static: true }) placeholder: ViewContainerRef;

	widgets: IWidgetInstanceInfo[];

	private language: ILanguage;
	private logPrefix = "[FindWidgetsComponent] ";

	constructor(private dialogService: SohoModalDialogService) { }

	ngOnInit(): void {
		this.language = this.widgetContext.getLanguage();
		this.addSearchActionExecute();
		// Subscribe to the event that is triggered when settings are saved to be able to update the widget list
		this.widgetInstance.settingsSaved = () => {
			this.updateContent();
		};

		// Initial update of the widget list
		this.updateContent();
	}

	private addSearchActionExecute(): void {
		// Add the 'execute' method to the Search action object
		const searchAction = this.widgetInstance.actions[0];
		const executableAction: IWidgetAction = {
			execute: () => {
				this.openSearchDialog();
			},
		};
		Object.assign(searchAction, executableAction);
	}

	private findWidgets(includeSelf: boolean): void {
		Log.debug(`${this.logPrefix} Finding widgets with the following options: includeSelf=${includeSelf}`);

		// Find the widgets that are part of the same page as this widget
		this.widgets = this.widgetContext.findWidgetsOnPage({ includeSelf: includeSelf });
	}

	private openSearchDialog(): void {
		Log.debug(`${this.logPrefix} Opening search dialog`);
		const dialog = this.dialogService.modal(SearchDialogComponent, this.placeholder);
		// Set a localized title
		dialog.title(this.language.get("searchWidgetTitle"));
		// Handle the results when the dialog is closed with OK/Cancel
		dialog.afterClose((result?: string) => {
			if (result) {
				Log.debug(`${this.logPrefix} SearchDialog closed with result: ${result}`);
				this.showWidgetMessageWithResult(result);
			} else {
				Log.debug(`${this.logPrefix} SearchDialog was canceled,`);
			}
		});
		// Add the OK and cancel buttons, and define click handlers
		dialog.buttons([
			{
				click: () => dialog.close(),
				text: this.language.cancel,
			},
			{
				click: () => dialog.close(dialog.componentDialog.query),
				isDefault: true,
				text: this.language.ok,
			},
		]);
		// Set the inputs to the SearchDialogComponent
		dialog.apply((component) => {
			component.searchLabel = this.language.get("searchWidgetText");
		});
		dialog.open();
	}

	private showWidgetMessageWithResult(query: string): void {
		// Check if there is one or more widgets with an ID that matches the query entered in dialog.
		// With the options below we will search using all the three IDs for a widget so there can be
		// multiple matches. Note that for a standard widget the id and standardWidgetId will have
		// the same value (compared to a published widget where the id is a GUID).
		const options: IFindWidgetOptions = {
			id: query,
			includeSelf: this.isIncludeSelf(),
			instanceId: query,
			standardWidgetId: query,
		};
		// Show a dismissable result message inside the widget container
		const foundWidget = this.widgetContext.isWidgetOnPage(options);
		const foundWidgetMessage = `Widget found! (${query})`;
		const widgetNotFoundMessage = `Widget not found! (${query})`;
		this.widgetContext.showWidgetMessage({
			message: foundWidget ? foundWidgetMessage : widgetNotFoundMessage,
			type: foundWidget ? WidgetMessageType.Info : WidgetMessageType.Alert,
		});
	}

	private isIncludeSelf(): boolean {
		return this.widgetContext.getSettings().get<boolean>("IncludeSelf");
	}

	private updateContent() {
		this.findWidgets(this.isIncludeSelf());
	}
}

@NgModule({
	declarations: [FindWidgetsComponent, SearchDialogComponent],
	entryComponents: [FindWidgetsComponent, SearchDialogComponent],
	imports: [CommonModule, FormsModule, SohoListViewModule, SohoInputValidateModule]
})
export class FindWidgetsModule { }

export const getActions = (context: IWidgetContext): IWidgetAction[] => {
	const language = context.getLanguage();
	return [{
		isPrimary: true,
		standardIconName: "#icon-search",
		text: language.get("searchWidgetTitle"),
	}];
};
