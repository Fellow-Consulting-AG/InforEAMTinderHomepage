import { Component, OnInit } from "@angular/core";
import { SohoToastService } from "@infor/sohoxi-angular";
import { IWidgetContext } from "lime";
import { tap } from "rxjs/operators";
import { IManifestLanguage } from "../manifest-types";
import { IUser, UserService } from "../services/user.service";
import { IWorkspaceComponent } from "../services/workspace.service";

@Component({
	template: `
		<div class="header-section">
			<div class="row top-padding bottom-padding">
				<div class="twelve columns">
					<h1>{{user.firstName}} {{user.lastName}}</h1>
				</div>
			</div>

			<div class="row">
				<div class="two columns">
					<img style="border-radius:50%; width: 80px;" [src]="user.photoUrl">
				</div>
				<div class="five columns">
					<div class="field label-left">
						<span class="label">{{lang.title}}</span>
						<span class="data">{{user.title}}</span>
					</div>
					<div class="field label-left">
						<span class="label">{{lang.email}}</span>
						<span class="data">{{user.email}}</span>
					</div>
				</div>
			</div>
		</div>

		<div class="detail-section">
			<div class="row top-padding">
				<div class="six columns">
					<div class="field">
						<label class="required">{{lang.firstName}}</label>
						<input type="text" data-validate="required" [(ngModel)]="editableUser.firstName" [disabled]="readOnly">
					</div>
					<div class="field">
						<label class="required">{{lang.lastName}}</label>
						<input type="text" data-validate="required" [(ngModel)]="editableUser.lastName" [disabled]="readOnly">
					</div>
				</div>

				<div class="six columns">
					<div class="field">
						<label>{{lang.title}}</label>
						<input type="text" [(ngModel)]="editableUser.title" [disabled]="readOnly">
					</div>
					<div class="field">
						<label>{{lang.email}}</label>
						<input type="text" [(ngModel)]="editableUser.email" [disabled]="readOnly">
					</div>
				</div>
			</div>
		</div>
	`,
})
export class UserWorkspaceComponent implements IWorkspaceComponent, OnInit {
	widgetContext: IWidgetContext;
	lang?: IManifestLanguage;
	user?: IUser;
	editableUser?: IUser;
	readOnly: boolean;

	constructor(private userService: UserService, private toastService: SohoToastService) { }

	ngOnInit() {
		this.editableUser = { ...this.user };
		this.lang = this.widgetContext.getLanguage<IManifestLanguage>();
	}

	submitClicked() {
		return this.userService.update(this.editableUser).pipe(
			tap(() => {
				this.toastService.show({
					title: this.lang.submitToastTitle,
					message: this.lang.submitToastMessage,
					timeout: 2000,
					position: SohoToastService.BOTTOM_RIGHT,
				});
			}),
		);
	}

	launchClicked() {
		// this.widgetContext.launch({ ... })
		this.toastService.show({
			title: this.lang.launchToastTitle,
			message: this.lang.launchToastMessage,
			timeout: 2000,
			position: SohoToastService.BOTTOM_RIGHT,
		});
	}
}
