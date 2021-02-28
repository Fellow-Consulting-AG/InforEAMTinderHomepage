import { IWidgetContext, IWidgetInstance } from "lime";
import { WidgetComponent } from "./components/widget.component";
import { WidgetModule } from "./widget.module";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: WidgetModule,
			componentType: WidgetComponent,
		},
	};
};
