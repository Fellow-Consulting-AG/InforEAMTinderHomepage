import { IWidgetContext, IWidgetInstance } from "lime";
import { W2WSenderComponent } from "./main";
import { W2WSenderModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: W2WSenderModuleNgFactory,
			componentType: W2WSenderComponent
		}
	};
};
