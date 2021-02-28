import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, SubmenuComponent, SubmenuModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		actions: getActions(context),
		angularConfig: {
			moduleType: SubmenuModule,
			componentType: SubmenuComponent
		}
	};
};
