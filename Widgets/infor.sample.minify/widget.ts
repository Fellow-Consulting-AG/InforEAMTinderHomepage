import { IWidgetContext, IWidgetInstance } from "lime";
import { getActions, MinifySampleComponent, MinifySampleModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: MinifySampleModule,
			componentType: MinifySampleComponent
		},
		actions: getActions()
	};
};
