import { Input } from "@angular/core";

export abstract class ComponentBase {
	@Input() setDefaultValue: boolean;
	@Input() disabled: boolean;

	get disabledAttr() {
		return this.disabled ? "" : null;
	}

	model: unknown;
}
