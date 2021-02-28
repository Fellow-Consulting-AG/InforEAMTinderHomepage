import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LifecycleComponent } from "./lifecycle.component";

@NgModule({
	imports: [CommonModule],
	declarations: [LifecycleComponent],
	entryComponents: [LifecycleComponent],
})
export class LifecycleModule { }
