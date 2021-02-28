/**
 * The purpose of this sample is to give some insight into how and when lifecycle
 * events are fired, and how to react to them. It logs both Angular and Widget
 * lifecycle events. It can be configured in the settings UI to display more verbose
 * events such as Angular change detection.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports", "@angular/core", "lime"], function (require, exports, core_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LifecycleComponent = void 0;
    var LifecycleComponent = /** @class */ (function () {
        function LifecycleComponent(widgetContext, widgetInstance) {
            var _this = this;
            this.widgetContext = widgetContext;
            this.widgetInstance = widgetInstance;
            this.events = [];
            this.logPrefix = "[LifecycleComponent]";
            this.counter = 0;
            this.t0 = performance.now();
            this.log("constructor", "Start of time");
            this.setWidgetActions();
            /**
             * Bind Widget Instance event handlers to this object.
             * For better argument type-safety, you can:
             * 	this.widgetInstance.foo = (args: Bar) => this.foo(args);
             */
            var instance = this.widgetInstance;
            instance.activated = function () { return _this.activated(); };
            instance.deactivated = function () { return _this.deactivated(); };
            instance.isConfigured = function () { return _this.isConfigured(); };
            instance.settingsOpening = function () { return _this.settingsOpening(); };
            instance.settingsSaved = function (arg) { return _this.settingsSaved(arg); };
            instance.editing = function () { return _this.editing(); };
            instance.edited = function () { return _this.edited(); };
            instance.publishing = function () { return _this.publishing(); };
            instance.refreshed = function () { return _this.refreshed(); };
            instance.restored = function () { return _this.restored(); };
            instance.bannerBackgroundChanged = function (color) { return _this.bannerBackgroundChanged(color); };
            if (this.isConfigured()) {
                this.startAsyncOperation();
            }
        }
        /**
         * BEGIN Angular lifecycle hooks
         * See https://angular.io/guide/lifecycle-hooks for documentation
         */
        LifecycleComponent.prototype.ngOnInit = function () {
            this.log("ngOnInit", "Component is initiated");
        };
        LifecycleComponent.prototype.ngAfterViewInit = function () {
            if (this.isLogEnabled("ngAfterViewInit")) {
                this.log("ngAfterViewInit", "Views and children initiated");
            }
        };
        LifecycleComponent.prototype.ngAfterContentInit = function () {
            if (this.isLogEnabled("ngAfterContentInit")) {
                this.log("ngAfterContentInit", "Projected content initiated");
            }
        };
        LifecycleComponent.prototype.ngAfterContentChecked = function () {
            if (this.isLogEnabled("ngAfterContentChecked")) {
                this.log("ngAfterContentChecked", "Projected content checked");
            }
        };
        LifecycleComponent.prototype.ngOnDestroy = function () {
            if (this.isLogEnabled("ngOnDestroy")) {
                this.log("ngOnDestroy", "Component is about to be destroyed");
            }
        };
        LifecycleComponent.prototype.ngDoCheck = function () {
            if (this.isLogEnabled("ngDoCheck")) {
                this.log("ngDoCheck", "Component is checked for changes");
            }
        };
        LifecycleComponent.prototype.ngAfterViewChecked = function () {
            if (this.isLogEnabled("ngAfterViewChecked")) {
                this.log("ngAfterViewChecked", "Child views are checked for changes");
            }
        };
        LifecycleComponent.prototype.ngOnChanges = function (changes) {
            if (this.isLogEnabled("ngOnChanges")) {
                this.log("ngOnChanges", "Changes detected", JSON.stringify(changes));
            }
        };
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
        LifecycleComponent.prototype.activated = function () {
            this.log("activated", "Widget can start operating");
            this.startAsyncOperation();
        };
        /**
         * Release any resources that are claimed in 'activated'. Stop timers,
         * unsubscribe events/Observables etc. Anything.
         */
        LifecycleComponent.prototype.deactivated = function () {
            this.log("deactivated", "Widget MUST stop operation");
            this.stopAsyncOperation();
        };
        LifecycleComponent.prototype.settingsOpening = function () {
            this.log("settingsOpening", "Settings are opening");
        };
        LifecycleComponent.prototype.settingsSaved = function (_a) {
            var cancel = _a.cancel;
            if (cancel) {
                this.log("settingsSaved", "Settings were closed (canceled)");
            }
            else {
                this.log("settingsSaved", "Settings were saved");
            }
        };
        LifecycleComponent.prototype.isConfigured = function () {
            var configured = this.widgetContext.getSettings().get("configured");
            this.log("isConfigured", "Configured: " + configured);
            return configured;
        };
        LifecycleComponent.prototype.editing = function () {
            this.log("editing", "Page is being edited");
        };
        LifecycleComponent.prototype.edited = function () {
            this.log("edited", "Page was edited");
        };
        LifecycleComponent.prototype.publishing = function () {
            this.log("publishing", "Widget is publishing");
        };
        LifecycleComponent.prototype.refreshed = function () {
            this.log("refreshed", "Widget was refreshed");
        };
        LifecycleComponent.prototype.restored = function () {
            this.log("restored", "Widget was restored");
        };
        LifecycleComponent.prototype.bannerBackgroundChanged = function (newColor) {
            this.log("bannerBackgroundChanged", "Banner Background Changed to " + newColor);
        };
        /**
         * END Widget Lifecycle hooks
         */
        /**
         * Start an interval to simulate an asynchronous operation.
         * In a real widget, this could be event handlers, network requests, or anything else
         * that needs to be stopped when the widget is no longer active.
         */
        LifecycleComponent.prototype.startAsyncOperation = function () {
            var _this = this;
            clearInterval(this.asyncOperationInterval);
            this.asyncOperationInterval = setInterval(function () {
                _this.log("interval", "Interval counter is " + ++_this.counter);
            }, 10000);
            this.log("interval", "Started async operation");
        };
        /**
         * Stop anything that was started by startAsyncOperation
         */
        LifecycleComponent.prototype.stopAsyncOperation = function () {
            clearInterval(this.asyncOperationInterval);
            this.log("interval", "Stopped async operation");
        };
        /**
         * Check whether an event should be logged or not
         */
        LifecycleComponent.prototype.isLogEnabled = function (setting) {
            return this.widgetContext.getSettings().get(setting);
        };
        /**
         * Write to the event log and to the console.
         */
        LifecycleComponent.prototype.log = function (title, message, details) {
            if (details === void 0) { details = ""; }
            var time = Math.round(performance.now() - this.t0);
            var event = { time: time, title: title, message: message };
            this.events = __spreadArrays(this.events, [event]);
            lime_1.Log.debug(this.logPrefix + " " + event.title + " (" + event.message + ") " + details);
        };
        LifecycleComponent.prototype.clearLog = function () {
            this.events = [];
        };
        LifecycleComponent.prototype.setWidgetActions = function () {
            var _this = this;
            this.widgetInstance.actions = [{
                    isPrimary: true,
                    execute: function () { return _this.clearLog(); },
                    standardIconName: "#icon-close-cancel",
                    text: "Clear log"
                }];
            this.widgetContext.updatePrimaryAction();
        };
        LifecycleComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<ul class=\"lm-padding-sm\">\n\t\t\t<li *ngFor=\"let event of events\">\n\t\t\t\t<span class=\"time\">T+{{event.time}}ms</span>\n\t\t\t\t<span class=\"title\">[{{event.title}}]</span>\n\t\t\t\t<span class=\"message\">{{event.message}}</span>\n\t\t\t</li>\n\t\t</ul>\n\t",
                styles: ["\n\t\tli {\n\t\t\tdisplay: flex;\n\t\t\tfont-size: small;\n\t\t\tmin-height: 20px;\n\t\t\tmargin: 2px 0 2px 0;\n\t\t}\n\t\t.time {\n\t\t\tflex: 0 0 85px;\n\t\t}\n\t\t.title {\n\t\t\tflex: 0 2 100px;\n\t\t\tpadding: 0 2px 0 2px;\n\t\t}\n\t\t.message {\n\t\t\tflex: 1;\n\t\t}\n\t"],
            })
            // tslint:disable-next-line:max-line-length
            ,
            __param(0, core_1.Inject(lime_1.widgetContextInjectionToken)),
            __param(1, core_1.Inject(lime_1.widgetInstanceInjectionToken)),
            __metadata("design:paramtypes", [lime_1.IWidgetContext,
                lime_1.IWidgetInstance])
        ], LifecycleComponent);
        return LifecycleComponent;
    }());
    exports.LifecycleComponent = LifecycleComponent;
});
//# sourceMappingURL=lifecycle.component.js.map