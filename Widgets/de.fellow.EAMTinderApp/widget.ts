import { IWidgetContext, IWidgetInstance } from "lime";
import { MapComponent, MapsModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: MapsModule,
			componentType: MapComponent
		}
	};
};
