import { IWidgetContext, IWidgetInstance } from "lime";
import { ContextParametersComponent, ContextParametersModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: ContextParametersModule,
			componentType: ContextParametersComponent,
		},
	};
};
