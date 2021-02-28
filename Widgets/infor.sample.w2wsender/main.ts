import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { SohoListViewModule } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, Log, StringUtil } from "lime";

interface IPerson {
	id: number;
	lastName: string;
	firstName: string;
	title: string;
	status: string;
	anniversary: string;
}

// Mock data
const persons: IPerson[] = [
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

@Component({
	template: `
	<soho-listview [selectable]="true">
		<li soho-listview-item *ngFor="let person of persons" (click)="sendMessage(person)" aria-setsize="13">
			<p soho-listview-header>{{person.id}} - {{person.firstName}} {{person.lastName}}</p>
			<p soho-listview-subheader>{{person.title}}</p>
		</li>
	</soho-listview>`
})
export class W2WSenderComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	persons: IPerson[];

	private pageId: string;
	private messageType: string;
	private logPrefix: string;

	ngOnInit(): void {
		const widgetContext = this.widgetContext;
		this.pageId = widgetContext.getPageId();
		this.logPrefix = `[${widgetContext.getId()}] `;

		// Subscribe to the event that is triggered when settings are saved to be able to update the message type
		this.widgetInstance.settingsSaved = () => {
			this.updateMessageType();
		};

		// Set initial message type used for communication
		this.updateMessageType();

		this.persons = persons;
	}

	sendMessage(person: IPerson): void {
		if (person) {
			this.widgetContext.send(this.messageType, person);

			Log.debug(this.logPrefix + "Message sent for message type: " + this.messageType);
		}
	}

	private updateMessageType(): void {
		const messageType = this.widgetContext.getSettings().getString("MessageType");
		const newMessageType = messageType + this.pageId;
		if (!StringUtil.isNullOrWhitespace(messageType) && newMessageType !== this.messageType) {
			this.messageType = newMessageType;

			Log.debug(this.logPrefix + "Message type updated to: " + newMessageType);
		}
	}
}

@NgModule({
	imports: [CommonModule, SohoListViewModule],
	declarations: [W2WSenderComponent],
	entryComponents: [W2WSenderComponent]
})
export class W2WSenderModule { }
