import { ILanguage, IWidgetContext, IWidgetInstance, IWidgetSettingsCloseArg, IWidgetSettingsContext, IWidgetSettingsInstance } from "lime";

interface IMyLanguage extends ILanguage {
	color?: string;
}

/**
 * Custom settings sample widget.
 *
 * The widget shows a large SVG icon with a color that can be changed in settings.
 * The widget uses a custom settings UI with a color picker for changing the icon color.
 */
class SettingsSample implements IWidgetInstance {
	private defaultColor = "#13a7fe";
	private svg: JQuery;
	private picker: JQuery;
	private language: IMyLanguage;

	constructor(private widgetContext: IWidgetContext) {
		// Get the language object from the widget context.
		this.language = widgetContext.getLanguage();

		// Create the widget content and add it to the parent element from the widget context.
		this.svg = this.createContent();
		this.widgetContext.getElement().append($("<div/>").addClass("lm-size-full lm-padding-lg").append(this.svg));

		this.updateColor();
	}

	/**
	 * Custom settings UI factory function.
	 */
	widgetSettingsFactory(settingsContext: IWidgetSettingsContext): IWidgetSettingsInstance {
		const element = settingsContext.getElement();
		this.picker = this.addSettings(element);
		element.initialize(null);

		const instance: IWidgetSettingsInstance = {
			closing: (arg: IWidgetSettingsCloseArg): void => {
				if (arg.isSave) {
					this.onSettingsSaved();
				}
			}
		};
		return instance;
	}

	/**
	 * Gets the icon color from settings.
	 * @returns The color from the widget settings or a default color.
	 */
	private getColor(): string {
		const color = this.widgetContext.getSettings().get<string>("color");
		return color || this.defaultColor;
	}

	/**
	 * Updates the color of the SVG icon.
	 */
	private updateColor() {
		this.svg.css("color", this.getColor());
	}

	/**
	 * Saves the color setting value and updates the content with the new color.
	 */
	private onSettingsSaved(): void {
		const color = this.picker.val();
		this.widgetContext.getSettings().set("color", color);
		this.updateColor();
	}

	/**
	 * Adds the settings content.
	 * @param element The parent settings element.
	 * @returns The color picker element.
	 */
	private addSettings(element: JQuery): JQuery {
		// Get the localized label text
		const labelText = this.language.color;

		const div = $('<div class="field"></div>');
		div.append($("<label/>").text(labelText));

		const picker = $('<input class="colorpicker" type="text" />');
		picker.val(this.getColor());
		div.append(picker);
		element.append(div);

		return picker;
	}

	/**
	 * Creates an SVG element with a large time picker icon.
	 * @returns An SVG JQuery element.
	 */
	private createContent(): JQuery {
		const svg = $("<svg class='icon' focusable='false' aria-hidden='true'><use xlink:href='#icon-clock'></use></svg>");
		svg.addClass("lm-size-full");
		return svg;
	}
}

// Widget factory function
export const widgetFactory = (context: IWidgetContext): IWidgetInstance => {
	// Create and return the widget instance
	return new SettingsSample(context);
};
