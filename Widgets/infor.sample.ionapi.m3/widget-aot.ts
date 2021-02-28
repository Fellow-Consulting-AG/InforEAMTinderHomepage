import { IWidgetContext, IWidgetInstance } from "lime";
import { IonApiM3Component } from "./main";
import { IonApiM3ModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: IonApiM3ModuleNgFactory,
			componentType: IonApiM3Component
		}
	};
};
