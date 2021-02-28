import { Component } from "@angular/core";
import { CommonUtil } from "lime";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-checkbox",
	template: `
		<div class="field">
			<label soho-label data-lm-tst-smp="cb-val">Checkbox & Switch <br/> ngModel: {{model}}</label>
			<input soho-checkbox
						type="checkbox"
						[(ngModel)]="model"
						[id]="random + 'checkbox'"
						[disabled]="disabled"
						data-lm-tst-smp="cb-box">
			<label soho-label
						[for]="random + 'checkbox'"
						[forCheckBox]="true"
						data-lm-tst-smp="cb-box-lbl">Tick</label>
		</div>
		<div class="field switch">
			<input type="checkbox"
					[(ngModel)]="model"
					[id]="random + 'switch'"
					class="switch"
					[disabled]="disabled"
					data-lm-tst-smp="cb-swi">
			<label soho-label
						[for]="random + 'switch'"
						[forCheckBox]="true"
						data-lm-tst-smp="cb-swi-lbl">Tick</label>
		</div>`
})
export class CheckboxComponent extends ComponentBase {
	random = CommonUtil.random(3);

	ngOnInit() {
		this.model = this.setDefaultValue ? true : undefined;
	}
}
