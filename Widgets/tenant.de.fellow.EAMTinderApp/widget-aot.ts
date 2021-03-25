import { IWidgetContext, IWidgetInstance } from "lime";
import { MapComponent } from "./main";
import { MapsModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: MapsModuleNgFactory,
			componentType: MapComponent
		}
	};
};
