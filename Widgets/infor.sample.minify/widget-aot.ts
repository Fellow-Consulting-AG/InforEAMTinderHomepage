import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, MinifySampleComponent } from "./main";
import { MinifySampleModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: MinifySampleModuleNgFactory,
			componentType: MinifySampleComponent
		},
		actions: getActions()
	};
};
