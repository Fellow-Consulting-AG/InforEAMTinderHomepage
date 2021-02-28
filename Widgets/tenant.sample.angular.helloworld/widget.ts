import { IWidgetContext, IWidgetInstance } from "lime";
import { HelloWorldComponent, HelloWorldModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: HelloWorldModule,
			componentType: HelloWorldComponent
		}
	};
};
