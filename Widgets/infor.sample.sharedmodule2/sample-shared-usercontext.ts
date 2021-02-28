import { Injectable } from "@angular/core";
import { IWidgetContext } from "lime";
import { AsyncSubject, Observable } from "rxjs";

export interface IUserContext {
	name: string;
	userId: string;
	department?: string;
	area?: string;
}

@Injectable({
	providedIn: "root"
})

export class UserContextService {
	private userContext: IUserContext;
	private pendingContextSubjects: AsyncSubject<IUserContext>[];
	private noOfContextRequests = 0;

	getUserContext(widgetContext: IWidgetContext): Observable<IUserContext> {
		this.noOfContextRequests++;
		const subject = new AsyncSubject<IUserContext>();

		if (this.userContext) {
			subject.next(this.userContext);
			subject.complete();
			this.showLoadInfo(false);
		} else {
			const pending = this.pendingContextSubjects;

			if (pending && pending.length) {
				pending.push(subject);
			} else {
				this.pendingContextSubjects = [subject];
				this.loadUserContext(widgetContext);
			}
		}

		return subject.asObservable();
	}

	private loadUserContext(widgetContext: IWidgetContext): void {
		const pending = this.pendingContextSubjects;

		// *** Real scenario would be to load the context through some ION API ***

		// const baseUrl = widgetContext.isCloud() ? "M3" : "CustomerApi/M3";

		// const options = {
		// 	url: baseUrl + "MNS150MI/GetUserData",
		// 	method: "GET"

		// } as IIonApiRequestOptions;

		// widgetContext.executeIonApiAsync(options).subscribe((response: IIonApiResponse<IUserContext>) => {
		// 	const userContext = response.data as IUserContext;
		// 	this.userContext = userContext;
		// 	this.resolve(pending, userContext);
		// }, (e) => {
		// 	this.reject(pending, e);
		// });

		// *** Using mock data for sample ***
		setTimeout(() => {
			const userContext = {
				name: "Hulk Holding",
				userId: "hholding",
				department: "Dept. A",
				area: "10"
			};
			this.userContext = userContext;
			this.resolve(pending, userContext);
		},
			3000);
	}

	private resolve(subjects: AsyncSubject<IUserContext>[], value?: IUserContext): void {
		for (const subject of subjects) {
			subject.next(value);
			subject.complete();
		}

		subjects.splice(0, subjects.length);

		this.showLoadInfo(true);
	}

	private reject(subjects: AsyncSubject<IUserContext>[], reason: {}): void {
		for (const subject of subjects) {
			subject.error(reason);
		}

		subjects.splice(0, subjects.length);
	}

	private showLoadInfo(onInit?: boolean): void {
		const title = onInit ? "User context loaded" : "User context not loaded";
		const loadedOnceMessage = `User context was requested ${this.noOfContextRequests} times, but only loaded once`;
		const notReloadedMessage = "Existing user context returned, not re-loaded";
		const message = onInit ? loadedOnceMessage : notReloadedMessage;
		$("body").toast({ title: title, message: message, position: "bottom right" });
	}
}
