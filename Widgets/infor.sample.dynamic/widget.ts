import { IWidgetInstance } from "lime";
import { WidgetComponent } from "./widget.component";
import { WidgetModule } from "./widget.module";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: WidgetModule,
			componentType: WidgetComponent,
		},
	};
};
