import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SohoButtonModule } from "@infor/sohoxi-angular";
import { DynamicOneComponent } from "./dynamic-one.component";
import { DynamicTwoComponent } from "./dynamic-two.component";
import { WidgetComponent } from "./widget.component";

@NgModule({
	declarations: [
		WidgetComponent,
		DynamicOneComponent,
		DynamicTwoComponent,
	],
	imports: [
		CommonModule,
		SohoButtonModule,
	],
	entryComponents: [
		WidgetComponent,
		DynamicOneComponent,
		DynamicTwoComponent,
	],
})
export class WidgetModule { }
