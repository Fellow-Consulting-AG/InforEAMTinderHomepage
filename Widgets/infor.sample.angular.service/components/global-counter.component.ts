import { Component } from "@angular/core";
import { GlobalCounterService } from "../services/global-counter.service";

@Component({
	selector: "global-counter",
	template: `
		<counter
			label="global-counter"
			[value]="counter.count"
			(plus)="counter.increment()"
			(minus)="counter.decrement()"
			soho-tooltip
			title="This counter shares state with other widget instances since the service is provided in 'root'">
		</counter>
	`,
})
export class GlobalCounterComponent {
	constructor(public counter: GlobalCounterService) { }
}
