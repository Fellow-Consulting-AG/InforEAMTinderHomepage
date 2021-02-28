import { IWidgetInstance } from "lime";
import { CardGroupActionComponent } from "./main";
import { CardGroupActionModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: CardGroupActionModuleNgFactory,
			componentType: CardGroupActionComponent
		}
	};
};
