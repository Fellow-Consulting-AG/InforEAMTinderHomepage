import { IWidgetContext, IWidgetInstance } from "lime";
import { ContentTranslationComponent, ContentTranslationModule } from "./main";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: ContentTranslationModule,
			componentType: ContentTranslationComponent,
		},
	};
};
