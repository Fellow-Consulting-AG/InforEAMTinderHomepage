var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
define(["require", "exports", "@angular/common", "@angular/core", "@angular/forms", "@infor/sohoxi-angular", "lime", "rxjs", "rxjs/operators", "./base64Data", "./pipes"], function (require, exports, common_1, core_1, forms_1, sohoxi_angular_1, lime_1, rxjs_1, operators_1, base64Data_1, pipes_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MobileWidgetModule = exports.MobileWidgetComponent = void 0;
    var MobileWidgetComponent = /** @class */ (function () {
        function MobileWidgetComponent(zone) {
            var _this = this;
            this.zone = zone;
            this.imageSource = "all";
            this.videoSource = "all";
            this.sensors$ = new rxjs_1.Subject();
            this.qr$ = new rxjs_1.Subject();
            this.audio$ = new rxjs_1.Subject();
            this.video$ = new rxjs_1.Subject();
            this.image$ = new rxjs_1.Subject();
            this.network$ = new rxjs_1.Subject();
            this.location$ = new rxjs_1.Subject();
            this.errorHandler = function (message) { return function (error) { return _this.showError(message, error); }; };
            this.initLogging();
        }
        MobileWidgetComponent.prototype.ngOnInit = function () {
            this.device$ = this.widgetContext.getDevice();
        };
        MobileWidgetComponent.prototype.launchLink = function (url) {
            this.widgetContext.launch({ url: url });
        };
        MobileWidgetComponent.prototype.launchMobileLink = function (url) {
            this.device$.pipe(operators_1.switchMap(function (device) { return device.openExternalLink({ url: url }); })).subscribe();
        };
        MobileWidgetComponent.prototype.getImage = function (source) {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getImage({ source: source }); }), operators_1.map(function (result) { return result.data; })).subscribe(function (imageData) { return _this.image$.next(imageData); }, this.errorHandler("Failed to get image"));
        };
        MobileWidgetComponent.prototype.getVideo = function (source) {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getVideo({ source: source }); }), operators_1.map(function (result) { return result.data; })).subscribe(function (videoData) { return _this.video$.next(videoData); }, this.errorHandler("Failed to get video"));
        };
        MobileWidgetComponent.prototype.getAudio = function () {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getAudio(); }), operators_1.map(function (result) { return result.data; })).subscribe(function (audioData) { return _this.audio$.next(audioData); }, this.errorHandler("Failed to get audio"));
        };
        MobileWidgetComponent.prototype.showMapLocation = function (useCurrentLocation) {
            var currentLocation$ = this.device$.pipe(operators_1.switchMap(function (device) { return device.getLocation(); }));
            var coordinates$ = useCurrentLocation ? currentLocation$ : rxjs_1.of({ latitude: 40.740770, longitude: -73.994754 });
            rxjs_1.forkJoin(this.device$, coordinates$).pipe(operators_1.switchMap(function (_a) {
                var device = _a[0], coordinates = _a[1];
                return device.showMap({
                    mapType: "location",
                    coordinates: coordinates,
                });
            })).subscribe();
        };
        MobileWidgetComponent.prototype.showMapMarkers = function () {
            this.device$.pipe(operators_1.switchMap(function (device) { return device.showMap({
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
            }); })).subscribe();
        };
        MobileWidgetComponent.prototype.showMapNavigation = function (fromCurrentLocation) {
            var currentLocation$ = this.device$.pipe(operators_1.switchMap(function (device) { return device.getLocation(); }));
            var startLocation = fromCurrentLocation ? currentLocation$ : rxjs_1.of({ latitude: 40.722926, longitude: -74.002157 });
            rxjs_1.forkJoin(this.device$, startLocation).pipe(operators_1.switchMap(function (_a) {
                var device = _a[0], start = _a[1];
                return device.showMap({
                    mapType: "navigation",
                    start: start,
                    destination: { latitude: 40.740770, longitude: -73.994754 },
                });
            })).subscribe();
        };
        MobileWidgetComponent.prototype.getLocation = function () {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getLocation(); })).subscribe(function (location) { return _this.location$.next(location); }, this.errorHandler("Failed to get location"));
        };
        MobileWidgetComponent.prototype.readQR = function () {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.readQRCode(); }), operators_1.map(function (result) { return result.text; })).subscribe(function (value) { return _this.qr$.next(value); }, this.errorHandler("Failed to read QR"));
        };
        MobileWidgetComponent.prototype.getNetwork = function () {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getNetwork(); })).subscribe(function (data) { return _this.network$.next(data); }, this.errorHandler("Failed to get network"));
        };
        MobileWidgetComponent.prototype.getSensors = function () {
            var _this = this;
            this.device$.pipe(operators_1.switchMap(function (device) { return device.getSensors(); })).subscribe(function (sensorData) { return _this.sensors$.next(sensorData); }, this.errorHandler("Failed to get sensors"));
        };
        MobileWidgetComponent.prototype.openDocumentPDF = function () {
            this.device$.pipe(operators_1.switchMap(function (device) { return device.openDocument({
                data: base64Data_1.PDF_TEST_BASE64,
                name: "test.pdf",
                type: "application/pdf",
            }); })).subscribe();
        };
        MobileWidgetComponent.prototype.openDocumentWord = function () {
            this.device$.pipe(operators_1.switchMap(function (device) { return device.openDocument({
                data: base64Data_1.DOCS_TEST_BASE64,
                name: "test.docx",
                type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }); })).subscribe();
        };
        /**
         * NOTE: This method will override console.log and console.error.
         * This should never ever ever ever be done in a production environment,
         * and it is quite dangerous to do even in development.
         */
        MobileWidgetComponent.prototype.initLogging = function () {
            var _this = this;
            var consoleLogs$ = new rxjs_1.Observable(function (observer) {
                var oldConsoleLog = console.log;
                var oldConsoleError = console.error;
                console.log = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var message = args.map(function (s) { return JSON.stringify(s); }).join(" ");
                    _this.zone.run(function () { return observer.next({ message: message }); });
                    oldConsoleLog.apply(void 0, args);
                };
                console.error = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var message = args.map(function (s) { return JSON.stringify(s); }).join(" ");
                    _this.zone.run(function () { return observer.next({ message: message, isError: true }); });
                    oldConsoleError.apply(void 0, args);
                };
            });
            this.logs$ = consoleLogs$.pipe(operators_1.scan(function (entries, entry) { return __spreadArrays([entry], entries); }, []));
        };
        MobileWidgetComponent.prototype.showError = function (message, error) {
            var details = error && error.message ? error.message : "" + JSON.stringify(error);
            this.widgetContext.showWidgetMessage({
                message: message + ": " + details,
                type: lime_1.WidgetMessageType.Error,
            });
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], MobileWidgetComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], MobileWidgetComponent.prototype, "widgetInstance", void 0);
        MobileWidgetComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<soho-accordion>\n\t\t\t<soho-accordion-header>Location</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getLocation()\">Get location</button>\n\t\t\t\t\t<p *ngIf=\"location$ | async as location\">\n\t\t\t\t\t\tlatitude: <b>{{location.latitude}}</b>,\n\t\t\t\t\t\tlongitude: <b>{{location.longitude}}</b>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>QR Reader</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"readQR()\">Start QR Reader</button>\n\t\t\t\t\t<p *ngIf=\"qr$ | async as qr\">{{qr}}</p>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Network</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getNetwork()\">Get network</button>\n\t\t\t\t\t<p *ngIf=\"network$ | async as network\">\n\t\t\t\t\t\tconnectionState: <b>{{network.connectionState}}</b>,\n\t\t\t\t\t\tconnectionType: <b>{{network.connectionType}}</b>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Links</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<input #url type=\"text\" value=\"https://example.com\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"launchMobileLink(url.value)\">Mobile Launch</button>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"launchLink(url.value)\">Context Launch</button>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Motion sensors</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getSensors()\">Get sensors</button>\n\t\t\t\t\t<p *ngIf=\"sensors$ | async as sensors\">\n\t\t\t\t\t\tacceleration: <b>{{sensors.acceleration | json}}</b>,\n\t\t\t\t\t\tgyroscope: <b>{{sensors.gyroscope | json}}</b>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Maps</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"showMapLocation()\">Map with a location</button>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"showMapLocation(true)\">Map with current position</button>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"showMapMarkers()\">Map with markers</button>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"showMapNavigation()\">Navigation map</button>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"showMapNavigation(true)\">Navigation map from current position</button>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Image</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<input soho-radiobutton type=\"radio\" id=\"i-source-all\" name=\"i-source-all\" value=\"all\" [(ngModel)]=\"imageSource\">\n\t\t\t\t\t<label soho-label [forRadioButton]=\"true\" for=\"i-source-all\">Both</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<input soho-radiobutton\n\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\tid=\"i-source-camera\"\n\t\t\t\t\t\t\t\tname=\"i-source-camera\"\n\t\t\t\t\t\t\t\tvalue=\"camera\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"imageSource\">\n\t\t\t\t\t<label soho-label\n\t\t\t\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\t\t\t\tfor=\"i-source-camera\">Camera</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<input soho-radiobutton\n\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\tid=\"i-source-library\"\n\t\t\t\t\t\t\t\tname=\"i-source-library\"\n\t\t\t\t\t\t\t\tvalue=\"library\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"imageSource\">\n\t\t\t\t\t<label soho-label\n\t\t\t\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\t\t\t\tfor=\"i-source-library\">Library</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getImage(imageSource)\">Get Image</button>\n\t\t\t\t\t<img *ngIf=\"image$ | async as imageData\" [src]=\"imageData | base64Image\">\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Video</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<input soho-radiobutton\n\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\tid=\"v-source-all\"\n\t\t\t\t\t\t\t\tname=\"v-source-all\"\n\t\t\t\t\t\t\t\tvalue=\"all\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"videoSource\">\n\t\t\t\t\t<label soho-label\n\t\t\t\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\t\t\t\tfor=\"v-source-all\">Both</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<input soho-radiobutton\n\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\tid=\"v-source-camera\"\n\t\t\t\t\t\t\t\tname=\"v-source-camera\"\n\t\t\t\t\t\t\t\tvalue=\"camera\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"videoSource\">\n\t\t\t\t\t<label soho-label\n\t\t\t\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\t\t\t\tfor=\"v-source-camera\">Camera</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<input soho-radiobutton\n\t\t\t\t\t\t\t\ttype=\"radio\"\n\t\t\t\t\t\t\t\tid=\"v-source-library\"\n\t\t\t\t\t\t\t\tname=\"v-source-library\"\n\t\t\t\t\t\t\t\tvalue=\"library\"\n\t\t\t\t\t\t\t\t[(ngModel)]=\"videoSource\">\n\t\t\t\t\t<label soho-label\n\t\t\t\t\t\t\t\t[forRadioButton]=\"true\"\n\t\t\t\t\t\t\t\tfor=\"v-source-library\">Library</label>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getVideo(videoSource)\">Get Video</button>\n\t\t\t\t\t<video *ngIf=\"video$ | async as videoData\" [src]=\"videoData | base64Video\" controls></video>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Audio</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"primary\" (click)=\"getAudio()\">Get Audio</button>\n\t\t\t\t\t<audio *ngIf=\"audio$ | async as audioData\" controls>\n\t\t\t\t\t\t<source [src]=\"audioData | base64Audio\" type=\"audio/wav\">\n\t\t\t\t\t\t<source [src]=\"audioData | base64Audio: 'mp3'\" type=\"audio/mp3\">\n\t\t\t\t\t</audio>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Documents</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"openDocumentPDF()\">Open a PDF</button>\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"openDocumentWord()\">Open a Word Document</button>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\n\t\t\t<soho-accordion-header>Logs</soho-accordion-header>\n\t\t\t<soho-accordion-pane>\n\t\t\t\t<div class=\"accordion-content\">\n\t\t\t\t\t<button soho-button=\"tertiary\" (click)=\"initLogging()\">Clear</button>\n\t\t\t\t\t<div class=\"log-container\">\n\t\t\t\t\t\t<p *ngFor=\"let logEntry of logs$ | async\" [class.error-msg]=\"logEntry.isError\">{{logEntry.message}}</p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</soho-accordion-pane>\n\t\t</soho-accordion>\n\t",
                styles: ["\n\t\t.log-container > p {\n\t\t\tfont-size: 12px;\n\t\t\tline-height: 12px;\n\t\t\tmargin: 0;\n\t\t\tpadding: 1px;\n\t\t\tborder: 1px solid lightgray;\n\t\t}\n\t\t.error-msg {\n\t\t\tcolor: red;\n\t\t}\n\n\t\tvideo {\n\t\t\tmax-width: 100%;\n\t\t\tborder: 1px solid gray;\n\t\t}\n\t"]
            }),
            __metadata("design:paramtypes", [core_1.NgZone])
        ], MobileWidgetComponent);
        return MobileWidgetComponent;
    }());
    exports.MobileWidgetComponent = MobileWidgetComponent;
    var MobileWidgetModule = /** @class */ (function () {
        function MobileWidgetModule() {
        }
        MobileWidgetModule = __decorate([
            core_1.NgModule({
                declarations: [
                    MobileWidgetComponent,
                    pipes_1.Base64ImagePipe,
                    pipes_1.Base64AudioPipe,
                    pipes_1.Base64VideoPipe,
                ],
                entryComponents: [MobileWidgetComponent],
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    sohoxi_angular_1.SohoAccordionModule,
                    sohoxi_angular_1.SohoButtonModule,
                    sohoxi_angular_1.SohoRadioButtonModule,
                    sohoxi_angular_1.SohoLabelModule,
                ],
            })
        ], MobileWidgetModule);
        return MobileWidgetModule;
    }());
    exports.MobileWidgetModule = MobileWidgetModule;
});
//# sourceMappingURL=main.js.map