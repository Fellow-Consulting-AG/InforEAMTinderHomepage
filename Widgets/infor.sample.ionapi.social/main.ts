import { CommonModule } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, Log, WidgetMessageType, WidgetState } from "lime";
import { AsyncSubject, Observable, of } from "rxjs";
import { catchError, filter, switchMap, tap } from "rxjs/operators";
import { ISocialUser } from "./interfaces";
import { DataService } from "./service";

// Prerequisites
// =============
// The following steps are required before testing this sample widget.
// - Aquire the server and port number for the ION API server to test with.
// - Configure and start a localhost proxy with the ION API server and port number.
// - Example: node proxy.js 8083 "yourservername" 443
// - Example: \Samples\StartIonApiProxy.cmd
//
// - Set the ionApiUrl property in the configuration.json file to the URL of the localhost proxy.
// - The configuration.json file is located in the root of the Widgets sample project by default.
// - The URL should include the tenant to test with.
// - Example: "ionApiUrl": "http://localhost:8083/tenantid"
//
// - Acquire an OAuth token string.
// - Log on to Ming.le.
// - Example: https://yourservername/tenantid/
// - Open a new tab in the same browser and navigate to the Grid SAML Session Provider OAuth resource
// - The Grid must be version 2.0 or later with a SAML Session Provider configured for the same IFS as Ming.le.
// - Example: https://yourservernameandport/grid/rest/security/sessions/oauth
// - Copy the the OAuth token string from the browser window.
//
// - If there are issues you can verify if your user has access to the grid by navigating to the Grid user page.
// - Note that you must be logged on to Ming.le before doing this.
// - Example: https://yourservernameandport/grid/user
//
// - Set the ionApiToken property in the configuration.json file to the OAuth token string.
// - Example: "ionApiToken": "V9k5niTDR1kq6RuYlEq3N3HxGq8u"
//
// - Set the devConfiguration attribute on the lm-page-container to the name of the configuration.json file
// - Example:
//   <lm-page-container devWidget="infor.sample.ionapi.m3" devConfiguration="configuration.json"></lm-page-container>
//
//
// Developing and debugging
// ========================
// A widget using the ION API can be developed and debugged like any other widget.
// Just remember to start the proxy and configure the configuration.json file.
// The OAuth token will time out and when that happens you must acquire a new token and update
// the configuration.json file.

@Component({
	template: `
	<div class="lm-padding-md" *ngIf="user$ | async as user">
		<h3>Name</h3>
		<p>{{user.FirstName + " " + user.LastName}}</p>

		<h3>Email</h3>
		<p>{{user.Email}}</p>

		<p *ngIf="photoUrl$ | async as photoUrl">
			<img [src]="photoUrl" />
		</p>
	</div>
	`
})
export class IonApiSocialComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	user$: Observable<ISocialUser>;
	photoUrl$: Observable<string>;
	private logPrefix = "[IonApiSocialSample] ";

	constructor(private readonly dataService: DataService) { }

	ngOnInit(): void {
		this.setBusy(true);

		this.user$ = this.dataService.loadUser(this.widgetContext).pipe(
			catchError((error: HttpErrorResponse) => {
				this.onRequestError(error, "Unable to load user info");
				return of();
			})
		);

		this.photoUrl$ = this.user$.pipe(
			filter(user => !!user.UserGUID),
			switchMap(user => this.dataService.loadPhoto(user.UserGUID, this.widgetContext)),
			switchMap((blob) => this.getPhoto(blob)),
			tap(() => this.setBusy(false)),
			catchError((error: HttpErrorResponse) => {
				this.onRequestError(error, "Unable to load profile photo");
				return of("");
			})
		);
	}

	private setBusy(isBusy: boolean): void {
		this.widgetContext.setState(isBusy ? WidgetState.busy : WidgetState.running);
	}

	private getPhoto(response: Blob): Observable<string> {
		const subject = new AsyncSubject<string>();
		const reader = new FileReader();

		reader.onload = () => {
			subject.next(reader.result as string);
			subject.complete();
		};
		reader.readAsDataURL(response);

		return subject.asObservable();
	}

	private onRequestError(error: HttpErrorResponse, message: string): void {
		Log.error(this.logPrefix + "ION API Error: " + JSON.stringify(error));
		this.widgetContext.showWidgetMessage({
			message: message,
			type: WidgetMessageType.Error
		});
		this.setBusy(false);
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [IonApiSocialComponent],
	entryComponents: [IonApiSocialComponent]
})
export class IonApiSocialModule { }
