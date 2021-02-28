import { IWidgetContext2, IWidgetInstance2 } from "lime";
import { WorkspaceWidgetComponent } from "./main";
import { WorkspaceWidgetModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (context: IWidgetContext2): IWidgetInstance2 => {
	return {
		angularConfig: {
			moduleFactory: WorkspaceWidgetModuleNgFactory,
			componentType: WorkspaceWidgetComponent,
		},
	};
};
