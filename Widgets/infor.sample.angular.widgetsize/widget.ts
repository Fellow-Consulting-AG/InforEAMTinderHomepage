import { IWidgetInstance } from "lime";
import { WidgetSizeComponent, WidgetSizeModule } from "./main";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: WidgetSizeModule,
			componentType: WidgetSizeComponent
		}
	};
};
