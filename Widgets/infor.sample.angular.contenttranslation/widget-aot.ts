import { IWidgetContext, IWidgetInstance } from "lime";
import { ContentTranslationComponent } from "./main";
import { ContentTranslationModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: ContentTranslationModuleNgFactory,
			componentType: ContentTranslationComponent,
		},
	};
};
