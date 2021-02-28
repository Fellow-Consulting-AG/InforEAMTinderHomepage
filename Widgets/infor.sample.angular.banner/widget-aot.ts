import { IWidgetContext, IWidgetInstance } from "lime";
import { WidgetComponent } from "./main";
import { WidgetModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => ({
	angularConfig: {
		moduleFactory: WidgetModuleNgFactory,
		componentType: WidgetComponent,
	}
});
