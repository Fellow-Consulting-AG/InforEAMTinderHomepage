import { IWidgetInstance } from "lime";
import { CardGroupActionComponent, CardGroupActionModule } from "./main";

export const widgetFactory = (): IWidgetInstance => {
	return {
		angularConfig: {
			moduleType: CardGroupActionModule,
			componentType: CardGroupActionComponent
		}
	};
};
