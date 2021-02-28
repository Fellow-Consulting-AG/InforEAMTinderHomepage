import { Component, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { IUser, UserService } from "../services/user.service";

@Component({
	selector: "sample-user-list",
	template: `
		<soho-listview [selectable]="false">
			<li soho-listview-item *ngFor="let user of users$ | async">
				<p soho-listview-header>
					<span>{{user.firstName}} {{user.lastName}}</span>
				</p>
				<p soho-listview-subheader>
					<span>
						{{user.email}}
						<button soho-button="icon" icon="edit" (click)="userEditClick.emit(user)"></button>
						<button soho-button="icon" icon="user" (click)="userViewClick.emit(user)"></button>
					</span>
				</p>
			</li>
		</soho-listview>
	`,
	styles: [`
		button {
			float: right;
			bottom: 25px;
		}
	`]
})
export class UserListComponent {
	@Output() userEditClick = new EventEmitter<IUser>();
	@Output() userViewClick = new EventEmitter<IUser>();

	users$: Observable<IUser[]> = this.userService.users$;

	constructor(private userService: UserService) { }
}
