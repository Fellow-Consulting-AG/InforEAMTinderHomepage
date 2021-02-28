import { IWidgetContext, IWidgetInstance } from "lime";
import { CardListComponent, CardListModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: CardListModule,
			componentType: CardListComponent
		}
	};
};
