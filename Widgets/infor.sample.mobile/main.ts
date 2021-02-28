import { CommonModule } from "@angular/common";
import { Component, Input, NgModule, NgZone, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SohoAccordionModule, SohoButtonModule, SohoLabelModule, SohoRadioButtonModule } from "@infor/sohoxi-angular";
import { IDevice, IGetNetworkResult, IGetSensorsResult, IMapCoordinates, IMediaSource, IWidgetComponent, IWidgetContext, IWidgetInstance, WidgetMessageType } from "lime";
import { forkJoin, Observable, of, Subject } from "rxjs";
import { map, scan, switchMap } from "rxjs/operators";
import { DOCS_TEST_BASE64, PDF_TEST_BASE64 } from "./base64Data";
import { Base64AudioPipe, Base64ImagePipe, Base64VideoPipe } from "./pipes";

export interface ILogEntry {
	message: string;
	isError?: boolean;
}

@Component({
	template: `
		<soho-accordion>
			<soho-accordion-header>Location</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="primary" (click)="getLocation()">Get location</button>
					<p *ngIf="location$ | async as location">
						latitude: <b>{{location.latitude}}</b>,
						longitude: <b>{{location.longitude}}</b>
					</p>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>QR Reader</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="primary" (click)="readQR()">Start QR Reader</button>
					<p *ngIf="qr$ | async as qr">{{qr}}</p>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Network</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="primary" (click)="getNetwork()">Get network</button>
					<p *ngIf="network$ | async as network">
						connectionState: <b>{{network.connectionState}}</b>,
						connectionType: <b>{{network.connectionType}}</b>
					</p>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Links</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<input #url type="text" value="https://example.com">
					<button soho-button="primary" (click)="launchMobileLink(url.value)">Mobile Launch</button>
					<button soho-button="tertiary" (click)="launchLink(url.value)">Context Launch</button>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Motion sensors</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="primary" (click)="getSensors()">Get sensors</button>
					<p *ngIf="sensors$ | async as sensors">
						acceleration: <b>{{sensors.acceleration | json}}</b>,
						gyroscope: <b>{{sensors.gyroscope | json}}</b>
					</p>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Maps</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="tertiary" (click)="showMapLocation()">Map with a location</button>
					<br/>
					<button soho-button="tertiary" (click)="showMapLocation(true)">Map with current position</button>
					<br/>
					<button soho-button="tertiary" (click)="showMapMarkers()">Map with markers</button>
					<br/>
					<button soho-button="tertiary" (click)="showMapNavigation()">Navigation map</button>
					<br/>
					<button soho-button="tertiary" (click)="showMapNavigation(true)">Navigation map from current position</button>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Image</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<input soho-radiobutton type="radio" id="i-source-all" name="i-source-all" value="all" [(ngModel)]="imageSource">
					<label soho-label [forRadioButton]="true" for="i-source-all">Both</label>
					<br/>
					<input soho-radiobutton
								type="radio"
								id="i-source-camera"
								name="i-source-camera"
								value="camera"
								[(ngModel)]="imageSource">
					<label soho-label
								[forRadioButton]="true"
								for="i-source-camera">Camera</label>
					<br/>
					<input soho-radiobutton
								type="radio"
								id="i-source-library"
								name="i-source-library"
								value="library"
								[(ngModel)]="imageSource">
					<label soho-label
								[forRadioButton]="true"
								for="i-source-library">Library</label>
					<br/>
					<button soho-button="primary" (click)="getImage(imageSource)">Get Image</button>
					<img *ngIf="image$ | async as imageData" [src]="imageData | base64Image">
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Video</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<input soho-radiobutton
								type="radio"
								id="v-source-all"
								name="v-source-all"
								value="all"
								[(ngModel)]="videoSource">
					<label soho-label
								[forRadioButton]="true"
								for="v-source-all">Both</label>
					<br/>
					<input soho-radiobutton
								type="radio"
								id="v-source-camera"
								name="v-source-camera"
								value="camera"
								[(ngModel)]="videoSource">
					<label soho-label
								[forRadioButton]="true"
								for="v-source-camera">Camera</label>
					<br/>
					<input soho-radiobutton
								type="radio"
								id="v-source-library"
								name="v-source-library"
								value="library"
								[(ngModel)]="videoSource">
					<label soho-label
								[forRadioButton]="true"
								for="v-source-library">Library</label>
					<br/>
					<button soho-button="primary" (click)="getVideo(videoSource)">Get Video</button>
					<video *ngIf="video$ | async as videoData" [src]="videoData | base64Video" controls></video>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Audio</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="primary" (click)="getAudio()">Get Audio</button>
					<audio *ngIf="audio$ | async as audioData" controls>
						<source [src]="audioData | base64Audio" type="audio/wav">
						<source [src]="audioData | base64Audio: 'mp3'" type="audio/mp3">
					</audio>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Documents</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="tertiary" (click)="openDocumentPDF()">Open a PDF</button>
					<button soho-button="tertiary" (click)="openDocumentWord()">Open a Word Document</button>
				</div>
			</soho-accordion-pane>

			<soho-accordion-header>Logs</soho-accordion-header>
			<soho-accordion-pane>
				<div class="accordion-content">
					<button soho-button="tertiary" (click)="initLogging()">Clear</button>
					<div class="log-container">
						<p *ngFor="let logEntry of logs$ | async" [class.error-msg]="logEntry.isError">{{logEntry.message}}</p>
					</div>
				</div>
			</soho-accordion-pane>
		</soho-accordion>
	`,
	styles: [`
		.log-container > p {
			font-size: 12px;
			line-height: 12px;
			margin: 0;
			padding: 1px;
			border: 1px solid lightgray;
		}
		.error-msg {
			color: red;
		}

		video {
			max-width: 100%;
			border: 1px solid gray;
		}
	`]
})
export class MobileWidgetComponent implements IWidgetComponent, OnInit {
	@Input() widgetContext: IWidgetContext;
	@Input() widgetInstance: IWidgetInstance;

