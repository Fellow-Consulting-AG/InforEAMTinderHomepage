import { IWidgetContext, IWidgetInstance } from "lime";
import { FindWidgetsComponent, getActions } from "./main";
import { FindWidgetsModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(context),
		angularConfig: {
			componentType: FindWidgetsComponent,
			moduleFactory: FindWidgetsModuleNgFactory
		}
	};
};
