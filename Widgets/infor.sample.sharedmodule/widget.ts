import { IWidgetContext, IWidgetInstance } from "lime";
import { SharedModuleSampleOneComponent, SharedModuleSampleOneModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: SharedModuleSampleOneModule,
			componentType: SharedModuleSampleOneComponent
		}
	};
};
