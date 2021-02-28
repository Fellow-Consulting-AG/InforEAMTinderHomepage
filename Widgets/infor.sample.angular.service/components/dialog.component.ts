import { Component } from "@angular/core";

@Component({
	template: `
	<div class="row">
		<div class="twelve columns">
			<p>
				This component is created outside the widget component tree, so it has to provide its own SharedCounterService.
				It will only share state with the rest of the widget (and other widget instances) through the GlobalCounterService.
			</p>
		</div>
	</div>
	<div class="row">
		<div class="twelve columns lm-padding-md">
			<global-counter></global-counter>
		</div>
	</div>
	<div class="row">
		<div class="six columns lm-padding-md">
			<shared-counter></shared-counter>
		</div>
		<div class="six columns lm-padding-md">
			<shared-counter></shared-counter>
		</div>
	</div>
	<div class="row">
		<div class="six columns lm-padding-md">
			<local-counter></local-counter>
		</div>
		<div class="six columns lm-padding-md">
			<local-counter></local-counter>
		</div>
	</div>
	`,
})
export class DialogComponent { }
