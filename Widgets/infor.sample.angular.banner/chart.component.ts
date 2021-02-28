import { Component, Input } from "@angular/core";

@Component({
	selector: "chart",
	template: `
		<ng-container [ngSwitch]="chartType">
			<div soho-line [isArea]="true" [dataset]="chartData" *ngSwitchCase="'area'"></div>
			<div soho-bar type="bar" [dataset]="chartData" *ngSwitchCase="'bar'"></div>
			<div soho-column type="column" [dataset]="chartData" *ngSwitchCase="'column'"></div>
			<div soho-pie [isDonut]="true" [dataset]="chartData" *ngSwitchCase="'donut'"></div>
		</ng-container>
	`,
	styles: [`
		:host {
			display: block;
			height: 100%;
			width: 100%;
		}
	`]
})
export class ChartComponent {
	@Input() chartType: ChartTypes;

	chartData: SohoDataSet = [
		{
			data: [
				{ name: "Automotive", value: 7 },
				{ name: "Distribution", value: 10 },
				{ name: "Equipment", value: 20 },
				{ name: "Fashion", value: 20 },
				{ name: "Food & Beverage", value: 15 },
				{ name: "Healthcare", value: 10 },
				{ name: "Other", value: 18 }
			]
		}
	];
}
