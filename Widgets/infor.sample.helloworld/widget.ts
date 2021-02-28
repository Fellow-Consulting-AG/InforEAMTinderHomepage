import { IWidgetContext, IWidgetInstance } from "lime";

class HelloWorld implements IWidgetInstance {
	private messageElement: JQuery;

	constructor(private widgetContext: IWidgetContext) {
		// Add content to the widget element
		this.addContent();

		// Initial update of the message text
		this.updateMessage();
	}

	settingsSaved() {
		this.updateMessage();
	}

	private addContent() {
		const div = $("<div/>");
		const h1 = $("<h1/>").css({ "margin-top": "20px", "text-align": "center" });
		div.append(h1);

		this.widgetContext.getElement().append(div);
		this.messageElement = h1;
	}

	private updateMessage() {
		const message = this.widgetContext.getSettings().get<string>("Message");
		this.messageElement.text(message);
	}
}

// Widget factory function
export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	// Create and return the widget instance
	return new HelloWorld(context);
};
