import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, ResponsiveWidgetComponent, ResponsiveWidgetModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(),
		angularConfig: {
			moduleType: ResponsiveWidgetModule,
			componentType: ResponsiveWidgetComponent
		}
	};
};
