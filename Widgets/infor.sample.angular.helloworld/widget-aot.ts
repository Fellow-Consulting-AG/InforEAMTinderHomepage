import { IWidgetContext, IWidgetInstance } from "lime";
import { HelloWorldComponent } from "./main";
import { HelloWorldModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: HelloWorldModuleNgFactory,
			componentType: HelloWorldComponent
		}
	};
};
