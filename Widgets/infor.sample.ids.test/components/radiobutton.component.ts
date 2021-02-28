import { Component } from "@angular/core";
import { CommonUtil } from "lime";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-radiobutton",
	template: `
	<div class="field">
		<label soho-label
					data-lm-tst-smp="rb-lbl">
			Radiobutton
			<br/>
			ngModel: {{model}}
		</label>
		<input soho-radiobutton
					type="radio"
					[(ngModel)]="model"
					[value]="1"
					[id]="id + '1'"
					[attr.disabled]="disabledAttr"
					data-lm-tst-smp="rb-1-ipt" />
		<label soho-label
					[for]="id + '1'"
					[forRadioButton]="true"
					data-lm-tst-smp="rb-1-lbl">One</label>
		<input soho-radiobutton
					type="radio"
					[(ngModel)]="model"
					[value]="2"
					[id]="id + '2'"
					[attr.disabled]="disabledAttr"
					data-lm-tst-smp="rb-2-ipt" />
		<label soho-label
					[for]="id + '2'"
					[forRadioButton]="true"
					data-lm-tst-smp="rb-2-lbl">Two</label>
		<input soho-radiobutton
					type="radio"
					[(ngModel)]="model"
					[value]="3"
					[id]="id + '3'"
					[attr.disabled]="disabledAttr"
					data-lm-tst-smp="rb-2-ipt" />
		<label soho-label
					[for]="id + '3'" [forRadioButton]="true"
					data-lm-tst-smp="rb-3-lbl">Three</label>
		<br>
	</div>`
})
export class RadiobuttonComponent extends ComponentBase {
	id = CommonUtil.random(3);

	ngOnInit() {
		this.model = this.setDefaultValue ? 3 : 1;
	}
}
