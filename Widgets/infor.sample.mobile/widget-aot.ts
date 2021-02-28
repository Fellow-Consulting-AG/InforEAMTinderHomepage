import { IWidgetContext, IWidgetInstance } from "lime";
import { MobileWidgetComponent } from "./main";
import { MobileWidgetModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: MobileWidgetModuleNgFactory,
			componentType: MobileWidgetComponent,
		},
	};
};
