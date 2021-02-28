import { Injectable } from "@angular/core";
import { IIonApiRequestOptions, IWidgetContext } from "lime";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { ISocialUser, IUserDetailResponse } from "./interfaces";

@Injectable({
	providedIn: "root"
})
export class DataService {
	private serviceUrl = "Mingle/SocialService.Svc";
	private user: ISocialUser;

	loadUser(widgetContext: IWidgetContext): Observable<ISocialUser> {
		if (this.user) {
			return of(this.user);
		}

		const request = this.createRequest("User/Detail");
		return widgetContext.executeIonApiAsync<IUserDetailResponse>(request).pipe(
			map(response => response.data.UserDetailList[0]),
			tap(user => this.user = user)
		);
	}

	loadPhoto(userGuid: string, widgetContext: IWidgetContext): Observable<Blob> {
		const relativeUrl = "User/" + userGuid + "/ProfilePhoto?thumbnailType=3";
		const request = this.createRequest(relativeUrl, { Accept: "image/png, image/jpeg" });
		request.responseType = "blob";

		return widgetContext.executeIonApiAsync<Blob>(request).pipe(
			map(response => response.data)
		);
	}

	private createRequest(relativeUrl: string, headers?: object): IIonApiRequestOptions {
		if (!headers) {
			headers = { Accept: "application/json" };
		}

		// Create the relative URL to the ION API
		const url = this.serviceUrl + "/" + relativeUrl;

		// Create HTTP GET request object
		const request: IIonApiRequestOptions = {
			method: "GET",
			url: url,
			cache: false,
			headers: headers || null
		};

		return request;
	}
}
