import { IWidgetInstance } from "lime";
import { IonApiSocialComponent } from "./main";
import { IonApiSocialModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: IonApiSocialModuleNgFactory,
			componentType: IonApiSocialComponent
		}
	};
};
