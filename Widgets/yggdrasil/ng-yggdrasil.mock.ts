import { Directive, Injectable, InjectionToken, NgModule } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class YgClientService { }

@Injectable({
	providedIn: "root",
})
export class YgApplicationTrackerContext {
	getTracker(): Promise<never> {
		return new Promise(() => { });
	}
}

@Injectable({
	providedIn: "root",
})
export class YgViewTrackerContext {
	getTracker(): Promise<never> {
		return new Promise(() => { });
	}
}

export const TRACKING_CLIENT = new InjectionToken("TRACKING_CLIENT");

@Directive({
	selector: "ygTrackApp",
	inputs: [
		"ygTrackApp",
		"ygAppId",
		"ygAttributes",
	]
})
export class YgTrackAppDirective {
	ngAfterViewInit() { }
	ngOnDestroy() { }
}

@Directive({
	selector: "ygTrackView",
	inputs: [
		"ygTrackView",
		"ygAttributes",
	]
})
export class YgTrackViewDirective {
	ngAfterViewInit() { }
	ngOnDestroy() { }
}

@Directive({
	selector: "ygTrackClick",
	inputs: [
		"ygTrackClick",
		"ygAttributes",
	]
})
export class YgTrackClickDirective { }

@Directive({
	selector: "ygTrackContent",
	inputs: [
		"ygTrackContent",
		"ygAttributes",
	]
})
export class YgTrackContentDirective { }

@Directive({
	selector: "ygTrackField",
	inputs: [
		"ygTrackField",
		"ygAttributes",
	]
})
export class YgTrackFieldDirective {
	ngAfterViewInit() { }
	ngOnDestroy() { }
}

@NgModule({
	declarations: [
		YgTrackAppDirective,
		YgTrackViewDirective,
		YgTrackClickDirective,
		YgTrackContentDirective,
		YgTrackFieldDirective,
	],
	exports: [
		YgTrackAppDirective,
		YgTrackViewDirective,
		YgTrackClickDirective,
		YgTrackContentDirective,
		YgTrackFieldDirective,
	]
})
export class NgYggdrasilModule { }