	imageSource: IMediaSource = "all";
	videoSource: IMediaSource = "all";

	sensors$ = new Subject<IGetSensorsResult>();
	qr$ = new Subject<string>();
	audio$ = new Subject<string>();
	video$ = new Subject<string>();
	image$ = new Subject<string>();
	network$ = new Subject<IGetNetworkResult>();
	location$ = new Subject<IMapCoordinates>();
	logs$: Observable<ILogEntry[]>;

	private device$: Observable<IDevice>;

	constructor(private zone: NgZone) {
		this.initLogging();
	}

	ngOnInit() {
		this.device$ = this.widgetContext.getDevice();
	}

	launchLink(url: string) {
		this.widgetContext.launch({ url });
	}

	launchMobileLink(url: string) {
		this.device$.pipe(
			switchMap(device => device.openExternalLink({ url })),
		).subscribe();
	}

	getImage(source: IMediaSource) {
		this.device$.pipe(
			switchMap(device => device.getImage({ source })),
			map(result => result.data),
		).subscribe(imageData => this.image$.next(imageData), this.errorHandler("Failed to get image"));
	}

	getVideo(source: IMediaSource) {
		this.device$.pipe(
			switchMap(device => device.getVideo({ source })),
			map(result => result.data),
		).subscribe(videoData => this.video$.next(videoData), this.errorHandler("Failed to get video"));
	}

	getAudio() {
		this.device$.pipe(
			switchMap(device => device.getAudio()),
			map(result => result.data),
		).subscribe(audioData => this.audio$.next(audioData), this.errorHandler("Failed to get audio"));
	}

	showMapLocation(useCurrentLocation?: boolean) {
		const currentLocation$ = this.device$.pipe(
			switchMap(device => device.getLocation()),
		);
		const coordinates$ = useCurrentLocation ? currentLocation$ : of({ latitude: 40.740770, longitude: -73.994754 });
		forkJoin(this.device$, coordinates$).pipe(
			switchMap(([device, coordinates]) => device.showMap({
				mapType: "location",
				coordinates,
			})),
		).subscribe();
	}

