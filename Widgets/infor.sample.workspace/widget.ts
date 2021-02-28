import { IWidgetContext2, IWidgetInstance2 } from "lime";
import { WorkspaceWidgetComponent, WorkspaceWidgetModule } from "./main";

export const widgetFactory = (context: IWidgetContext2): IWidgetInstance2 => {
	return {
		angularConfig: {
			moduleType: WorkspaceWidgetModule,
			componentType: WorkspaceWidgetComponent,
		},
	};
};
