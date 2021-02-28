import { Component } from "@angular/core";
import { IState, states } from "../data";
import { ComponentBase } from "./base.component";
@Component({
	selector: "ids-autocomplete",
	template: `
		<div class="field">
			<label soho-label [required]="true" data-lm-tst-smp="ac-lbl">Autocomplete <br/> ngModel: {{model.value}}</label>
			<input soho-autocomplete
					data-lm-tst-smp="ac-ipt"
					[disabled]="disabled"
					[source]="source"
					filterMode="contains"
					[(ngModel)]="model.label"
					(selected)="onSelected($event)"
					data-validate="required"
					placeholder="Type to search..."/>
		</div>`
})
export class AutocompleteComponent extends ComponentBase {
	states = states;
	model: IState;

	ngOnInit() {
		this.model = this.setDefaultValue ? states[2] : {};
	}

	onSelected(event: {}[]) {
		this.model = event[2];
	}

	source = (term: string, response: (term: string, array: IState[]) => void) => {
		response(term, this.states);
	}
}
