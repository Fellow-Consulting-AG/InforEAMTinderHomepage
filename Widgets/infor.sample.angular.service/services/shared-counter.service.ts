import { Injectable } from "@angular/core";
import { Counter } from "./counter";

/**
 * This service is provided in the WidgetComponent, together with the SohoContextualActionPanelService.
 * This will create one instance of the service in each individual widget instance.
 */
@Injectable()
export class SharedCounterService extends Counter {
	constructor() {
		super("SharedCounterService");
	}
}
