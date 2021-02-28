import { IWidgetInstance } from "lime";
import { IDSTestComponent, IDSTestModule } from "./main";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: IDSTestModule,
			componentType: IDSTestComponent
		},
		actions: [
			{ isPrimary: true, standardIconName: "#icon-cascade-objects", text: "Modal" },
			{ text: "Modal with default values" }
		]
	};
};
