import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, NgModule, OnInit } from "@angular/core";
import { SohoListViewModule, SohoMenuButtonModule, SohoPopupMenuModule, SohoToolbarFlexModule } from "@infor/sohoxi-angular";
import { IWidgetComponent, IWidgetContext, IWidgetInstance } from "lime";
import { Category, ICardItem, mockData } from "./core";
import { CategoryFilterPipe } from "./pipes";

@Component({
	template: `
		<div class="card-group-action">
			<soho-toolbar-flex>
				<soho-toolbar-flex-section [isTitle]="true"></soho-toolbar-flex-section>
				<soho-toolbar-flex-section [isButtonSet]="true">
					<button soho-menu-button
							  icon="filter"
							  menu="filtermenu">
						<span>{{selectedCategory}}</span>
					</button>
					<ul soho-popupmenu
						 id="filtermenu">
						<li soho-popupmenu-item
							 *ngFor="let category of categories"
							 (click)="setCategory(category)">
							<a soho-popupmenu-label>{{category}}</a>
						</li>
					</ul>
				</soho-toolbar-flex-section>
			</soho-toolbar-flex>
		</div>
		<soho-listview>
			<li soho-listview-item
				 *ngFor="let item of items | filterBy: selectedCategory">
				<p soho-listview-header>{{item.title}}</p>
				<p soho-listview-subheader>{{item.description}}</p>
			</li>
		</soho-listview>
	`,
	styles: [`
		:host {
			height: 100%;
			width: 100%;
			overflow: hidden;
			display: flex;
			flex-direction: column;
		}

		.card-group-action {
			flex: 0 0 auto;
		}

		soho-listview {
			overflow: auto;
			flex: 1 1 auto;
		}
	`],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardGroupActionComponent implements OnInit, IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	items: ICardItem[] = [];
	categories = [Category.All, Category.Customer, Category.Warehouse];
	selectedCategory = Category.All;

	ngOnInit() {
		this.items = mockData;
	}

	setCategory(category: Category) {
		this.selectedCategory = category;
	}
}

@NgModule({
	imports: [CommonModule, SohoListViewModule, SohoMenuButtonModule, SohoPopupMenuModule, SohoToolbarFlexModule],
	declarations: [CardGroupActionComponent, CategoryFilterPipe],
	entryComponents: [CardGroupActionComponent]
})
export class CardGroupActionModule { }
