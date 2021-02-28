import { Component } from "@angular/core";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-timepicker",
	template: `
		<div class="field">
			<label soho-label
						data-lm-tst-smp="tp-lbl">
				Timepicker
				<br/>
				ngModel: {{model}}
			</label>
			<input soho-timepicker
						timeFormat="HH:mm:ss"
						placeholder="HH:mm:ss"
						[(ngModel)]="model"
						data-validate="required"
						[disabled]="disabled"
						data-lm-tst-smp="tp-ipt"/>
		</div>`
})
export class TimepickerComponent extends ComponentBase {
	ngOnInit() {
		this.model = this.setDefaultValue ? "15:30:00" : undefined;
	}
}
