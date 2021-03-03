import { IWidgetContext, IWidgetInstance } from "lime";
import { CardListComponent } from "./main";
import { CardListModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: CardListModuleNgFactory,
			componentType: CardListComponent
		}
	};
};
