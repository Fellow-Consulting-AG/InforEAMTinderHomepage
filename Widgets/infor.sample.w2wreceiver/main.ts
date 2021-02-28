import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { ILanguage, IWidgetComponent, IWidgetContext, IWidgetInstance, Log, StringUtil } from "lime";
import { Subscription } from "rxjs";

interface IPerson {
	id: number;
	lastName: string;
	firstName: string;
	title: string;
	status: string;
	anniversary: string;
}

interface IMyLanguage extends ILanguage {
	title?: string;
	status?: string;
	anniversary?: string;
	noContent?: string;
}

@Component({
	template: `
	<div class="twelve columns lm-margin-md-t">
		<div *ngIf="person">
			<h2 class="lm-margin-xl-b">{{person?.id}} - {{person?.firstName}} {{person?.lastName}}</h2>

			<h3>{{language?.title}}</h3>
			<p>{{person?.title}}</p>

			<h3 class="lm-margin-lg-t">{{language?.status}}</h3>
			<p>{{person?.status}}</p>

			<h3 class="lm-margin-lg-t">{{language?.anniversary}}</h3>
			<p>{{person?.anniversary}}</p>
		</div>

		<p *ngIf="!person">{{language?.noContent}}</p>
	</div>
	`
})
export class W2WReceiverComponent implements OnInit, IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	person: IPerson;
	language: IMyLanguage;

	private pageId: string;
	private messageType: string;
	private logPrefix: string;
	private messageSubscription?: Subscription;

	ngOnInit(): void {
		const widgetContext = this.widgetContext;
		this.language = widgetContext.getLanguage();
		this.pageId = widgetContext.getPageId();
		this.logPrefix = `[${widgetContext.getId()}] `;

		// Subscribe to the event that is triggered when settings are saved to be able to update the message type
		this.widgetInstance.settingsSaved = () => {
			this.updateMessageType();
		};

		// Set initial message type used for communication
		this.updateMessageType();
	}

	private registerHandler(messageType: string): void {
		const callback = (args: IPerson) => this.handleMessage(args);
		this.messageSubscription = this.widgetContext.receive(messageType).subscribe(callback);
		this.messageType = messageType;

		Log.debug(this.logPrefix + "Message handler registered for message type: " + messageType);
	}

	private unregisterHandler(): void {
		if (this.messageSubscription) {
			this.messageSubscription.unsubscribe();
		}

		Log.debug(this.logPrefix + "Message handler unregistered");
	}

	private updateMessageType(): void {
		const messageType = this.widgetContext.getSettings().get<string>("MessageType");
		const newMessageType = messageType + this.pageId;
		const original = this.messageType;
		if (!StringUtil.isNullOrWhitespace(messageType) && newMessageType !== original) {
			this.unregisterHandler();
			this.registerHandler(newMessageType);
		}
	}

	private handleMessage(person: IPerson): void {
		if (person) {
			this.person = person;
		}

		Log.debug(this.logPrefix + "Received message from sender widget: " + JSON.stringify(person));
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [W2WReceiverComponent],
	entryComponents: [W2WReceiverComponent]
})
export class W2WReceiverModule { }
