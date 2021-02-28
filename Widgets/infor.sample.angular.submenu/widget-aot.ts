import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, SubmenuComponent } from "./main";
import { SubmenuModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(context),
		angularConfig: {
			moduleFactory: SubmenuModuleNgFactory,
			componentType: SubmenuComponent
		}
	};
};
