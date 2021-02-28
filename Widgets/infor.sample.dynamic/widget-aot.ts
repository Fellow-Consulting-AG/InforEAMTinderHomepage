import { IWidgetContext2, IWidgetInstance2 } from "lime";
import { WidgetComponent } from "./widget.component";
import { WidgetModuleNgFactory } from "./widget.module.ngfactory";

export const widgetFactory = (context: IWidgetContext2): IWidgetInstance2 => {
	return {
		angularConfig: {
			moduleFactory: WidgetModuleNgFactory,
			componentType: WidgetComponent,
		},
	};
};
