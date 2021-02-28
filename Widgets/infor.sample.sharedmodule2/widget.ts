import { IWidgetContext, IWidgetInstance } from "lime";
import { SharedModuleSampleTwoComponent, SharedModuleSampleTwoModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: SharedModuleSampleTwoModule,
			componentType: SharedModuleSampleTwoComponent
		}
	};
};
