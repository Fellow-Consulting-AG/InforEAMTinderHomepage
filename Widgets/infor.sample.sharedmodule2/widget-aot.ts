import { IWidgetContext, IWidgetInstance } from "lime";
import { SharedModuleSampleTwoComponent } from "./main";
import { SharedModuleSampleTwoModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: SharedModuleSampleTwoModuleNgFactory,
			componentType: SharedModuleSampleTwoComponent
		}
	};
};
