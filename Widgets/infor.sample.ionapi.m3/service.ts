
import { HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { IIonApiRequestOptions, IWidgetContext, Log, widgetContextInjectionToken, WidgetMessageType, WidgetState } from "lime";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IListItem, IMIRecord, IMIResponse, INameValue } from "./interfaces";

@Injectable()
export class M3Service {
	private logPrefix = "[IonApiM3Sample] ";

	constructor(@Inject(widgetContextInjectionToken) private readonly widgetContext: IWidgetContext) { }

	getCustomerData(): Observable<IListItem[]> {
		this.setBusy(true);
		const request = this.createRequest();

		return this.widgetContext.executeIonApiAsync<IMIResponse>(request).pipe(
			map(response => this.getParsedRecords(response.data.MIRecord)),
			tap(() => this.setBusy(false)),
			catchError((error: HttpErrorResponse) => {
				this.showErrorMessage(error);
				return of([]);
			})
		);
	}

	private createRequest(): IIonApiRequestOptions {
		return {
			method: "GET",
			url: "/M3/m3api-rest/execute/CRS610MI/LstByName",
			cache: false,
			headers: {
				Accept: "application/json"
			}
		};
	}

	private setBusy(isBusy: boolean): void {
		this.widgetContext.setState(isBusy ? WidgetState.busy : WidgetState.running);
	}

	private getParsedRecords(records: IMIRecord[]) {
		return records.map((record): IListItem => ({
			title: this.getValue(record.NameValue, "CUNO"),
			description: this.getValue(record.NameValue, "CUNM"),
		}));
	}

	private getValue(nameValues: INameValue[], name: string): string {
		const nameValueWithMatchingName = nameValues.find((nameValue) => nameValue.Name === name);
		if (nameValueWithMatchingName) {
			return nameValueWithMatchingName.Value.trim();
		} else {
			return null;
		}
	}

	private showErrorMessage(error: HttpErrorResponse): void {
		Log.error(this.logPrefix + "ION API Error: " + JSON.stringify(error));
		this.widgetContext.showWidgetMessage({
			type: WidgetMessageType.Error,
			message: "Unable to load customer data"
		});
		this.setBusy(false);
	}
}
