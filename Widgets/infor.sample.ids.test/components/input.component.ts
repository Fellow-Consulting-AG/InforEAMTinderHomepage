import { Component } from "@angular/core";
import { ComponentBase } from "./base.component";

@Component({
	selector: "ids-input",
	template: `
		<div class="field">
			<label soho-label [required]="true" data-lm-tst-smp="in-lbl">Input <br/> ngModel: {{model}}</label>
			<input soho-input [(ngModel)]="model" data-validate="required" [disabled]="disabled" data-lm-tst-smp="in-ipt"/>
		</div>`
})
export class InputComponent extends ComponentBase {
	ngOnInit() {
		this.model = this.setDefaultValue ? "a text" : undefined;
	}
}
