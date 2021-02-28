import { IWidgetContext, IWidgetInstance } from "lime";
import { IonApiSocialComponent, IonApiSocialModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: IonApiSocialModule,
			componentType: IonApiSocialComponent
		}
	};
};
