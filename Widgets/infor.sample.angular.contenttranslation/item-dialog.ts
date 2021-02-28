
import { Component, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { SohoModalDialogRef } from "@infor/sohoxi-angular";
import { ITranslationResult, TranslationService } from "lime";
import { IEditItemParameter, IListItemMap, ListItem } from "./core";
import { IManifestLanguage } from "./manifest-types";

@Component({
	template: `
	<div #editItemView style="max-width: 390px">
		<div>
			<div class="field">
				<label class="required" for="sample-ct-edt-ttl">{{lang.title}}</label>
				<input id="sample-ct-edt-ttl" name="sample-ct-edt-ttl" type="text"
				[(ngModel)]="item.title"
				[maxlength]="maxTitle"
				data-validate="required" />
			</div>

			<div class="field">
				<label class="required" for="sample-ct-edt-desc">{{lang.description}}</label>
				<input id="sample-ct-edt-desc" type="text"
				[(ngModel)]="item.description"
				[maxlength]="maxDescription"
				data-validate="required" />
			</div>
		</div>

		<div *ngIf="isTranslation" class="field">
			<button class="btn-secondary" (click)="onTranslations()">{{lang.translations}}</button>
		</div>

		<div class="modal-buttonset">
			<button class="btn-modal" (click)="onClose()">{{lang.cancel}}</button>
			<button class="btn-modal-primary no-validation" [disabled]="!canSave()" (click)="onSave()">
				{{lang.save}}
			</button>
		</div>
	</div>`
})
export class EditItemComponent implements OnInit {
	@ViewChild("editItemView", { read: ViewContainerRef, static: true }) view: ViewContainerRef;

	dialog: SohoModalDialogRef<EditItemComponent>;
	parameter: IEditItemParameter;
	// tslint:disable-next-line:no-any
	lang: IManifestLanguage;
	item: ListItem = {};
	isTranslation: boolean;

	readonly maxTitle = 40;
	readonly maxDescription = 100;

	constructor(
		private readonly translationService: TranslationService) {
		this.isTranslation = translationService.isEnabled();
	}

	ngOnInit() {
		this.item = this.parameter.item;
		this.lang = this.parameter.lang;
	}

	onClose(): void {
		this.dialog.close();
	}

	onSave(): void {
		this.dialog.close(this.item);
	}

	canSave(): boolean {
		const item = this.item;
		return !!item.title && !!item.description;
	}

	onTranslations(): void {
		const item = this.item;
		const options = {
			view: this.view,
			data: item.translations || {},
			items: [
				{
					name: "title",
					label: this.lang.name,
					labelId: "sample-ct-tr-ttl-lbl",
					valueId: "sample-ct-tr-ttl-v",
					maxLength: this.maxTitle,
					isPrimary: true,
					defaultValue: item.title
				}, {
					name: "description",
					label: this.lang.description,
					labelId: "sample-ct-tr-desc-lbl",
					valueId: "sample-ct-tr-desc-v",
					maxLength: this.maxDescription,
					defaultValue: item.description
				}
			]
		};

		this.translationService.translate(options).subscribe((result: ITranslationResult) => {
			item.translations = result.data as IListItemMap;
		}, cancelResult => {
			// Handle cancel
		});
	}
}
