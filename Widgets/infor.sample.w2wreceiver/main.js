var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "lime"], function (require, exports, common_1, core_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W2WReceiverModule = exports.W2WReceiverComponent = void 0;
    var W2WReceiverComponent = /** @class */ (function () {
        function W2WReceiverComponent() {
        }
        W2WReceiverComponent.prototype.ngOnInit = function () {
            var _this = this;
            var widgetContext = this.widgetContext;
            this.language = widgetContext.getLanguage();
            this.pageId = widgetContext.getPageId();
            this.logPrefix = "[" + widgetContext.getId() + "] ";
            // Subscribe to the event that is triggered when settings are saved to be able to update the message type
            this.widgetInstance.settingsSaved = function () {
                _this.updateMessageType();
            };
            // Set initial message type used for communication
            this.updateMessageType();
        };
        W2WReceiverComponent.prototype.registerHandler = function (messageType) {
            var _this = this;
            var callback = function (args) { return _this.handleMessage(args); };
            this.messageSubscription = this.widgetContext.receive(messageType).subscribe(callback);
            this.messageType = messageType;
            lime_1.Log.debug(this.logPrefix + "Message handler registered for message type: " + messageType);
        };
        W2WReceiverComponent.prototype.unregisterHandler = function () {
            if (this.messageSubscription) {
                this.messageSubscription.unsubscribe();
            }
            lime_1.Log.debug(this.logPrefix + "Message handler unregistered");
        };
        W2WReceiverComponent.prototype.updateMessageType = function () {
            var messageType = this.widgetContext.getSettings().get("MessageType");
            var newMessageType = messageType + this.pageId;
            var original = this.messageType;
            if (!lime_1.StringUtil.isNullOrWhitespace(messageType) && newMessageType !== original) {
                this.unregisterHandler();
                this.registerHandler(newMessageType);
            }
        };
        W2WReceiverComponent.prototype.handleMessage = function (person) {
            if (person) {
                this.person = person;
            }
            lime_1.Log.debug(this.logPrefix + "Received message from sender widget: " + JSON.stringify(person));
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], W2WReceiverComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], W2WReceiverComponent.prototype, "widgetInstance", void 0);
        W2WReceiverComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"twelve columns lm-margin-md-t\">\n\t\t<div *ngIf=\"person\">\n\t\t\t<h2 class=\"lm-margin-xl-b\">{{person?.id}} - {{person?.firstName}} {{person?.lastName}}</h2>\n\n\t\t\t<h3>{{language?.title}}</h3>\n\t\t\t<p>{{person?.title}}</p>\n\n\t\t\t<h3 class=\"lm-margin-lg-t\">{{language?.status}}</h3>\n\t\t\t<p>{{person?.status}}</p>\n\n\t\t\t<h3 class=\"lm-margin-lg-t\">{{language?.anniversary}}</h3>\n\t\t\t<p>{{person?.anniversary}}</p>\n\t\t</div>\n\n\t\t<p *ngIf=\"!person\">{{language?.noContent}}</p>\n\t</div>\n\t"
            })
        ], W2WReceiverComponent);
        return W2WReceiverComponent;
    }());
    exports.W2WReceiverComponent = W2WReceiverComponent;
    var W2WReceiverModule = /** @class */ (function () {
        function W2WReceiverModule() {
        }
        W2WReceiverModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule],
                declarations: [W2WReceiverComponent],
                entryComponents: [W2WReceiverComponent]
            })
        ], W2WReceiverModule);
        return W2WReceiverModule;
    }());
    exports.W2WReceiverModule = W2WReceiverModule;
});
//# sourceMappingURL=main.js.map