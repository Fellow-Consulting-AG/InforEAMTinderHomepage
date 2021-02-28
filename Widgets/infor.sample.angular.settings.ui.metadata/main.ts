/**
 * NOTE:
 * A custom settings UI shall only be implemented if settings are dynamic, for instance based on data
 * retrieved from a server and. Or if the settings structure is complicated, and not possible to handle using
 * supported metadata setting types (string, boolean, number, selector). For other cases, use metadata settings
 * handled by the default settings UI.
 */

import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoBusyIndicatorModule, SohoButtonModule, SohoColorPickerModule, SohoDropDownModule } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettings } from "lime";
import { ITextStyle, SettingKey } from "./core";
import { SettingsComponent } from "./settings";
import { TitleSettingComponent } from "./title-setting";

@Component({
	template: `
	<div class="lm-text-align-c lm-padding-xl">
		<span class="label lm-margin-xl-b">
			This widget shows how to implement a Custom Settings UI using Angular.
			The Settings UI can be used to change the style and color of the text shown below.
		</span>
		<h1 [style.color]="textStyle.color"
			 [style.fontStyle]="textStyle.fontStyle"
			 [style.fontWeight]="textStyle.fontWeight">
			Colored Text
		</h1>
	</div>
	`,
})
export class WidgetComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	textStyle: ITextStyle = {};

	ngOnInit(): void {
		this.setupWidgetInstanceListeners();
		this.updateFromSettings(this.widgetContext.getSettings());
	}

	private setupWidgetInstanceListeners() {
		this.widgetInstance.restored = () => this.widgetContext.setStandardTitle();
		this.widgetInstance.settingsSaved = (settingsArg) => this.updateFromSettings(settingsArg.settings);
		this.widgetInstance.widgetSettingsFactory = () => {
			return {
				angularConfig: {
					componentType: SettingsComponent,
				},
			};
		};
	}

	private updateFromSettings(settings: IWidgetSettings) {
		const color = settings.get<string>(SettingKey.Color);
		const textStyle = settings.get<string>(SettingKey.Style).toLowerCase();

		this.textStyle.color = color;

		if (textStyle === "bold") {
			this.textStyle.fontWeight = textStyle;
		} else {
			this.textStyle.fontStyle = textStyle;
		}
	}
}

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		SohoButtonModule,
		SohoBusyIndicatorModule,
		SohoDropDownModule,
		SohoColorPickerModule
	],
	declarations: [
		WidgetComponent,
		SettingsComponent,
		TitleSettingComponent
	],
	entryComponents: [
		WidgetComponent,
		SettingsComponent
	],
})
export class WidgetModule { }
