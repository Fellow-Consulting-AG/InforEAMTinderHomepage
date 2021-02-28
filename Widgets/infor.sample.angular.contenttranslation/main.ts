import { CommonModule } from "@angular/common";
import { Component, Inject, NgModule, ViewChild, ViewContainerRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoButtonModule, SohoInputValidateModule, SohoListViewModule, SohoModalDialogService } from "@infor/sohoxi-angular";
import { ArrayUtil, CommonUtil, IWidgetContext, IWidgetInstance, TranslationService, widgetContextInjectionToken, widgetInstanceInjectionToken } from "lime";
import { ListItem } from "./core";
import { EditItemComponent } from "./item-dialog";
import { IManifestLanguage } from "./manifest-types";

@Component({
	template: `
	<div #contentTranslationView>
		<soho-listview>
			<li soho-listview-item *ngFor="let item of items">
				<p soho-listview-header>{{getTitle(item)}}
					<button class="lm-pull-right" soho-button="icon" icon="delete" (click)="onDelete(item)"></button>
					<button class="lm-pull-right" soho-button="icon" icon="edit" (click)="onEdit(item)"></button>
				</p>
				<p soho-listview-subheader>{{getDescription(item)}}</p>
			</li>
		</soho-listview>
	</div>`
})
export class ContentTranslationComponent {
	@ViewChild("contentTranslationView", { read: ViewContainerRef, static: true }) view: ViewContainerRef;

	items: ListItem[] = [];
	lang: IManifestLanguage;

	private itemKey = "items";
	private readonly languageCode: string;

	constructor(
		@Inject(widgetContextInjectionToken) private readonly widgetContext: IWidgetContext,
		@Inject(widgetInstanceInjectionToken) private readonly widgetInstance: IWidgetInstance,
		private readonly sohoModalDialogService: SohoModalDialogService,
		private readonly translationService: TranslationService) {

		this.lang = widgetContext.getLanguage<IManifestLanguage>();
		this.languageCode = translationService.getLanguage();
		this.items = widgetContext.getSettings().get<ListItem[]>(this.itemKey) || [];

		const lang = widgetContext.getLanguage();

		widgetInstance.actions = [{
			text: lang.get("add"),
			isPrimary: true,
			standardIconName: "#icon-add",
			execute: () => { this.onAdd(); }
		}];
	}

	getTitle(item: ListItem): string {
		return this.getItem(item).title;
	}

	getDescription(item: ListItem): string {
		return this.getItem(item).description;
	}

	onDelete(item: ListItem): void {
		ArrayUtil.remove(this.items, item);
		this.save();
	}

	onEdit(item: ListItem): void {
		this.openDialog(item);
	}

	private onAdd(): void {
		this.openDialog();
	}

	private getItem(item: ListItem): ListItem {
		const translationItem = item.translations ? item.translations[this.languageCode] : null;
		return translationItem || item;
	}

	private addItem(item: ListItem): void {
		this.items.push(item);
		this.save();
	}

	private updateItem(item: ListItem, index: number): void {
		this.items[index] = item;
		this.save();
	}

	private save(): void {
		this.widgetContext.getSettings().set(this.itemKey, this.items);
		this.widgetContext.save();
	}

	private openDialog(item?: ListItem): void {
		const isAdd = !item;
		let existingIndex: number;
		if (isAdd) {
			item = {};
		} else {
			existingIndex = ArrayUtil.indexOf(this.items, item);
			item = CommonUtil.copyJson(item);
		}

		const lang = this.lang;
		const dialog = this.sohoModalDialogService
			.modal(EditItemComponent, this.view)
			.title(lang.get("editItem"))
			.afterClose((editItem: ListItem) => {
				if (editItem) {
					if (isAdd) {
						this.addItem(editItem);
					} else {
						this.updateItem(editItem, existingIndex);
					}
				}
			});

		dialog.apply((component) => {
			component.dialog = dialog;
			component.parameter = {
				item: item,
				lang: lang
			};
		}).open();
	}
}

@NgModule({
	imports: [CommonModule, FormsModule, SohoListViewModule, SohoButtonModule, SohoInputValidateModule],
	declarations: [ContentTranslationComponent, EditItemComponent],
	entryComponents: [ContentTranslationComponent, EditItemComponent]
})
export class ContentTranslationModule { }
