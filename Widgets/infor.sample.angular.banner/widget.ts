import { IWidgetContext, IWidgetInstance } from "lime";
import { WidgetComponent, WidgetModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => ({
	angularConfig: {
		moduleType: WidgetModule,
		componentType: WidgetComponent
	}
});
