import { IWidgetContext, IWidgetInstance } from "lime";
import { SharedModuleSampleOneComponent } from "./main";
import { SharedModuleSampleOneModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: SharedModuleSampleOneModuleNgFactory,
			componentType: SharedModuleSampleOneComponent
		}
	};
};
