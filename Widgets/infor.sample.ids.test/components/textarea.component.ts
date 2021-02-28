import { Component } from "@angular/core";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-textarea",
	template: `
		<div class="field">
			<label soho-label
					[required]="true"
					data-lm-tst-smp="ta-lbl">
				Textarea
				<br/>
				ngModel: {{model}}
			</label>
			<textarea soho-textarea
							maxlength="100"
							[(ngModel)]="model"
							data-validate="required"
							[disabled]="disabled"
							data-lm-tst-smp="ta"></textarea>
		</div>`
})
export class TextareaComponent extends ComponentBase {
	ngOnInit() {
		this.model = this.setDefaultValue ? "This textarea has a default text" : undefined;
	}
}
