import { Component } from "@angular/core";
import { SharedCounterService } from "../services/shared-counter.service";

@Component({
	selector: "shared-counter",
	template: `
		<counter
			label="shared-counter"
			[value]="counter.count"
			(plus)="counter.increment()"
			(minus)="counter.decrement()"
			soho-tooltip
			title="This counter shares state within the component tree since the service is provided in a parent component.">
		</counter>
	`,
})
export class SharedCounterComponent {
	constructor(public counter: SharedCounterService) { }
}
