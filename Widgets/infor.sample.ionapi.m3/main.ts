import { CommonModule } from "@angular/common";
import { Component, NgModule } from "@angular/core";
import { SohoListViewModule } from "@infor/sohoxi-angular";
import { Observable } from "rxjs";
import { IListItem } from "./interfaces";
import { M3Service } from "./service";

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
// - Set the devConfiguration attribute on the <lm-page-container> to the name of the configuration.json file
// - Example:
// - <lm-page-container devWidget="infor.sample.ionapi.m3" devConfiguration="configuration.json"></lm-page-container>
//
//
// Developing and debugging
// ========================
// A widget using the ION API can be developed and debugged like any other widget.
// Just remember to start the proxy and configure the configuration.json file.
// The OAuth token will time out and when that happens you must acquire a new token and update the configuration.json
// file.

@Component({
	providers: [M3Service],
	template: `
	<soho-listview>
		<li soho-listview-item *ngFor="let item of customerItems$ | async">
			<p soho-listview-header>{{item.title}}</p>
			<p soho-listview-subheader>{{item.description}}</p>
		</li>
	</soho-listview>
	`,
})
export class IonApiM3Component {
	customerItems$: Observable<IListItem[]>;

	constructor(private m3Service: M3Service) {
		this.customerItems$ = this.m3Service.getCustomerData();
	}
}

@NgModule({
	imports: [
		SohoListViewModule,
		CommonModule
	],
	declarations: [IonApiM3Component],
	entryComponents: [IonApiM3Component],
})
export class IonApiM3Module { }
