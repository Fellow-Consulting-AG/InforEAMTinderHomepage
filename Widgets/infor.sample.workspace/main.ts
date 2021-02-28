import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoButtonModule, SohoIconModule, SohoListViewModule } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, Mode } from "lime";
import { UserListComponent } from "./components/user-list.component";
import { UserWorkspaceComponent } from "./components/user-workspace.component";
import { IManifestLanguage } from "./manifest-types";
import { IUser } from "./services/user.service";
import { WorkspaceService } from "./services/workspace.service";

@Component({
	template: `
		<sample-user-list (userEditClick)="openWorkspace($event)"
								(userViewClick)="openWorkspace($event, true)">
		</sample-user-list>
	`,
})
export class WorkspaceWidgetComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	constructor(private workspaceService: WorkspaceService, private viewRef: ViewContainerRef) { }

	openWorkspace(user: IUser, readOnly?: boolean) {
		this.workspaceService.open({
			component: UserWorkspaceComponent,
			title: this.workspaceTitle(readOnly),
			viewRef: this.viewRef,
			props: {
				user: user,
				readOnly,
				widgetContext: this.widgetContext,
			},
		});
	}

	private workspaceTitle(readOnly: boolean) {
		if (this.widgetContext.getMode() !== Mode.Mobile) {
			const language = this.widgetContext.getLanguage<IManifestLanguage>();
			return readOnly ? language.userDetails : language.editUser;
		}
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SohoButtonModule,
		SohoListViewModule,
		SohoIconModule,
	],
	declarations: [
		WorkspaceWidgetComponent,
		UserWorkspaceComponent,
		UserListComponent,
	],
	entryComponents: [
		WorkspaceWidgetComponent,
		UserWorkspaceComponent,
	],
})
export class WorkspaceWidgetModule { }
