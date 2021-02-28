/**
 * The purpose of this sample is to give some insight into how and when lifecycle
 * events are fired, and how to react to them. It logs both Angular and Widget
 * lifecycle events. It can be configured in the settings UI to display more verbose
 * events such as Angular change detection.
 */

import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingsArg, Log, widgetContextInjectionToken, widgetInstanceInjectionToken } from "lime";

interface ILoggedEvent {
	time: number;
	title: string;
	message: string;
}

@Component({
	template: `
		<ul class="lm-padding-sm">
			<li *ngFor="let event of events">
				<span class="time">T+{{event.time}}ms</span>
				<span class="title">[{{event.title}}]</span>
				<span class="message">{{event.message}}</span>
			</li>
		</ul>
	`,
	styles: [`
		li {
			display: flex;
			font-size: small;
			min-height: 20px;
			margin: 2px 0 2px 0;
		}
		.time {
			flex: 0 0 85px;
		}
		.title {
			flex: 0 2 100px;
			padding: 0 2px 0 2px;
		}
		.message {
			flex: 1;
		}
	`],
})
// tslint:disable-next-line:max-line-length
export class LifecycleComponent implements IWidgetComponent, OnInit, AfterViewInit, AfterViewChecked, OnDestroy, DoCheck, OnChanges, AfterContentInit, AfterContentChecked {

	events: ILoggedEvent[] = [];

	private t0: number;
	private logPrefix = "[LifecycleComponent]";
	private asyncOperationInterval: number;
	private counter = 0;

	constructor(
		@Inject(widgetContextInjectionToken) readonly widgetContext: IWidgetContext,
		@Inject(widgetInstanceInjectionToken) readonly widgetInstance: IWidgetInstance) {
		this.t0 = performance.now();
		this.log("constructor", "Start of time");

		this.setWidgetActions();

		/**
		 * Bind Widget Instance event handlers to this object.
		 * For better argument type-safety, you can:
		 * 	this.widgetInstance.foo = (args: Bar) => this.foo(args);
		 */
		const instance = this.widgetInstance;
		instance.activated = () => this.activated();
		instance.deactivated = () => this.deactivated();
		instance.isConfigured = () => this.isConfigured();
		instance.settingsOpening = () => this.settingsOpening();
		instance.settingsSaved = (arg) => this.settingsSaved(arg);
		instance.editing = () => this.editing();
		instance.edited = () => this.edited();
		instance.publishing = () => this.publishing();
		instance.refreshed = () => this.refreshed();
		instance.restored = () => this.restored();
		instance.bannerBackgroundChanged = (color) => this.bannerBackgroundChanged(color);

		if (this.isConfigured()) {
			this.startAsyncOperation();
		}
	}

	/**
	 * BEGIN Angular lifecycle hooks
	 * See https://angular.io/guide/lifecycle-hooks for documentation
	 */

	ngOnInit() {
		this.log("ngOnInit", "Component is initiated");
	}

	ngAfterViewInit() {
		if (this.isLogEnabled("ngAfterViewInit")) {
			this.log("ngAfterViewInit", "Views and children initiated");
		}
	}

	ngAfterContentInit() {
		if (this.isLogEnabled("ngAfterContentInit")) {
			this.log("ngAfterContentInit", "Projected content initiated");
		}
	}

	ngAfterContentChecked() {
		if (this.isLogEnabled("ngAfterContentChecked")) {
			this.log("ngAfterContentChecked", "Projected content checked");
		}
	}

	ngOnDestroy() {
		if (this.isLogEnabled("ngOnDestroy")) {
			this.log("ngOnDestroy", "Component is about to be destroyed");
		}
	}

	ngDoCheck() {
		if (this.isLogEnabled("ngDoCheck")) {
			this.log("ngDoCheck", "Component is checked for changes");
		}
	}

	ngAfterViewChecked() {
		if (this.isLogEnabled("ngAfterViewChecked")) {
			this.log("ngAfterViewChecked", "Child views are checked for changes");
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		if (this.isLogEnabled("ngOnChanges")) {
			this.log("ngOnChanges", "Changes detected", JSON.stringify(changes));
		}
	}

	/**
	 * END Angular lifecycle hooks
	 */

	/**
	 * BEGIN Widget lifecycle hooks
	 * See DeveloperGuide PDF for documentation-
	 */

	/**
	 * When the widget is activated, start any asynchronous operations,
	 * set up event subscribers etc.
	 */
	activated() {
		this.log("activated", "Widget can start operating");
		this.startAsyncOperation();
	}

	/**
	 * Release any resources that are claimed in 'activated'. Stop timers,
	 * unsubscribe events/Observables etc. Anything.
	 */
	deactivated() {
		this.log("deactivated", "Widget MUST stop operation");
		this.stopAsyncOperation();
	}

	settingsOpening() {
		this.log("settingsOpening", "Settings are opening");
	}

	settingsSaved({ cancel }: IWidgetSettingsArg) {
		if (cancel) {
			this.log("settingsSaved", "Settings were closed (canceled)");
		} else {
			this.log("settingsSaved", "Settings were saved");
		}
	}

	isConfigured(): boolean {
		const configured = this.widgetContext.getSettings().get<boolean>("configured");
		this.log("isConfigured", "Configured: " + configured);
		return configured;
	}

	editing() {
		this.log("editing", "Page is being edited");
	}

	edited() {
		this.log("edited", "Page was edited");
	}

	publishing() {
		this.log("publishing", "Widget is publishing");
	}

	refreshed() {
		this.log("refreshed", "Widget was refreshed");
	}

	restored() {
		this.log("restored", "Widget was restored");
	}

	bannerBackgroundChanged(newColor: string) {
		this.log("bannerBackgroundChanged", "Banner Background Changed to " + newColor);
	}

	/**
	 * END Widget Lifecycle hooks
	 */

	/**
	 * Start an interval to simulate an asynchronous operation.
	 * In a real widget, this could be event handlers, network requests, or anything else
	 * that needs to be stopped when the widget is no longer active.
	 */
	private startAsyncOperation() {
		clearInterval(this.asyncOperationInterval);
		this.asyncOperationInterval = setInterval(() => {
			this.log("interval", `Interval counter is ${++this.counter}`);
		}, 10000);
		this.log("interval", "Started async operation");
	}

	/**
	 * Stop anything that was started by startAsyncOperation
	 */
	private stopAsyncOperation() {
		clearInterval(this.asyncOperationInterval);
		this.log("interval", "Stopped async operation");
	}

	/**
	 * Check whether an event should be logged or not
	 */
	private isLogEnabled(setting: string): boolean {
		return this.widgetContext.getSettings().get<boolean>(setting);
	}

	/**
	 * Write to the event log and to the console.
	 */
	private log(title: string, message: string, details = "") {
		const time = Math.round(performance.now() - this.t0);
		const event: ILoggedEvent = { time, title, message };
		this.events = [...this.events, event];
		Log.debug(`${this.logPrefix} ${event.title} (${event.message}) ${details}`);
	}

	private clearLog() {
		this.events = [];
	}

	private setWidgetActions() {
		this.widgetInstance.actions = [{
			isPrimary: true,
			execute: () => this.clearLog(),
			standardIconName: "#icon-close-cancel",
			text: "Clear log"
		}];
		this.widgetContext.updatePrimaryAction();
	}
}
