import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { SohoButtonModule, SohoColumnModule, SohoListViewModule } from "@infor/sohoxi-angular";
import { IWidgetAction, IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSize, WidgetMessageType } from "lime";
import { Observable } from "rxjs";

@Component({
	template: `
	<div class="lm-height-full"
		  [class.item-selected]="selectedCustomer"
		  [class.single-width]="(size$ | async)?.cols === 1">
		<button class="lm-margin-md-l"
				  soho-button="icon"
				  icon="left-arrow"
				  (click)="selectedCustomer = null"
				  *ngIf="selectedCustomer">
			Go back
		</button>
		<soho-listview class="lm-scroll-no-x" [class.lm-brd]="selectedCustomer">
			<li soho-listview-item
				 *ngFor="let item of items"
				 (click)="updateChart(item)">
				<p soho-listview-header>{{item}}</p>
			</li>
		</soho-listview>
		<div class="chart-wrapper"
			  *ngIf="selectedCustomer">
			<div soho-column
				  [dataset]="chartData"
				  formatterString="$,"
				  type="column">
			</div>
		</div>
	</div>`,
	styles: [`
		soho-listview {
			width: 100%;
			height: 100%;
			float: left;
		}

		.item-selected soho-listview {
			width: 50%;
			border-right: 1px solid;
		}

		.item-selected.single-width soho-listview {
			display: none;
		}

		.chart-wrapper {
			width: 50%;
			height: calc(100% - 36px);
			float: left;
		}

		.single-width .chart-wrapper {
			width: 100%;
		}
	`]
})
export class ResponsiveWidgetComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	chartData: SohoDataSet;
	items: string[];
	selectedCustomer: string;
	size$: Observable<IWidgetSize>;

	ngOnInit(): void {
		this.size$ = this.widgetContext.getSize();
		this.items = ["Customer A", "Customer 2", "Customer 12345", "Lead customer", "Customer prospect"];
		this.widgetInstance.actions[0].execute = () => this.showInfo();
	}

	updateChart(customer: string): void {
		this.widgetContext.removeWidgetMessage();
		this.selectedCustomer = customer;
		this.chartData = [
			{
				data: [
					{ name: "2014", value: this.getRandomChartValue() },
					{ name: "2015", value: this.getRandomChartValue() },
					{ name: "2016", value: this.getRandomChartValue() },
					{ name: "2017", value: this.getRandomChartValue() }
				]
			}
		];
	}

	private showInfo(): void {
		this.widgetContext.showWidgetMessage({
			type: WidgetMessageType.Info,
			message: "Select a customer to show chart"
		});
	}

	private getRandomChartValue(): number {
		return Math.floor(Math.random() * 1000000);
	}
}

@NgModule({
	imports: [
		CommonModule,
		SohoButtonModule,
		SohoListViewModule,
		SohoColumnModule
	],
	declarations: [ResponsiveWidgetComponent],
	entryComponents: [ResponsiveWidgetComponent]
})
export class ResponsiveWidgetModule { }

export const getActions = (): IWidgetAction[] => {
	return [{ isPrimary: true, standardIconName: "#icon-info", text: "Information" }];
};
