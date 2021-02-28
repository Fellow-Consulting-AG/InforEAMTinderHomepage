import { Injectable, ViewContainerRef } from "@angular/core";
import { PanelComponentType, SohoContextualActionPanelService, SohoMessageService } from "@infor/sohoxi-angular";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class WorkspaceService {
	constructor(private capService: SohoContextualActionPanelService, private messageService: SohoMessageService) { }

	open<T extends IWorkspaceComponent>(options: IWorkspaceOptions<T>) {
		const cap = this.capService.contextualactionpanel(options.component, options.viewRef);
		cap.options({
			centerTitle: true,
		});
		const buttons: SohoContextualActionPanelButton[] = [
			{
				click: () => cap.close(),
				text: "Cancel",
				align: "left",
			} as SohoContextualActionPanelButton,
			{
				align: "center",
				cssClass: "btn-icon",
				icon: "#icon-launch",
				click: () => {
					cap.componentPanel.launchClicked();
					cap.close();
				},
			} as SohoContextualActionPanelButton,
		];
		if (!options.props.readOnly) {
			buttons.push({
				text: "Submit",
				align: "right",
				click: () => {
					cap.componentPanel.submitClicked().subscribe(
						() => cap.close(),
						(error: Error) => this.showError(error),
					);
				},
			} as SohoContextualActionPanelButton);
		}
		cap.buttons(buttons);
		cap.apply(component => {
			if (options.props) {
				for (const propertyKey in options.props) {
					if (options.props.hasOwnProperty(propertyKey)) {
						component[propertyKey] = options.props[propertyKey];
					}
				}
			}
		});
		cap.title(options.title || " ");
		cap.trigger("immediate");
		cap.open();
	}

	private showError(error: Error) {
		const messageRef = this.messageService.error({
			title: "Error when submitting changes",
			message: error.message,
			buttons: [
				{ text: "Close", click: () => messageRef.close() }
			],
		});
		messageRef.open();
	}
}

export interface IWorkspaceComponent {
	submitClicked: () => Observable<unknown>;
	launchClicked: () => void;
	readOnly: boolean;
}

export interface IWorkspaceOptions<T> {
	component: PanelComponentType<T>;
	viewRef: ViewContainerRef;
	title?: string;
	props?: Partial<T>;
}
