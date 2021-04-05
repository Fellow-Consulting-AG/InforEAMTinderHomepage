var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./assets", "@angular/forms", "rxjs/operators", "@angular/common/http", "@angular/common/http"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, assets_1, forms_1, operators_1, http_1, http_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapsModule = exports.MapComponent = void 0;
    var MapComponent = /** @class */ (function () {
        function MapComponent(changeDetectionRef, fb, http) {
            this.changeDetectionRef = changeDetectionRef;
            this.fb = fb;
            this.http = http;
            this.assets = assets_1.assets;
            this.requestJSONResponse = new http_1.HttpHeaders();
            this.monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            this.currentSliderImage = 0;
            this.workOrderFormVisible = false;
        }
        MapComponent.prototype.resetGridFilter = function () {
            this.gridDataFiltered = this.inforMatchingDocuments.slice();
        };
        MapComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var instance, token;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.injectMeta();
                            this.injectGoogleMapsScript();
                            instance = this.widgetInstance;
                            this.gridReactiveForm = this.fb.group({
                                locationFilter: '',
                                dateFilter: ''
                            });
                            this.gridReactiveForm.get('locationFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '') {
                                    _this.resetGridFilter();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (locationFilterValue) {
                                _this.gridReactiveForm.get('dateFilter').setValue('');
                                _this.gridDataFiltered = _this.inforMatchingDocuments.filter(function (entry) { return entry.coordinates.includes(locationFilterValue); });
                            });
                            this.gridReactiveForm.get('dateFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '') {
                                    _this.resetGridFilter();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (dateFilterValue) {
                                _this.gridReactiveForm.get('locationFilter').setValue('');
                                _this.gridDataFiltered = _this.inforMatchingDocuments.filter(function (entry) { return entry.date.toLowerCase().includes(dateFilterValue.toLowerCase()); });
                            });
                            // this.updateSortOrder();
                            // ** INITIALIZE JQUERY PLUGINS
                            try {
                                // @ts-ignore
                                $('.dropdown').dropdown();
                                // @ts-ignore
                            }
                            catch (err) {
                                console.log('Error initialzing JQuery components.');
                                console.warn(err);
                            }
                            return [4 /*yield*/, this.getToken()];
                        case 1:
                            token = _a.sent();
                            this.http.get('https://run.mocky.io/v3/0d2d4432-5761-4414-817f-9708cefc4c64').pipe(operators_1.take(1)).toPromise().then(function (apiResponse) {
                                // this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
                                //     headers: new HttpHeaders({
                                //         'Content-Type': 'application/json',
                                //         'Authorization': `Bearer ${token}`
                                //     })
                                // }).toPromise().then((apiResponse: any) => {
                                console.clear();
                                console.log(apiResponse);
                                _this.inforMatchingDocuments = apiResponse.items.item.map(function (item) {
                                    var lastChangedTS = new Date(item.lastChangedTS);
                                    var lastChangedTSString = _this.monthNames[lastChangedTS.getMonth()] + " " + lastChangedTS.getDate() + ", " + lastChangedTS.getFullYear();
                                    var latlng = {
                                        lat: +item.attrs.attr[0].value.split(',')[0],
                                        lng: +item.attrs.attr[0].value.split(',')[1]
                                    };
                                    _this.addMarker(latlng);
                                    return {
                                        imageSrc: item.resrs.res[1].url,
                                        pid: item.pid,
                                        attributes: {
                                            location: latlng,
                                            pin: item.attrs.attr[2].value
                                        },
                                        date: lastChangedTSString,
                                    };
                                });
                                _this.gridDataFiltered = _this.inforMatchingDocuments.slice();
                                console.log(_this.inforMatchingDocuments);
                            }).catch(function (err) {
                                console.warn('--------------------------------------------');
                                console.error(err);
                                console.warn('---------------------------------------------');
                            });
                            this.changeDetectionRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        MapComponent.prototype.getToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.http.get("https://mingle-extensions.eu1.inforcloudsuite.com/grid/rest/security/sessions/oauth")
                                .subscribe(function (s) {
                            }, function (e) {
                                console.log('Error', e);
                                resolve(e.error.text);
                            });
                        })];
                });
            });
        };
        MapComponent.prototype.slideToFirst = function () {
            this.currentSliderImage = 0;
            this.calibrateSlider();
        };
        MapComponent.prototype.slideToLast = function () {
            this.currentSliderImage = this.inforMatchingDocuments.length - 1;
            this.calibrateSlider();
        };
        MapComponent.prototype.slideToNextImage = function () {
            if (this.currentSliderImage < this.inforMatchingDocuments.length - 1) {
                this.currentSliderImage++;
                this.calibrateSlider();
            }
        };
        MapComponent.prototype.slideToPreviousImage = function () {
            if (this.currentSliderImage > 0) {
                this.currentSliderImage--;
                this.calibrateSlider();
            }
        };
        MapComponent.prototype.calibrateSlider = function () {
            // console.log(this.currentSliderImage);
            // console.log(this.imageSlider.nativeElement.scrollLeft);
            // console.log(this.sliderElement.scrollLeft);
            // this.sliderElement.scrollLeft = this.currentSliderImage * 550;
            // this.sliderElement.scrollLeft = (this.currentSliderImage -1) * 550
            // const targetChild = document.getElementById('slider_image_' + this.currentSliderImage);
            // console.log(targetChild.offsetLeft);
            // this.sliderElement.scrollLeft += 560;
        };
        MapComponent.prototype.googleMapsLibraryLoaded = function () {
            console.log('Plugin should be loaded by now.');
            try {
                var mapProperties = {
                    center: new google.maps.LatLng(53.544258, 9.952000),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
                // this.addMarker('53.533917,9.950556');
                // this.addMarker('53.528472,9.953222');
                // this.addMarker('53.530222,9.952333');
                // this.addMarker('53.531556,9.951750');
                // this.addMarker('53.531889,9.951583');
                // this.addMarker('53.529583,9.952694');
            }
            catch (err) {
                console.error('Error setting up google maps plugin.');
                console.warn(err);
            }
        };
        MapComponent.prototype.addMarker = function (latLong, title) {
            new google.maps.Marker({
                position: latLong,
                map: this.map,
                title: title ? title : ''
            });
        };
        MapComponent.prototype.injectMeta = function () {
            var node = document.createElement('meta');
            node.name = 'referrer';
            node.content = 'no-referrer';
            document.getElementsByTagName('head')[0].appendChild(node);
        };
        MapComponent.prototype.injectGoogleMapsScript = function () {
            var node = document.createElement('script'); // creates the script tag
            node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAF2LWQraFh6vs8rKvc5fjkCZyzaKQkmE8';
            // node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLG1B0MT2DyoTSZWdjm5G-kn3UwyBixGA';
            // node.src = 'https://maps.googleapis.com/maps/api/js'; // sets the source (insert url in between quotes)
            node.type = 'text/javascript'; // set the script type
            function gmapsLoaded() {
                this.googleMapsLibraryLoaded();
            }
            var gmapsCallback = gmapsLoaded.bind(this);
            node.onload = gmapsCallback;
            // append to head of document
            document.getElementsByTagName('head')[0].appendChild(node);
        };
        MapComponent.prototype.getMetadata = function () {
            // Dynamically create metadata for the standard metadata controlled settings UI.
            // For dynamic settings / values that need to be resolved asynchronously,
            // implement IWidgetInstance getMetadataAsync() instead.
            // For known/hardcoded values, place the metadata in the manifest instead.
            return [{
                    labelId: "order",
                    type: lime_1.WidgetSettingsType.selectorType,
                    name: "order",
                    defaultValue: "desc",
                    values: [
                        { textId: "ascending", value: "asc" },
                        { textId: "descending", value: "desc" }
                    ]
                }];
        };
        MapComponent.prototype.invalidateImage = function (sliderImage) {
            sliderImage.imageSrc = assets_1.assets.error;
            console.error('Error loading: ', sliderImage.imageSrc);
        };
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetContext)
        ], MapComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], MapComponent.prototype, "widgetInstance", void 0);
        __decorate([
            core_1.ViewChild("map", { static: true }),
            __metadata("design:type", Object)
        ], MapComponent.prototype, "mapElement", void 0);
        __decorate([
            core_1.ViewChild("imageSlider", { static: true }),
            __metadata("design:type", Object)
        ], MapComponent.prototype, "imageSlider", void 0);
        MapComponent = __decorate([
            core_1.Component({
                template: "\n\n        <!-- **************************************   -->\n        <!-- *********      H T M L      **********   -->\n        <!-- **************************************   -->\n\n\n        <div class=\"main-container\">\n            <!-- First Box (map)           -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n\n            <!-- Second Box (Grid)        -->\n            <div class=\"coordinates-outline\">\n                <form [formGroup]=\"gridReactiveForm\">\n                    <div class=\"table-grid\">\n                        <div class=\"heading-row\"></div>\n                        <div class=\"heading-row\">LOCATION<input type=\"text\" formControlName=\"locationFilter\"\n                                                                class=\"grid-filter-input\"></div>\n                        <div class=\"heading-row\">DATA<input type=\"text\" formControlName=\"dateFilter\"\n                                                            class=\"grid-filter-input\"></div>\n                        <ng-container *ngFor=\"let gridRow of gridDataFiltered\">\n                            <div style=\"padding:3px\"><img [src]=\"gridRow.status == '40' ? assets.checkIcon : gridRow.status == '30' ? assets.noIcon : ''\"></div>\n                            <div>{{gridRow.attributes.pin}}</div>\n                            <div>{{gridRow.date}}</div>\n                        </ng-container>\n                    </div>\n                </form>\n            </div>\n\n            <!--  Third Box (Slider)    -->\n            <div [ngClass]=\"{'expanded': !workOrderFormVisible}\">\n                <ng-container *ngIf=\"inforMatchingDocuments\">\n                    <div class=\"mby-slider-wrapper\">\n                        <div class=\"slider-container\">\n                            <div class=\"imageSlider\" [ngStyle]=\"{'left':'-' + currentSliderImage * 550+'px'}\">\n                                <div *ngFor=\"let sliderImage of inforMatchingDocuments;\"\n                                     [ngStyle]=\"{'background-image': 'url(' + sliderImage.imageSrc+ ')'}\"\n                                     style=\"background-size:cover;height:400px;width:550px;\">\n                                    <img [src]=\"sliderImage.imageSrc\" (error)=\"invalidateImage(sliderImage);\">\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"controls\">\n                            <div style=\"padding: 2px; cursor: pointer\" (click)=\"inforMatchingDocuments[currentSliderImage].status = 30; workOrderFormVisible = false;\" >\n                                <img [src]=\"assets.noIcon\" width=\"25\"/>\n                            </div>\n                            <div style=\"display: flex; justify-content: center\">\n                                <div>\n                                    <img src=\"{{assets.doubleArrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToFirst()\"/>\n                                    <img src=\"{{assets.arrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToPreviousImage()\"/>\n                                    <span class=\"slide-numbers\">{{currentSliderImage + 1}}\n                                        of {{inforMatchingDocuments.length}}</span>\n                                    <img src=\"{{assets.rightArrow}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToNextImage()\"/>\n                                    <img src=\"{{assets.doubleArrowRight}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToLast()\"/>\n                                </div>\n                            </div>\n                            <div style=\"padding-left: 15px; padding-top: 2px;cursor: pointer;\"\n                                 (click)=\"inforMatchingDocuments[currentSliderImage].status = 40; workOrderFormVisible = true;\">\n                                <img [src]=\"assets.checkIcon\" width=\"25\"/>\n                            </div>\n                        </div>\n                    </div>\n                </ng-container>\n\n            </div>\n\n\n            <!-- Fourth Box  (Form)      -->\n            <div *ngIf=\"workOrderFormVisible\">\n                <div class=\"form-outline\">\n                    <div class=\"field\">\n                        <input type=\"text\" id=\"first-name\" name=\"first-name\" placeholder=\"Title\">\n                    </div>\n                    <div class=\"field\">\n                        <textarea id=\"description\" class=\"resizable\" name=\"description\"\n                                  placeholder=\"Short Description\"></textarea>\n                    </div>\n\n                    <div class=\"field\">\n                        Location: N75.34334 E36.4545454<br>\n                        Time: 14:00:00:00 PKST\n                    </div>\n\n                    <div style=\"display:grid; grid-template-columns: 0.7fr 0.3fr;\">\n                        <div>\n                            <div class=\"field\">\n                                <select id=\"states\" name=\"states\" class=\"dropdown\">\n                                    <option value=\"AL\">Assign To:</option>\n                                    <option value=\"CA\">California</option>\n                                    <option value=\"DE\">Delaware</option>\n                                    <option value=\"NY\">New York</option>\n                                    <option value=\"WY\">Wyoming</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div style=\"display:flex; flex-direction: row-reverse\">\n                            <button class=\"btn-primary\" type=\"button\" id=\"page-button-primary\">Send</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n\n        /*************************************/\n        /*****           C S S           *****/\n        /*************************************/\n\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 3rem;\n            margin: 10px;\n        }\n\n        .expanded {\n            grid-column: 1 / -1;\n            margin-left: 25%;\n        }\n\n        .heading-row {\n            background: #c3c3c3;\n            color: white;\n            height: 4.5rem;\n        }\n\n        .grid-filter-input {\n            height: 1.5rem;\n            color: white;\n            width: 20rem;\n            background-color: white;\n            color: black;\n            border: 0px;\n            font-size: 11px;\n            padding-left: 0px;\n            margin-top: 2px;\n        }\n\n        .coordinates-outline {\n            border: 1px solid #cdcdcd;\n            border-radius: 15px;\n            overflow: hidden;\n        }\n\n        .table-grid {\n            display: grid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            border: 0.5px solid #cdcdcd;\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: #f0f0f098;\n            width: 100%;\n            border-radius: 10px;\n            height: 30px;\n            position: relative;\n            border: 1px solid;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n\n        .mby-slider-wrapper {\n            display: grid;\n            width: 550px;\n        }\n\n        .slider-container {\n            height: 300px;\n            overflow: hidden;\n        }\n\n        .imageSlider {\n            position: relative;\n            transition-property: left;\n            transition-duration: 0.5s;\n            transition-timing-function: ease-in-out;\n            display: grid;\n            grid-template-columns: repeat(15, 550px);\n        }\n    "]
                // changeDetection: ChangeDetectionStrategy.OnPush
            })
            /*************************************/
            /* ****      TypeScript         **** */
            /*************************************/
            ,
            __metadata("design:paramtypes", [core_1.ChangeDetectorRef, forms_1.FormBuilder, http_2.HttpClient])
        ], MapComponent);
        return MapComponent;
    }());
    exports.MapComponent = MapComponent;
    var MapsModule = /** @class */ (function () {
        function MapsModule() {
        }
        MapsModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpClientModule],
                declarations: [MapComponent],
                entryComponents: [MapComponent]
            })
        ], MapsModule);
        return MapsModule;
    }());
    exports.MapsModule = MapsModule;
});
//# sourceMappingURL=main.js.map