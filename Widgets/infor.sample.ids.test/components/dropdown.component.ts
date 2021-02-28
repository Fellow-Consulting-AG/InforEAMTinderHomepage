import { Component } from "@angular/core";
import { states } from "../data";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-dropdown",
	template: `
		<div class="field">
			<label soho-label [required]="true" data-lm-tst-smp="dd-lbl">Dropdown <br/> ngModel: {{model}}</label>
			<select soho-dropdown [(ngModel)]="model" data-validate="required" [disabled]="disabled" data-lm-tst-smp="dd-sel">
				<option *ngFor="let state of states" [value]="state.value">{{state.label}}</option>
			</select>
		</div>`
})
export class DropdownComponent extends ComponentBase {
	states = states;

	ngOnInit() {
		this.model = this.setDefaultValue ? states[2].value : undefined;
	}
}
