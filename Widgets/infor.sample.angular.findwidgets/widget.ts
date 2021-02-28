import { IWidgetContext, IWidgetInstance } from "lime";
import { FindWidgetsComponent, FindWidgetsModule, getActions } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(context),
		angularConfig: {
			componentType: FindWidgetsComponent,
			moduleType: FindWidgetsModule,
		}
	};
};
