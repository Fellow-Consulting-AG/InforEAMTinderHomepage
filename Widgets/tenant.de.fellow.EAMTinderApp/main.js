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
            this.currentSliderImage = 0;
        }
        MapComponent.prototype.resetGridFilter = function () {
            this.gridDataFiltered = this.gridData.slice();
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
                            this.gridData = [{ icon: assets_1.assets.checkIcon, coordinates: '52.5200° N, 13.4050° E', date: 'March 14, 1879' },
                                { icon: assets_1.assets.noIcon, coordinates: '48.1351° N, 11.5820° E', date: 'January 4, 1643' },
                                { icon: assets_1.assets.checkIcon, coordinates: '50.1109° N, 8.6821° E', date: 'July 10, 1856' },
                                { icon: assets_1.assets.checkIcon, coordinates: '53.5511° N, 9.9937° E', date: 'February 22, 1788' },
                            ];
                            this.gridDataFiltered = this.gridData.slice();
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
                                _this.gridDataFiltered = _this.gridData.filter(function (entry) { return entry.coordinates.includes(locationFilterValue); });
                            });
                            this.gridReactiveForm.get('dateFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '') {
                                    _this.resetGridFilter();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (dateFilterValue) {
                                _this.gridReactiveForm.get('locationFilter').setValue('');
                                _this.gridDataFiltered = _this.gridData.filter(function (entry) { return entry.date.toLowerCase().includes(dateFilterValue.toLowerCase()); });
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
                            return [4 /*yield*/, this.refreshToken()];
                        case 1:
                            token = _a.sent();
                            this.requestJSONResponse.append('accept', 'application/json;charset=utf-8');
                            this.requestJSONResponse.append('Authorization', "Bearer " + token);
                            // this.sliderImages = [
                            //     {src: 'https://picsum.photos/550/401'},
                            //     {src: 'https://picsum.photos/550/402'},
                            //     {src: 'https://picsum.photos/550/403'},
                            //     {src: 'https://picsum.photos/550/399'},
                            //     {src: 'https://picsum.photos/550/398'},
                            //     {src: 'https://picsum.photos/550/397'}
                            // ];
                            // setInterval(() => {
                            //     console.log('Scroll position should now be changed.');
                            //     this.imageSlider.nativeElement.scrollLeft = 550;
                            // }, 4000);
                            this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FAsset_Image%5B%40Status%20%3D%20%2210%22%5D&%24offset=0&%24limit=1000', { headers: this.requestJSONResponse }).toPromise().then(function (apiResponse) {
                                // this.http.get('https://run.mocky.io/v3/5c3199e0-823f-4d88-b67a-407a33c30af3').pipe(take(1)).toPromise().then((apiResponse: any) => {
                                console.log(apiResponse);
                                // console.clear();
                                console.log('---------------------------------------------------');
                                var newSliderImagesObject = apiResponse.items.item.map(function (item) {
                                    return {
                                        src: item.resrs.res[1].url
                                    };
                                    // return item.resrs.res[1].url;
                                    // console.log(item.resrs.res[1].url);
                                });
                                _this.sliderImages = newSliderImagesObject;
                                console.log(_this.sliderImages);
                                // console.log(apiResponse?.items.item);
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
        MapComponent.prototype.refreshToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var url, config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            url = 'https://mingle-sso.eu1.inforcloudsuite.com:443/FELLOWCONSULTING_DEV/as/token.oauth2';
                            config = {
                                "ti": "FELLOWCONSULTING_DEV",
                                "cn": "EAM-farooqak",
                                "dt": "12",
                                "ci": "FELLOWCONSULTING_DEV~f7OB2dfXWicZAgc0Iqrzxjm61Mo2_fg603uJhd_Ebw4",
                                "cs": "uhnI9VPlKqjiqSWkfvuC1KRWXw9EanXs7d1ezfgUP8TDiS_FG3IxgpLQX9qe7mq5VEPMo47ZhzC_SqE7qQnLCw",
                                "iu": "https://mingle-ionapi.eu1.inforcloudsuite.com",
                                "pu": "https://mingle-sso.eu1.inforcloudsuite.com:443/FELLOWCONSULTING_DEV/as/",
                                "oa": "authorization.oauth2",
                                "ot": "token.oauth2",
                                "or": "revoke_token.oauth2",
                                "ev": "V1480769020",
                                "v": "1.0",
                                "saak": "FELLOWCONSULTING_DEV#QoGbrCkl3Tlt0FCAfKbAxu_gA_sYGkkxUPMbcRL1ZHdQmoBRXNIvgsFNtbg_pABQd107Vs6Bh_hMPjNPZMGk9A",
                                "sask": "dNG92c1gXg-G3CjfeTEj0g6HjYXCZa2NZSv7_3lBX89vATfiE_PtdPXxxykg51cuH-TPOyDSruR_relzTg83bg"
                            };
                            return [4 /*yield*/, this.http.post("" + config.pu + config.ot, {
                                    grant_type: "password",
                                    username: config.saak,
                                    password: config.sask,
                                    scope: ''
                                }, {
                                    headers: {
                                        // 'Access-Control-Allow-Origin': '*',
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Authorization': 'Bearer ' + btoa(config.ci + ":" + config.cs)
                                    }
                                }).toPromise()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        MapComponent.prototype.slideToFirst = function () {
            this.currentSliderImage = 0;
            this.calibrateSlider();
        };
        MapComponent.prototype.slideToLast = function () {
            this.currentSliderImage = this.sliderImages.length - 1;
            this.calibrateSlider();
        };
        MapComponent.prototype.slideToNextImage = function () {
            if (this.currentSliderImage < this.sliderImages.length - 1) {
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
                this.addMarker('53.533917,9.950556');
                this.addMarker('53.528472,9.953222');
                this.addMarker('53.530222,9.952333');
                this.addMarker('53.531556,9.951750');
                this.addMarker('53.531889,9.951583');
                this.addMarker('53.529583,9.952694');
            }
            catch (err) {
                console.error('Error setting up google maps plugin.');
                console.warn(err);
            }
        };
        MapComponent.prototype.addMarker = function (latLong, title) {
            new google.maps.Marker({
                position: { lat: +latLong.split(',')[0], lng: +latLong.split(',')[1] },
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
            sliderImage.src = assets_1.assets.error;
            console.error('Error loading: ', sliderImage.src);
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
                template: "\n        <div class=\"main-container\">\n\n            <!-- First Box (map)           -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n\n            <!-- Second Box (Grid)        -->\n            <div class=\"coordinates-outline\">\n                <form [formGroup]=\"gridReactiveForm\">\n                    <div class=\"table-grid\">\n                        <div class=\"heading-row\"></div>\n                        <div class=\"heading-row\">LOCATION<input type=\"text\" formControlName=\"locationFilter\"\n                                                                           class=\"grid-filter-input\"></div>\n                        <div class=\"heading-row\">DATA<input type=\"text\" formControlName=\"dateFilter\"\n                                                            class=\"grid-filter-input\"></div>\n                        <ng-container *ngFor=\"let gridRow of gridDataFiltered\">\n                            <div style=\"padding:3px\"><img [src]=\"gridRow.icon\"></div>\n                            <div>{{gridRow.coordinates}}</div>\n                            <div>{{gridRow.date}}</div>\n                        </ng-container>\n                    </div>\n                </form>\n            </div>\n\n            <!--  Third Box (Slider)    -->\n            <div>\n                <ng-container *ngIf=\"sliderImages\">\n\n                    <div class=\"slider-container\">\n                        <div class=\"imageSlider\" [ngStyle]=\"{'left':'-' + currentSliderImage * 550+'px'}\">\n                            <div *ngFor=\"let sliderImage of sliderImages;\"\n                                 [ngStyle]=\"{'background-image': 'url(' + sliderImage.src+ ')'}\"\n                                 style=\"background-size:cover;height:400px;width:550px;\">\n                                <img [src]=\"sliderImage.src\" (error)=\"invalidateImage(sliderImage);\">\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"controls\">\n                        <div style=\"padding: 2px;\">\n                            <img [src]=\"assets.noIcon\" width=\"25\"/>\n                        </div>\n                        <div style=\"display: flex; justify-content: center\">\n                            <div>\n                                <img src=\"{{assets.doubleArrowLeft}}\" class=\"navigation-icon\" (click)=\"slideToFirst()\"/>\n                                <img src=\"{{assets.arrowLeft}}\" class=\"navigation-icon\"\n                                     (click)=\"slideToPreviousImage()\"/>\n                                <span class=\"slide-numbers\">{{currentSliderImage + 1}} of {{sliderImages.length}}</span>\n                                <img src=\"{{assets.rightArrow}}\" class=\"navigation-icon\" (click)=\"slideToNextImage()\"/>\n                                <img src=\"{{assets.doubleArrowRight}}\" class=\"navigation-icon\" (click)=\"slideToLast()\"/>\n                            </div>\n                        </div>\n                        <div style=\"padding-left: 15px; padding-top: 2px;\">\n                            <img [src]=\"assets.checkIcon\" width=\"25\"/>\n                        </div>\n                    </div>\n                </ng-container>\n\n            </div>\n\n\n            <!-- Fourth Box  (Form)      -->\n            <div>\n                <div class=\"form-outline\">\n                    <div class=\"field\">\n                        <input type=\"text\" id=\"first-name\" name=\"first-name\" placeholder=\"Title\">\n                    </div>\n                    <div class=\"field\">\n                        <textarea id=\"description\" class=\"resizable\" name=\"description\"\n                                  placeholder=\"Short Description\"></textarea>\n                    </div>\n\n                    <div class=\"field\">\n                        Location: N75.34334 E36.4545454<br>\n                        Time: 14:00:00:00 PKST\n                    </div>\n\n                    <div style=\"display:grid; grid-template-columns: 0.7fr 0.3fr;\">\n                        <div>\n                            <div class=\"field\">\n                                <select id=\"states\" name=\"states\" class=\"dropdown\">\n                                    <option value=\"AL\">Assign To:</option>\n                                    <option value=\"CA\">California</option>\n                                    <option value=\"DE\">Delaware</option>\n                                    <option value=\"NY\">New York</option>\n                                    <option value=\"WY\">Wyoming</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div style=\"display:flex; flex-direction: row-reverse\">\n                            <button class=\"btn-primary\" type=\"button\" id=\"page-button-primary\">Send</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 3rem;\n            margin: 10px;\n        }\n\n        .heading-row {\n            background: #c3c3c3;\n            color: white;\n            height: 4.5rem;\n        }\n\n        .grid-filter-input {\n            height: 1.5rem;\n            color: white;\n            width: 20rem;\n            background-color: white;\n            color: black;\n            border: 0px;\n            font-size: 11px;\n            padding-left: 0px;\n            margin-top: 2px;\n        }\n        \n        .coordinates-outline {\n            border: 1px solid #cdcdcd;\n            border-radius: 15px;\n            overflow: hidden;\n        }\n\n        .table-grid {\n            display: grid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            border: 0.5px solid #cdcdcd;\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: #f0f0f098;\n            width: 100%;\n            border-radius: 10px;\n            height: 30px;\n            position: relative;\n            border: 1px solid;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n\n        .slider-container {\n            width: 550px;\n            height: 300px;\n            overflow: hidden;\n        }\n\n        .imageSlider {\n            position: relative;\n            transition-property: left;\n            transition-duration: 0.5s;\n            transition-timing-function: ease-in-out;\n            display: grid;\n            grid-template-columns: repeat(15, 550px);\n        }\n    "]
                // changeDetection: ChangeDetectionStrategy.OnPush
            }),
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