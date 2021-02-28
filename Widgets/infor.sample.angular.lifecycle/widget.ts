import { IWidgetContext, IWidgetInstance } from "lime";
import { LifecycleComponent } from "./lifecycle.component";
import { LifecycleModule } from "./lifecycle.module";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: LifecycleModule,
			componentType: LifecycleComponent,
		},
	};
};
