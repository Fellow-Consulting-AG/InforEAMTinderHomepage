import { IWidgetContext, IWidgetInstance } from "lime";
import { W2WReceiverComponent } from "./main";
import { W2WReceiverModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: W2WReceiverModuleNgFactory,
			componentType: W2WReceiverComponent
		}
	};
};
