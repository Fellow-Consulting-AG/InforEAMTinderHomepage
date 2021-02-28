import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoButtonModule, SohoInputModule, SohoListViewModule, SohoToolbarFlexModule } from "@infor/sohoxi-angular";
import { ILanguage, IWidgetAction, IWidgetComponent, IWidgetContext, IWidgetInstance } from "lime";

export interface IWidgetLanguge extends ILanguage {
	add: string;
	clear: string;
}

@Component({
	template: `
	<div class="card-group-action" *ngIf="notesEnabled">
		<soho-toolbar-flex>
			<soho-toolbar-flex-section [isButtonSet]="true">
				<input class="input-sm" type="text" [(ngModel)]="note">
				<button soho-button="tertiary" [disabled]="!note" (click)="addNote(note)">{{lang.add}}</button>
			</soho-toolbar-flex-section>
		</soho-toolbar-flex>
	</div>
	<soho-listview>
		<li soho-listview-item *ngFor="let note of notes">
			<p soho-listview-header>{{note}}</p>
		</li>
	</soho-listview>`,
	styles: [`
		:host {
			height: 100%;
			display: flex;
			flex-direction: column;
			overflow: hidden;
		}

		soho-listview {
			flex: 1 1 auto;
			overflow-y: auto;
		}

		soho-toolbar-flex-section {
			display: flex;
		}

		input {
			flex: 1 0 auto;
		}
	`]
})
export class QuicknoteComponent implements OnInit, IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;
	note: string;
	notes: string[];
	notesEnabled: boolean;
	lang: IWidgetLanguge;

	ngOnInit() {
		this.lang = this.widgetContext.getLanguage<IWidgetLanguge>();
		this.init();
		this.updateAction();
		this.setCustomTitle();
	}

	addNote(note: string) {
		this.notes = [note, ...this.notes];
		this.widgetInstance.actions[0].isEnabled = this.getIsActionEnabled();
		if (this.notesEnabled) {
			this.widgetContext.save();
		}
		this.note = "";
	}

	clear() {
		this.notes = [];
		this.widgetInstance.actions[0].isEnabled = false;
		this.widgetContext.save();
	}

	private init() {
		const settings = this.widgetContext.getSettings();
		this.notes = settings.get("notes");
		this.notesEnabled = settings.isSettingEnabled("notes");
	}

	private updateAction() {
		const customAction = this.widgetInstance.actions[0];
		customAction.execute = () => this.clear();
		customAction.isEnabled = this.getIsActionEnabled();
		customAction.text = this.lang.get("clear");
	}

	private setCustomTitle() {
		const context = this.widgetContext;
		if (context.isTitleEditEnabled()) {
			context.setTitle("QuickNote");
		}
	}

	private getIsActionEnabled(): boolean {
		return this.notesEnabled && !!this.notes.length;
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, SohoListViewModule, SohoButtonModule, SohoToolbarFlexModule, SohoInputModule],
	declarations: [QuicknoteComponent],
	entryComponents: [QuicknoteComponent]
})
export class QuicknoteModule { }

export const getActions = (): IWidgetAction[] => {
	return [{ isPrimary: true, standardIconName: "#icon-delete" }];
};
