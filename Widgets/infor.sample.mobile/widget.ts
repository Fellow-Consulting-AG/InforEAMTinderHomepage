import { IWidgetContext, IWidgetInstance } from "lime";
import { MobileWidgetComponent, MobileWidgetModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: MobileWidgetModule,
			componentType: MobileWidgetComponent,
		},
	};
};
