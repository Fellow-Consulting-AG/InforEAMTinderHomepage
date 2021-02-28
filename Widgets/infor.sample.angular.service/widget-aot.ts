import { IWidgetContext, IWidgetInstance } from "lime";
import { WidgetComponent } from "./components/widget.component";
import { WidgetModuleNgFactory } from "./widget.module.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: WidgetModuleNgFactory,
			componentType: WidgetComponent,
		},
	};
};
