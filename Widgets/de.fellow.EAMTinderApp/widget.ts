import { IWidgetContext, IWidgetInstance } from "lime";
import { MapComponent, CardListModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: CardListModule,
			componentType: MapComponent
		}
	};
};
