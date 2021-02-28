import { Component } from "@angular/core";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-colorpicker",
	template: `
		<div class="field">
			<label soho-label [required]="true" data-lm-tst-smp="cp-lbl">Colorpicker <br/> ngModel: {{model}}</label>
			<input soho-colorpicker [(ngModel)]="model" [clearable]="false" data-validate="required" [disabled]="disabled"
				data-lm-tst-smp="cp-ipt"/>
		</div>`
})
export class ColorpickerComponent extends ComponentBase {
	ngOnInit() {
		this.model = this.setDefaultValue ? "#1a1a1a" : undefined;
	}
}
