import { Component } from "@angular/core";
import { states } from "../data";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-multiselect",
	template: `
		<div class="field">
			<label soho-label
						[required]="true"
						data-lm-tst-smp="ms-lbl">
				Multiselect
				<br/>
				ngModel: {{model}}
			</label>
			<select soho-dropdown
						multiple
						[closeOnSelect]="false"
						[(ngModel)]="model"
						data-validate="required"
						[disabled]="disabled"
						data-lm-tst-smp="ms-sel">
				<option *ngFor="let state of states"
							[value]="state.value">{{state.label}}</option>
			</select>
		</div>`
})
export class MultiselectComponent extends ComponentBase {
	states = states;

	ngOnInit() {
		this.model = this.setDefaultValue ? ["CA", "ND"] : undefined;
	}
}
