import { Component } from "@angular/core";
import { LocalCounterService } from "../services/local-counter.service";

@Component({
	selector: "local-counter",
	template: `
		<counter
			label="local-counter"
			[value]="counter.count"
			(plus)="counter.increment()"
			(minus)="counter.decrement()"
			soho-tooltip
			title="This counter does not share state since the service is only provided in this component">
		</counter>
	`,
	providers: [LocalCounterService],
})
export class LocalCounterComponent {
	constructor(public counter: LocalCounterService) { }
}
