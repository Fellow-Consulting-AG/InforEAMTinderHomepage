import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, NgModule } from "@angular/core";
import { IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSize } from "lime";
import { Observable } from "rxjs";
import { styles } from "./styles";

@Component({
	template:
		`<div *ngIf="size$ | async as size" [class.stacked]="size.cols < 3">
			<h1 [class.red]="size.cols === 1"
				 [class.blue]="size.cols === 2"
				 [class.orange]="size.cols === 3"
				 [class.green]="size.cols === 4">
				{{size.cols}} x {{size.rows}}
			</h1>
			<p>{{infoMsg}}</p>
		</div>
		`,
	styles: styles,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WidgetSizeComponent implements IWidgetComponent {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	size$: Observable<IWidgetSize>;
	infoMsg: string;

	ngOnInit() {
		this.size$ = this.widgetContext.getSize();
		this.infoMsg = this.widgetContext.getLanguage().get("infoMsg");
	}
}

@NgModule({
	imports: [CommonModule],
	declarations: [WidgetSizeComponent],
	entryComponents: [WidgetSizeComponent]
})
export class WidgetSizeModule { }
