import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { SohoBarModule, SohoColumnModule, SohoLineModule, SohoPieModule, SohoToastService } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance } from "lime";
import { ChartComponent } from "./chart.component";

@Component({
	template: `<chart [chartType]="chartType"></chart>`
})
export class WidgetComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;
	chartType: ChartTypes;

	constructor(private toastService: SohoToastService) { }

	ngOnInit(): void {
		if (this.widgetContext.isBanner()) {
			this.showInitialBannerColorToast();
			this.widgetInstance.bannerBackgroundChanged = (newColor: string) => {
				this.showBackgroundColorChangedToast(newColor);
			};
		}
		this.widgetInstance.settingsSaved = () => this.setChartType();
		this.setChartType();
	}

	private setChartType(): void {
		this.chartType = this.widgetContext.getSettings().get<ChartTypes>("chartType");
	}

	private showInitialBannerColorToast(): void {
		const bannerColor = this.widgetContext.getBannerBackgroundColor();
		this.toastService.show({
			title: "Banner added",
			message: `The banner widget container is using background color ${bannerColor}`,
			timeout: 5000,
			position: SohoToastService.BOTTOM_RIGHT
		});
	}

	private showBackgroundColorChangedToast(newColor: string): void {
		this.toastService.show({
			title: "Banner container changed",
			message: `The banner container is now using background color ${newColor}`,
			timeout: 5000,
			position: SohoToastService.BOTTOM_RIGHT
		});
	}
}

@NgModule({
	imports: [
		CommonModule,
		SohoLineModule,
		SohoBarModule,
		SohoColumnModule,
		SohoPieModule
	],
	declarations: [
		ChartComponent,
		WidgetComponent
	],
	entryComponents: [
		WidgetComponent
	]
})
export class WidgetModule { }
