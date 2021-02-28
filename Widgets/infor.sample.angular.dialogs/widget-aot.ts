import { IWidgetContext, IWidgetInstance } from "lime";
import { DialogsComponent } from "./main";
import { DialogsModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			componentType: DialogsComponent,
			moduleFactory: DialogsModuleNgFactory
		}
	};
};
