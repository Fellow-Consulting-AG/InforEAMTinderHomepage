import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SohoButtonModule, SohoTooltipModule } from "@infor/sohoxi-angular";
import { CounterComponent } from "./components/counter.component";
import { DialogComponent } from "./components/dialog.component";
import { GlobalCounterComponent } from "./components/global-counter.component";
import { LocalCounterComponent } from "./components/local-counter.component";
import { SharedCounterComponent } from "./components/shared-counter.component";
import { WidgetComponent } from "./components/widget.component";

@NgModule({
	imports: [
		CommonModule,
		SohoButtonModule,
		SohoTooltipModule,
	],
	declarations: [
		WidgetComponent,
		CounterComponent,
		GlobalCounterComponent,
		LocalCounterComponent,
		SharedCounterComponent,
		DialogComponent,
	],
	entryComponents: [
		WidgetComponent,
		DialogComponent,
	],
})
export class WidgetModule { }
