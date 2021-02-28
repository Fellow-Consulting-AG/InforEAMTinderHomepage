import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, ResponsiveWidgetComponent } from "./main";
import { ResponsiveWidgetModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(),
		angularConfig: {
			moduleFactory: ResponsiveWidgetModuleNgFactory,
			componentType: ResponsiveWidgetComponent
		}
	};
};
