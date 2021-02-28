import { CommonModule } from "@angular/common";
import { Component, Input, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoButtonModule } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, Log, WidgetState } from "lime";
import { IUserContext, UserContextService } from "sample-shared-usercontext";

@Component({
	template: `
	<div class="lm-padding-lg">
		<p>User context will be loaded only once and shared among all widgets using the specified shared module</p>
		<div class="lm-margin-md-t">
			<button soho-button="primary" (click)="getAndSetUserContext()">Get user info</button>
		</div>
		<div class="field">
			<label>Name</label>
			<input [value]="userContext?.name" readonly/>
		</div>
		<div class="field">
			<label>User ID</label>
			<input [value]="userContext?.userId" readonly class="input-sm"/>
		</div>
		<div class="compound-field">
			<div class="field">
				<label>Department</label>
				<input [value]="userContext?.department" readonly class="input-sm"/>
			</div>
			<div class="field">
				<label>Area</label>
				<input [value]="userContext?.area" readonly class="input-xs"/>
			</div>
		</div>
	</div>
	`,
	styles: [`
		div > p {
			text-align: center;
			font-style: italic;
			font-size: 12px;
		}

		div > p + div {
			text-align: center;
		}

		.field {
			margin-bottom: 10px;
		}

		.compound-field > field {
			margin-bottom: 0;
		}
	`]
})
export class SharedModuleSampleTwoComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	userContext: IUserContext;

	constructor(private readonly userContextService: UserContextService) { }

	getAndSetUserContext(): void {
		this.setBusy(true);
		this.userContextService.getUserContext(this.widgetContext).subscribe((result: IUserContext) => {
			this.userContext = result;
		}, (onError) => {
			Log.error(`Failed to get User Context ${onError}`);
		}, () => {
			this.setBusy(false);
		});
	}

	private setBusy(isBusy: boolean): void {
		this.widgetContext.setState(isBusy ? WidgetState.busy : WidgetState.running);
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, SohoButtonModule],
	declarations: [SharedModuleSampleTwoComponent],
	entryComponents: [SharedModuleSampleTwoComponent]
})
export class SharedModuleSampleTwoModule { }
