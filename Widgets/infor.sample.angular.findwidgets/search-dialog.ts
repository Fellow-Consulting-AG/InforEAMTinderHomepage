import { Component, Input } from "@angular/core";

@Component({
	template: `
	<div class="field">
		<label for="queryInput" class="required">{{searchLabel}}</label>
		<input
			id="queryInput"
			[(ngModel)]="query"
			data-validate="required"
			placeholder="Example: infor.sample.angular.helloworld"/>
	</div>
	`,
})
export class SearchDialogComponent {
	@Input()
	searchLabel: string;
	query: string;
}