	showMapMarkers() {
		this.device$.pipe(
			switchMap(device => device.showMap({
				mapType: "marker",
				markers: [
					{
						coordinates: { latitude: 40.740770, longitude: -73.994754 },
						label: "Infor Headquarters",
					},
					{
						coordinates: { latitude: 40.758891, longitude: -73.985128 },
						label: "Times Square",
					},
					{
						coordinates: { latitude: 40.748402, longitude: -73.985593 },
						label: "Empire State Building",
					},
				],
			})),
		).subscribe();
	}

	showMapNavigation(fromCurrentLocation?: boolean) {
		const currentLocation$ = this.device$.pipe(
			switchMap(device => device.getLocation()),
		);
		const startLocation = fromCurrentLocation ? currentLocation$ : of({ latitude: 40.722926, longitude: -74.002157 });
		forkJoin(this.device$, startLocation).pipe(
			switchMap(([device, start]) => device.showMap({
				mapType: "navigation",
				start,
				destination: { latitude: 40.740770, longitude: -73.994754 },
			})),
		).subscribe();
	}

	getLocation() {
		this.device$.pipe(
			switchMap(device => device.getLocation()),
		).subscribe(location => this.location$.next(location), this.errorHandler("Failed to get location"));
	}

	readQR() {
		this.device$.pipe(
			switchMap(device => device.readQRCode()),
			map(result => result.text),
		).subscribe(value => this.qr$.next(value), this.errorHandler("Failed to read QR"));
	}

	getNetwork() {
		this.device$.pipe(
			switchMap(device => device.getNetwork()),
		).subscribe(data => this.network$.next(data), this.errorHandler("Failed to get network"));
	}

	getSensors() {
		this.device$.pipe(
			switchMap(device => device.getSensors()),
		).subscribe(sensorData => this.sensors$.next(sensorData), this.errorHandler("Failed to get sensors"));
	}

	openDocumentPDF() {
		this.device$.pipe(
			switchMap(device => device.openDocument({
				data: PDF_TEST_BASE64,
				name: "test.pdf",
				type: "application/pdf",
			}))
		).subscribe();
	}

	openDocumentWord() {
		this.device$.pipe(
			switchMap(device => device.openDocument({
				data: DOCS_TEST_BASE64,
				name: "test.docx",
				type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			}))
		).subscribe();
	}

	/**
	 * NOTE: This method will override console.log and console.error.
	 * This should never ever ever ever be done in a production environment,
	 * and it is quite dangerous to do even in development.
	 */
	initLogging() {
		const consoleLogs$: Observable<ILogEntry> = new Observable<ILogEntry>(observer => {
			const oldConsoleLog = console.log;
			const oldConsoleError = console.error;
			console.log = (...args: {}[]) => {
				const message = args.map(s => JSON.stringify(s)).join(" ");
				this.zone.run(() => observer.next({ message }));
				oldConsoleLog(...args);
			};
			console.error = (...args: {}[]) => {
				const message = args.map(s => JSON.stringify(s)).join(" ");
				this.zone.run(() => observer.next({ message, isError: true }));
				oldConsoleError(...args);
			};
		});
		this.logs$ = consoleLogs$.pipe(
			scan<ILogEntry, ILogEntry[]>((entries, entry) => [entry, ...entries], []),
		);
	}

	private errorHandler = (message: string) => (error?: Error) => this.showError(message, error);

	private showError(message: string, error?: Error) {
		const details = error && error.message ? error.message : `${JSON.stringify(error)}`;
		this.widgetContext.showWidgetMessage({
			message: `${message}: ${details}`,
			type: WidgetMessageType.Error,
		});
	}
}

@NgModule({
	declarations: [
		MobileWidgetComponent,
		Base64ImagePipe,
		Base64AudioPipe,
		Base64VideoPipe,
	],
	entryComponents: [MobileWidgetComponent],
	imports: [
		CommonModule,
		FormsModule,
		SohoAccordionModule,
		SohoButtonModule,
		SohoRadioButtonModule,
		SohoLabelModule,
	],
})
export class MobileWidgetModule { }
