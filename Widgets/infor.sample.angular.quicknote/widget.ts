import { IWidgetInstance } from "lime";
import { getActions, QuicknoteComponent, QuicknoteModule } from "./main";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: QuicknoteModule,
			componentType: QuicknoteComponent
		},
		actions: getActions()
	};
};
