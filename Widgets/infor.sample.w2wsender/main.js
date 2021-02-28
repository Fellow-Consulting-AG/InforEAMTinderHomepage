var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.W2WSenderModule = exports.W2WSenderComponent = void 0;
    // Mock data
    var persons = [
        {
            id: 1,
            lastName: "Asper",
            firstName: "David",
            title: "Engineer",
            status: "Fulltime employee",
            anniversary: "2015-01-12"
        },
        {
            id: 2,
            lastName: "Baxter",
            firstName: "Michael",
            title: "System Architect",
            status: "Freelance 3-6months",
            anniversary: "2008-05-27"
        },
        {
            id: 3,
            lastName: "John",
            firstName: "Steven",
            title: "Graphic Designer",
            status: "Fulltime employee",
            anniversary: "2001-02-17"
        },
        {
            id: 4,
            lastName: "Donald",
            firstName: "Samual",
            title: "System Architect",
            status: "Fulltime employee",
            anniversary: "1989-11-05"
        },
        {
            id: 5,
            lastName: "Bronte",
            firstName: "Emily",
            title: "Quality Assurance Analyst",
            status: "Fulltime employee",
            anniversary: "2010-09-21"
        },
        {
            id: 6,
            lastName: "Davendar",
            firstName: "Konda",
            title: "Engineer",
            status: "Fulltime employee",
            anniversary: "2003-12-05"
        },
        {
            id: 7,
            lastName: "Little",
            firstName: "Jeremy",
            title: "Quality Assurance Analyst",
            status: "Fulltime employee",
            anniversary: "1999-01-13"
        },
        {
            id: 8,
            lastName: "Ayers",
            firstName: "Julie",
            title: "Architect",
            status: "Freelance 3-6months",
            anniversary: "2012-06-17"
        },
        {
            id: 9,
            lastName: "Ortega",
            firstName: "Hector",
            title: "Senior Architect",
            status: "Freelance 3-6months",
            anniversary: "2013-07-01"
        },
        {
            id: 10,
            lastName: "McConnel",
            firstName: "Mary",
            title: "Engineer",
            status: "Freelance 3-6months",
            anniversary: "2013-07-01"
        }
    ];
    var W2WSenderComponent = /** @class */ (function () {
        function W2WSenderComponent() {
        }
        W2WSenderComponent.prototype.ngOnInit = function () {
            var _this = this;
            var widgetContext = this.widgetContext;
            this.pageId = widgetContext.getPageId();
            this.logPrefix = "[" + widgetContext.getId() + "] ";
            // Subscribe to the event that is triggered when settings are saved to be able to update the message type
            this.widgetInstance.settingsSaved = function () {
                _this.updateMessageType();
            };
            // Set initial message type used for communication
            this.updateMessageType();
            this.persons = persons;
        };
        W2WSenderComponent.prototype.sendMessage = function (person) {
            if (person) {
                this.widgetContext.send(this.messageType, person);
                lime_1.Log.debug(this.logPrefix + "Message sent for message type: " + this.messageType);
            }
        };
        W2WSenderComponent.prototype.updateMessageType = function () {
            var messageType = this.widgetContext.getSettings().getString("MessageType");
            var newMessageType = messageType + this.pageId;
            if (!lime_1.StringUtil.isNullOrWhitespace(messageType) && newMessageType !== this.messageType) {
                this.messageType = newMessageType;
                lime_1.Log.debug(this.logPrefix + "Message type updated to: " + newMessageType);
            }
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], W2WSenderComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], W2WSenderComponent.prototype, "widgetInstance", void 0);
        W2WSenderComponent = __decorate([
            core_1.Component({
                template: "\n\t<soho-listview [selectable]=\"true\">\n\t\t<li soho-listview-item *ngFor=\"let person of persons\" (click)=\"sendMessage(person)\" aria-setsize=\"13\">\n\t\t\t<p soho-listview-header>{{person.id}} - {{person.firstName}} {{person.lastName}}</p>\n\t\t\t<p soho-listview-subheader>{{person.title}}</p>\n\t\t</li>\n\t</soho-listview>"
            })
        ], W2WSenderComponent);
        return W2WSenderComponent;
    }());
    exports.W2WSenderComponent = W2WSenderComponent;
    var W2WSenderModule = /** @class */ (function () {
        function W2WSenderModule() {
        }
        W2WSenderModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule],
                declarations: [W2WSenderComponent],
                entryComponents: [W2WSenderComponent]
            })
        ], W2WSenderModule);
        return W2WSenderModule;
    }());
    exports.W2WSenderModule = W2WSenderModule;
});
//# sourceMappingURL=main.js.map