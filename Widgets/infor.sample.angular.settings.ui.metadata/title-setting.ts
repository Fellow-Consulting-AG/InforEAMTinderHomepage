import { Component, Input, OnInit } from "@angular/core";
import { IWidgetSettingsContext2 } from "lime";

/**
 * This component can be used to display a Title setting field with a padlock.
 * It works with the given (required) widgetSettingContext to determine whether title should
 * be locked, unlocked, editable, unlockable etc.
 *
 * Call save() to commit the changes to the widget settings.
 */
@Component({
	selector: "infor-sample-setting-title-field",
	template: `
	<div class="field">
		<label *ngIf="label">{{label}}</label>
		<input [readOnly]="!isTitleEditEnabled || isTitleLocked" [(ngModel)]="title" />
		<button
			soho-button="icon"
			[icon]="lockIcon"
			[disabled]="!isTitleUnlockable"
			(click)="onLockClicked()">
		</button>
	</div>
	`,
})
export class TitleSettingComponent implements OnInit {
	@Input() widgetSettingsContext: IWidgetSettingsContext2;
	@Input() label: string;

	title: string;
	isTitleEditEnabled: boolean;
	isTitleUnlockable: boolean;
	isTitleLocked: boolean;

	ngOnInit(): void {
		if (!this.widgetSettingsContext) {
			throw new Error("Required input: widgetSettingsContext");
		}

		const widgetContext = this.widgetSettingsContext.getWidgetContext();
		this.isTitleEditEnabled = widgetContext.isTitleEditEnabled();
		this.isTitleLocked = widgetContext.isTitleLocked();
		this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
		this.isTitleUnlockable = widgetContext.isTitleUnlockable();
	}

	get lockIcon(): string {
		return this.isTitleLocked ? "locked" : "unlocked";
	}

	/**
	 * Persist changes to the title and lock by saving to widget context.
	 */
	save(): void {
		const widgetContext = this.widgetSettingsContext.getWidgetContext();
		widgetContext.setTitleLocked(this.isTitleLocked);
		if (this.isTitleEditEnabled) {
			widgetContext.setTitle(this.title);
		}
	}

	onLockClicked(): void {
		this.isTitleLocked = !!!this.isTitleLocked;
		if (this.isTitleLocked) {
			const widgetContext = this.widgetSettingsContext.getWidgetContext();
			this.title = widgetContext.getResolvedTitle(this.isTitleLocked);
		}
	}
}
