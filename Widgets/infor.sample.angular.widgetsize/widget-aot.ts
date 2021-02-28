import { IWidgetInstance } from "lime";
import { WidgetSizeComponent } from "./main";
import { WidgetSizeModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: WidgetSizeModuleNgFactory,
			componentType: WidgetSizeComponent
		}
	};
};
