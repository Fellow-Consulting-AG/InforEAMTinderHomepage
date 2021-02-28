import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { SohoBusyIndicatorDirective } from "@infor/sohoxi-angular";
import { IWidgetSettingsComponent, IWidgetSettingsContext2, IWidgetSettingsInstance2 } from "lime";
import { SettingKey } from "./core";
import { TitleSettingComponent } from "./title-setting";

@Component({
	template: `
	<div soho-busyindicator blockUI="true" displayDelay="0">
		<infor-sample-setting-title-field
			[widgetSettingsContext]="widgetSettingsContext"
			label="Title">
		</infor-sample-setting-title-field>
		<div class="field" *ngIf="styleEditVisible">
			<label>{{styleEditLabel}}</label>
			<select soho-dropdown [(ngModel)]="textStyle" [disabled]="!styleEditEnabled" noSearch>
				<option *ngFor="let styleOption of textStyleOptions" [value]="styleOption">{{styleOption}}</option>
			</select>
		</div>
		<div class="field" *ngIf="colorEditVisible">
			<label>{{colorEditLabel}}</label>
			<input soho-colorpicker [(ngModel)]="textColor" [disabled]="!colorEditEnabled"/>
		</div>
	</div>
	`,
})
export class SettingsComponent implements IWidgetSettingsComponent, OnInit {
	@Input() widgetSettingsContext: IWidgetSettingsContext2;
	@Input() widgetSettingsInstance: IWidgetSettingsInstance2;

	@ViewChild(TitleSettingComponent, { static: true }) titleSettingComponent: TitleSettingComponent;
	@ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator: SohoBusyIndicatorDirective;

	colorEditEnabled: boolean;
	colorEditVisible: boolean;
	colorEditLabel: string;

	styleEditVisible: boolean;
	styleEditEnabled: boolean;
	styleEditLabel: string;

	textStyleOptions: string[];

	textStyle: string;
	textColor: string;

	ngOnInit(): void {
		this.initFromSettings();
		this.fetchStyleSettingsAsync();
		this.setupSettingsClosingHandler();
	}

	private initFromSettings(): void {
		const widgetContext = this.widgetSettingsContext.getWidgetContext();
		const settings = widgetContext.getSettings();

		this.textColor = settings.get<string>(SettingKey.Color);
		this.styleEditLabel = widgetContext.getLanguage().get("textStyleSettingLabel");
		this.colorEditVisible = settings.isSettingVisible(SettingKey.Color);
		this.colorEditEnabled = settings.isSettingEnabled(SettingKey.Color);

		this.colorEditLabel = widgetContext.getLanguage().get("textColorSettingLabel");
		this.styleEditVisible = settings.isSettingVisible(SettingKey.Style);
		this.styleEditEnabled = settings.isSettingEnabled(SettingKey.Style);
	}

	private fetchStyleSettingsAsync(): void {
		this.busyIndicator.activated = true;
		setTimeout(() => {
			const settings = this.widgetSettingsContext.getWidgetContext().getSettings();
			this.textStyleOptions = ["Normal", "Italic", "Bold"];
			this.textStyle = settings.get<string>(SettingKey.Style);
			this.busyIndicator.activated = false;
		}, 3000);
	}

	private setupSettingsClosingHandler(): void {
		this.widgetSettingsInstance.closing = (closingArg) => {
			const settings = this.widgetSettingsContext.getWidgetContext().getSettings();
			if (closingArg.isSave) {
				if (this.colorEditEnabled) {
					settings.set(SettingKey.Color, this.textColor);
				}
				if (this.styleEditEnabled) {
					settings.set(SettingKey.Style, this.textStyle);
				}
				this.titleSettingComponent.save();
			}
		};
	}
}
