import { IWidgetContext, IWidgetInstance } from "lime";
import { IonApiM3Component, IonApiM3Module } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: IonApiM3Module,
			componentType: IonApiM3Component
		}
	};
};
