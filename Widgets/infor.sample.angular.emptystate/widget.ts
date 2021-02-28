import { IWidgetContext, IWidgetInstance } from "lime";
import { EmptyStateComponent, EmptyStateModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: EmptyStateModule,
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
