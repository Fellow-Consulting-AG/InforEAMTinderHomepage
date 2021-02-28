import { IWidgetContext, IWidgetInstance } from "lime";
import { DialogsComponent, DialogsModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: DialogsModule,
			componentType: DialogsComponent
		}
	};
};
