import { Injectable } from "@angular/core";
import { Counter } from "./counter";

/**
 * This service is provided inside the LocalCounterComponent, which means that every
 * component instance will get its own service instance. The service state is not
 * shared between components.
 */
@Injectable()
export class LocalCounterService extends Counter {
	constructor() {
		super("LocalCounterService");
	}
}
