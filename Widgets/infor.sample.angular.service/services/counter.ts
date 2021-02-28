import { OnDestroy } from "@angular/core";
import { Log } from "lime";

export abstract class Counter implements OnDestroy {
	private internalCounter = 0;

	constructor(private logPrefix: string) {
		this.log("created");
	}

	ngOnDestroy() {
		this.log("destroyed");
	}

	get count() {
		return this.internalCounter;
	}

	increment() {
		this.log("increment");
		this.internalCounter++;
	}

	decrement() {
		this.log("decrement");
		this.internalCounter--;
	}

	protected log(message: string) {
		Log.debug(`[infor.sample.angular.service] (${this.logPrefix}) ${message}`);
	}
}
