import { IWidgetInstance } from "lime";
import { getActions, QuicknoteComponent } from "./main";
import { QuicknoteModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: QuicknoteModuleNgFactory,
			componentType: QuicknoteComponent
		},
		actions: getActions()
	};
};
