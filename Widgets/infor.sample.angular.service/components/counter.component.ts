import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "counter",
	template: `
		<div class="larger-heavy-text">
			{{label}}
		</div>
		<div>
			<button soho-button="icon" icon="minus" (click)="minus.emit()"></button>
			<span class="data-large vertical-middle">
				{{value}}
			</span>
			<button soho-button="icon" icon="add" (click)="plus.emit()"></button>
		</div>
	`,
	styles: [`
		:host {
			text-align: center;
		}
		.vertical-middle {
			vertical-align: middle;
		}
	`]
})
export class CounterComponent {
	@Input() value: number;
	@Input() label: string;
	@Output() plus = new EventEmitter();
	@Output() minus = new EventEmitter();
}
