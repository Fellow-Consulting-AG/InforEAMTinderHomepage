import { IWidgetInstance } from "lime";
import { IDSTestComponent } from "./main";
import { IDSTestModuleNgFactory } from "./main.ngfactory";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleFactory: IDSTestModuleNgFactory,
			componentType: IDSTestComponent
		},
		actions: [
			{ isPrimary: true, standardIconName: "#icon-cascade-objects", text: "Modal" },
			{ text: "Modal with default values" }
		]
	};
};
