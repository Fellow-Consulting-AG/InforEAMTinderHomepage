import { Component, Input } from "@angular/core";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-datepicker",
	template: `
		<div class="field">
			<label soho-label
					[attr.data-lm-tst-smp]="testId + '-lbl'">
				{{ "Datepicker" + (withTime ? " (with time)" : "")}}
				<br/>
				ngModel: {{model}}
			</label>
			<input soho-datepicker
						placeholder="MM/dd/yyyy"
						[options]="options"
						[(ngModel)]="model"
						[class.input-mm]="withTime"
						[disabled]="disabled"
				[attr.data-lm-tst-smp]="testId + '-ipt'"/>
		</div>`
})
export class DatepickerComponent extends ComponentBase {
	@Input() withTime = false;
	@Input() testId: string;

	options: SohoDatePickerOptions;

	ngOnInit() {
		this.model = this.setDefaultValue ? this.withTime ? "01/01/2019 15:30:00" : "01/01/2019" : undefined;

		this.options = {
			dateFormat: "MM/dd/yyyy",
		};

		if (this.withTime) {
			this.options = { ...this.options, showTime: true, timeFormat: "HH:mm:ss", useCurrentTime: true };
		}
	}
}
