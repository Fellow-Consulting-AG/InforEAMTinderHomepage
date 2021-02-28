import { Component, ComponentFactoryResolver, ComponentRef, Type, ViewChild, ViewContainerRef } from "@angular/core";
import { DynamicOneComponent } from "./dynamic-one.component";
import { DynamicTwoComponent } from "./dynamic-two.component";

@Component({
	template: `
		<button soho-button="primary" (click)="loadOne()">Load One</button>
		<button soho-button="primary" (click)="loadTwo()">Load Two</button>
		<ng-container #dynamicHost></ng-container>
	`,
})
export class WidgetComponent {
	@ViewChild("dynamicHost", { read: ViewContainerRef }) dynamicHost: ViewContainerRef;

	constructor(private resolver: ComponentFactoryResolver) { }

	loadOne() {
		this.load(DynamicOneComponent);
	}

	loadTwo() {
		this.load(DynamicTwoComponent);
	}

	private load<T>(component: Type<T>): ComponentRef<T> {
		const factory = this.resolver.resolveComponentFactory(component);
		this.dynamicHost.clear();
		const ref = this.dynamicHost.createComponent(factory);
		return ref;
	}
}
