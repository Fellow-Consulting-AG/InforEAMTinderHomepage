import { IWidgetContext, IWidgetInstance } from "lime";
import { EmptyStateComponent } from "./main";
import { EmptyStateModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: EmptyStateModuleNgFactory,
			componentType: EmptyStateComponent
		},
		isConfigured: (): boolean => {
			if (context.getSettings().get<string>("Message")) {
				return true;
			} else {
				return false;
			}
		}
	};
};
