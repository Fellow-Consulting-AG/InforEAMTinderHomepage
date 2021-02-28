import { Injectable } from "@angular/core";
import { Counter } from "./counter";

/**
 * This service is automatically provided as a singleton in the root component.
 * This means that a single instance of the service will be shared among every component, pipe, service etc.
 * Note that the service instance (and its state) is shared among widget instances as well.
 *
 * Also note that THIS SERVICE IS NEVER DESTROYED, meaning that whatever state and resources
 * that are consumed by the service will persist indefinitely.
 */
@Injectable({
	providedIn: "root",
})
export class GlobalCounterService extends Counter {
	constructor() {
		super("GlobalCounterService");
	}
}
