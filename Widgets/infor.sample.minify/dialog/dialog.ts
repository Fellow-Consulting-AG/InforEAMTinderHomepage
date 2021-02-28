import { Component, OnInit } from "@angular/core";
import { SohoModalDialogRef } from "@infor/sohoxi-angular";

export interface IMyDialogParameters {
	topIcon: string;
	middleIcon: string;
	bottomIcon: string;
}

@Component({
	template: `
	<div>
		<div class="lm-text-align-c">
		<button soho-button="icon" icon="minimize" toggle="maximize" (click)="toggleClass()"></button>
			{{buttonMessage}}
		</div>
		<div class="infor-sample-minify-widget-dialog-max-width">
			<img class="merge" src="{{topIcon}}" [ngClass]="{'show': show}" />
			<img class="merge" src="{{middleIcon}}" [ngClass]="{'show': show}" />
			<img class="merge" src="{{bottomIcon}}" [ngClass]="{'show': show}" />
		</div>
		<div class="modal-buttonset">
			<button class="btn-modal" (click)="onClose()">Close</button>
		</div>
	</div>
	`,
	styles: [
		`
	.infor-sample-minify-widget-dialog-max-width{max-width:400px;min-height:240px;}
	`
	]
})
export class MyDialogComponent implements OnInit {
	dialog: SohoModalDialogRef<MyDialogComponent>;
	parameters: IMyDialogParameters;

	topIcon: string;
	middleIcon: string;
	bottomIcon: string;
	buttonMessage: string;
	show: boolean;

	constructor() {
		this.buttonMessage = "Divide images";
		this.show = true;
	}

	ngOnInit(): void {
		this.topIcon = this.parameters.topIcon;
		this.middleIcon = this.parameters.middleIcon;
		this.bottomIcon = this.parameters.bottomIcon;
	}

	toggleClass(): void {
		if (this.show) {
			this.show = false;
			this.buttonMessage = "Combine images";
		} else {
			this.show = true;
			this.buttonMessage = "Divide images";
		}
	}

	onClose(): void {
		this.dialog.close({
			value: "someResult"
		});
	}
}
