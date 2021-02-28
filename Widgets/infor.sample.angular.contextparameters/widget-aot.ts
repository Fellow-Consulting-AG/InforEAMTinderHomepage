import { IWidgetContext, IWidgetInstance } from "lime";
import { ContextParametersComponent } from "./main";
import { ContextParametersModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: ContextParametersModuleNgFactory,
			componentType: ContextParametersComponent,
		},
	};
};
