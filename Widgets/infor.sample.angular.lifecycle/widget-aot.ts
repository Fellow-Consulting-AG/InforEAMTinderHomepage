import { IWidgetContext, IWidgetInstance } from "lime";
import { LifecycleComponent } from "./lifecycle.component";
import { LifecycleModuleNgFactory } from "./lifecycle.module.ngfactory";

export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: LifecycleModuleNgFactory,
			componentType: LifecycleComponent,
		},
	};
};
