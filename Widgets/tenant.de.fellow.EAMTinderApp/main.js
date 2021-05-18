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
            this.shortDescription = '';
        }
        MapComponent.prototype.keypress = function (e) {
            this.onKeyPress(e);
        };
        MapComponent.prototype.resetGridFilter = function () {
            this.gridDataFiltered = this.inforMatchingDocuments.slice();
        };
        MapComponent.prototype.refreshToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            config = {
                                "ti": "FELLOWCONSULTING_DEV",
                                "cn": "EAM API",
                                "dt": "12",
                                "ci": "FELLOWCONSULTING_DEV~1NEdTWXC2FsUzM1W8hie8gV5gHSm62y02GeH041FnxY",
                                "cs": "Jn3qr3UklSDWAudfxIL7ooQYV64_2gCyAv5CkraPza1LeZU8j5i_YYMz95tNKK6z9RN0MPmUdILasD3qkS0tFQ",
                                "iu": "https://mingle-ionapi.eu1.inforcloudsuite.com",
                                "pu": "https://mingle-sso.eu1.inforcloudsuite.com:443/FELLOWCONSULTING_DEV/as/",
                                "oa": "authorization.oauth2",
                                "ot": "token.oauth2",
                                "or": "revoke_token.oauth2",
                                "ev": "V1480769020",
                                "v": "1.0",
                                "saak": "FELLOWCONSULTING_DEV#FMuw2CLqvumKgSGh0o9kMx_hJIMh5MA4LUYNXjK9Jb6af1RU6fvVdZTQduDwXe2U5p3vGJmNOtX1O-ixGjQSGA",
                                "sask": "f__eJMNVTRM8I0R42Jo0nRhF8ZXCPqgKfYRfamauBaDm0lviDmUlbxTSVC5Z8Ya1BYBUca-zC4Goj3FRrkCR7A"
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
        MapComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var specialToken, err_1, instance, _a;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.refreshToken()];
                        case 1:
                            specialToken = _b.sent();
                            console.log('special token is ', specialToken);
                            return [3 /*break*/, 3];
                        case 2:
                            err_1 = _b.sent();
                            console.error('Error while getting special token.', err_1);
                            return [3 /*break*/, 3];
                        case 3:
                            this.injectMeta();
                            this.injectGoogleMapsScript();
                            instance = this.widgetInstance;
                            this.gridReactiveForm = this.fb.group({
                                locationFilter: '',
                                dateFilter: '',
                                statusFilter: ''
                            });
                            this.gridReactiveForm.get('locationFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '') {
                                    _this.resetGridFilter();
                                    _this.clearSelectionOnTableData();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (locationFilterValue) {
                                _this.gridReactiveForm.get('dateFilter').setValue('');
                                _this.gridDataFiltered = _this.inforMatchingDocuments.filter(function (entry) { return entry.attributes.pin.includes(locationFilterValue); });
                            });
                            this.gridReactiveForm.get('dateFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '') {
                                    _this.resetGridFilter();
                                    _this.clearSelectionOnTableData();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (dateFilterValue) {
                                _this.gridReactiveForm.get('locationFilter').setValue('');
                                _this.gridDataFiltered = _this.inforMatchingDocuments.filter(function (entry) { return entry.date.toLowerCase().includes(dateFilterValue.toLowerCase()); });
                            });
                            this.gridReactiveForm.get('statusFilter').valueChanges.pipe(operators_1.filter(function (value) {
                                if (value === '' || value === 'all') {
                                    _this.resetGridFilter();
                                    _this.clearSelectionOnTableData();
                                    return false;
                                }
                                return true;
                            })).subscribe(function (dateFilterValue) {
                                if (dateFilterValue === '10') {
                                    dateFilterValue = null;
                                }
                                _this.gridReactiveForm.get('locationFilter').setValue('');
                                _this.gridDataFiltered = _this.inforMatchingDocuments.filter(function (entry) { return entry.status == dateFilterValue; });
                            });
                            _a = this;
                            return [4 /*yield*/, this.getToken()];
                        case 4:
                            _a.token = (_b.sent());
                            // this.http.get('https://run.mocky.io/v3/da377b86-8cac-4a35-a4a0-fd6c94ff1d82').pipe(take(1)).toPromise().then((apiResponse: any) => {
                            this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
                                headers: new http_1.HttpHeaders({
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + this.token
                                })
                            }).toPromise().then(function (apiResponse) {
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
        MapComponent.prototype.enableWorkOrderForm = function () {
            if (this.workOrderFormVisible) {
                return;
            }
            this.workOrderFormVisible = true;
            setTimeout(function () {
                // @ts-ignore
                $('.dropdown').dropdown();
            }, 200);
        };
        MapComponent.prototype.disableWorkOrderForm = function () {
            this.workOrderFormVisible = false;
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
        };
        MapComponent.prototype.slideToLast = function () {
            this.currentSliderImage = this.inforMatchingDocuments.length - 1;
        };
        MapComponent.prototype.slideToNextImage = function () {
            if (this.currentSliderImage < this.inforMatchingDocuments.length - 1) {
                this.currentSliderImage++;
            }
        };
        MapComponent.prototype.slideToPreviousImage = function () {
            if (this.currentSliderImage > 0) {
                this.currentSliderImage--;
            }
        };
        MapComponent.prototype.googleMapsLibraryLoaded = function () {
            console.log('Plugin should be loaded by now.');
            try {
                var mapProperties = {
                    center: new google.maps.LatLng(53.544258, 9.952000),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    controlSize: 20
                };
                this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
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
        MapComponent.prototype.updateItemStatus = function (newStatusValue) {
            this.http.put('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token
                })
            }).toPromise().then(function (apiResponse) {
            });
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
        MapComponent.prototype.selectItem = function (gridRow) {
            this.gridDataFiltered.forEach(function (item) {
                item.selected = false;
            });
            gridRow.selected = true;
        };
        MapComponent.prototype.clearSelectionOnTableData = function () {
            this.gridDataFiltered.forEach(function (item) {
                item.selected = false;
            });
        };
        MapComponent.prototype.onKeyPress = function (event) {
            if (event.code === 'Enter') {
                console.log(this.inforMatchingDocuments);
                var indexOfSelectedImage = this.inforMatchingDocuments.findIndex(function (item) { return item.selected === true; });
                if (indexOfSelectedImage != -1) {
                    this.currentSliderImage = indexOfSelectedImage;
                    this.enableWorkOrderForm();
                }
            }
            if (event.code === 'KeyA') {
                this.gridDataFiltered.forEach(function (item) { return item.selected && (item.status = "40"); });
            }
            if (event.code === 'KeyX') {
                this.gridDataFiltered.forEach(function (item) { return item.selected && (item.status = "30"); });
            }
            // On Down Arrow Press
            if (event.key === 'ArrowDown') {
                var indexOfSelectedRow = this.gridDataFiltered.findIndex(function (item) { return item.selected; });
                if (this.gridDataFiltered[indexOfSelectedRow + 1]) {
                    this.gridDataFiltered[indexOfSelectedRow + 1].selected = true;
                    if (this.gridDataFiltered[indexOfSelectedRow]) {
                        this.gridDataFiltered[indexOfSelectedRow].selected = false;
                    }
                }
                // for selection loop
                /*else {
                    this.gridDataFiltered[0].selected = true;
                    this.gridDataFiltered[this.gridDataFiltered.length - 1].selected = false;
                }*/
                if (indexOfSelectedRow < 5) {
                    event.preventDefault();
                }
                /*if (this.gridDataFiltered.every((item: InforDocument) => !item.selected)) {
                    //Select the top item in the list.
                    this.gridDataFiltered[0].selected = true;
                    return;
                }
                this.selectNextItemInTable();*/
            }
            // On Up Arrow Press
            if (event.key === 'ArrowUp') {
                var indexOfSelectedRow = this.gridDataFiltered.findIndex(function (item) { return item.selected; });
                if (this.gridDataFiltered[indexOfSelectedRow - 1]) {
                    this.gridDataFiltered[indexOfSelectedRow - 1].selected = true;
                    if (this.gridDataFiltered[indexOfSelectedRow]) {
                        this.gridDataFiltered[indexOfSelectedRow].selected = false;
                    }
                }
                // for selection loop
                /*else {
                    this.gridDataFiltered[this.gridDataFiltered.length - 1].selected = true;
                    this.gridDataFiltered[0].selected = false;
                }*/
                if (indexOfSelectedRow > this.gridDataFiltered.length - 5) {
                    event.preventDefault();
                }
                /*if (this.gridDataFiltered.every((item: InforDocument) => !item.selected)) {
                    //Select the top item in the list.
                    this.gridDataFiltered[this.gridDataFiltered.length - 1].selected = true;
                    return;
                }
                this.gridDataFiltered.reverse();
                this.selectNextItemInTable();
                this.gridDataFiltered.reverse();
                this.clearSelectionOnTableData();*/
            }
        };
        // selectNextItemInTable() {
        //     let itemSwitched = false;
        //     this.gridDataFiltered.forEach((item: InforDocument, index: number) => {
        //         if (index === this.gridDataFiltered.length) {
        //             itemSwitched = false;
        //             return;
        //         }
        //         if (item.selected) {
        //             item.selected = false;
        //             itemSwitched = true;
        //             return;
        //         }
        //         if (itemSwitched) {
        //             item.selected = true;
        //             itemSwitched = false;
        //         }
        //     });
        // }
        MapComponent.prototype.send = function () {
            console.log('sending...', this.token);
            console.log('short description is ', this.inforMatchingDocuments[this.currentSliderImage].shortDescription);
            var bodid = new Date().getTime();
            var creationDateTime = new Date().toISOString();
            var id = Math.floor(new Date().getTime() / 1000000000);
            console.log('bodid is ', bodid);
            console.log('creationDateTime is ', creationDateTime);
            console.log('id is ', id);
            var data = {
                "documentName": "Sync.FellowWO",
                "messageId": "message741569",
                "fromLogicalId": "lid://infor.ims.testims",
                "toLogicalId": "lid://default",
                "document": {
                    "value": "<SyncFellowWO><ApplicationArea><Sender><LogicalID>infor.ims.testims</LogicalID><ComponentID>External</ComponentID><ConfirmationCode>OnError</ConfirmationCode></Sender>\n<CreationDateTime>" + creationDateTime + "</CreationDateTime>\n<BODID>infor.ims.testims_bod:" + bodid + ":123fc4a8-41f1-4385-8d05-" + bodid + "</BODID>\n</ApplicationArea><DataArea><Sync><AccountingEntityID>JR01_01</AccountingEntityID><LocationID>01</LocationID><ActionCriteria><ActionExpression actionCode=\"Add\"/><ChangeStatus><Code>Released</Code><Description>Freigegeben</Description>\n<EffectiveDateTime>" + creationDateTime + "</EffectiveDateTime></ChangeStatus></ActionCriteria></Sync><FellowWO>\n<ID>" + id + "</ID>\n<Description>" + this.inforMatchingDocuments[this.currentSliderImage].shortDescription + "</Description>\n<Equipment>0000J" + id + "</Equipment><Type>Breakdown</Type><Department>006</Department><Status>Freigegeben</Status><Organisation>*</Organisation></FellowWO></DataArea></SyncFellowWO>",
                    "encoding": "NONE",
                    "characterSet": "UTF-8"
                }
            };
            console.log(data.document.value);
            this.http.post('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IONSERVICES/api/ion/messaging/service/v2/message', data, {
                headers: new http_1.HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.token
                })
            }).toPromise().then(function (apiResponse) {
                console.log('api response is ', apiResponse);
            }).catch(function (err) {
                console.error('error response ', err);
            });
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
        __decorate([
            core_1.HostListener('document:keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], MapComponent.prototype, "keypress", null);
        MapComponent = __decorate([
            core_1.Component({
                template: "\n\n        <!-- **************************************   -->\n        <!-- *********      H T M L      **********   -->\n        <!-- **************************************   -->\n\n\n        <div class=\"main-container\">\n            <!-- First Box (map)           -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n\n            <!-- Second Box (Grid)        -->\n            <div class=\"coordinates-outline\">\n                <form [formGroup]=\"gridReactiveForm\">\n                    <div class=\"table-grid\">\n                        <div class=\"heading-row\">\n                            <select id=\"states\" name=\"states\" style=\"width: 1.5vw;\" formControlName=\"statusFilter\">\n                                <option value=\"all\">All</option>\n                                <option value=\"10\">Initial</option>\n                                <option value=\"30\">Rejected</option>\n                                <option value=\"40\">Approved</option>\n                            </select>\n                        </div>\n                        <div class=\"heading-row\">LOCATION<input type=\"text\" formControlName=\"locationFilter\"\n                                                                class=\"grid-filter-input\"></div>\n                        <div class=\"heading-row\">DATA<input type=\"text\" formControlName=\"dateFilter\"\n                                                            class=\"grid-filter-input\"></div>\n                        <ng-container *ngFor=\"let gridRow of gridDataFiltered;\">\n                            <div style=\"padding:3px; border-bottom: 3px solid #f0f0f0;\"\n                                 [style.background-image]=\"gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null\">\n                                <img width=\"20\" style=\"place-self: center\"\n                                     [src]=\"gridRow.status == '40' ? assets.checkIcon : gridRow.status == '30' ? assets.noIcon : ''\">\n                            </div>\n                            <div style=\"border-bottom: 3px solid #f0f0f0;\"\n                                 [style.background-image]=\"gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null\">{{gridRow.attributes.pin}}</div>\n                            <div style=\"border-bottom: 3px solid #f0f0f0;\"\n                                 [style.background-image]=\"gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null\">{{gridRow.date}}</div>\n                        </ng-container>\n                    </div>\n                </form>\n            </div>\n\n            <!--  Third Box (Slider)    -->\n            <div [ngClass]=\"{'expanded': !workOrderFormVisible}\">\n                <ng-container *ngIf=\"inforMatchingDocuments\">\n                    <div class=\"mby-slider-wrapper\">\n                        <div class=\"slider-container\">\n                            <div class=\"imageSlider\" [ngStyle]=\"{'left':'-' + currentSliderImage * 550+'px'}\">\n                                <div *ngFor=\"let sliderImage of inforMatchingDocuments;\"\n                                     [ngStyle]=\"{'background-image': 'url(' + sliderImage.imageSrc+ ')'}\"\n                                     style=\"background-size:cover;height:400px;width:550px;\">\n                                    <img [src]=\"sliderImage.imageSrc\" (error)=\"invalidateImage(sliderImage);\">\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"controls\">\n                            <div style=\"padding: 2px; cursor: pointer\"\n                                 (click)=\"inforMatchingDocuments[currentSliderImage].status = 30;disableWorkOrderForm();\">\n                                <img [src]=\"assets.noIcon\" width=\"23\"/>\n                            </div>\n                            <div style=\"display: flex; justify-content: center\">\n                                <div>\n                                    <img src=\"{{assets.doubleArrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToFirst()\"/>\n                                    <img src=\"{{assets.arrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToPreviousImage()\"/>\n                                    <span class=\"slide-numbers\">{{currentSliderImage + 1}}\n                                        of {{inforMatchingDocuments.length}}</span>\n                                    <img src=\"{{assets.rightArrow}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToNextImage()\"/>\n                                    <img src=\"{{assets.doubleArrowRight}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToLast()\"/>\n                                </div>\n                            </div>\n                            <div style=\"padding-left: 19px; padding-top: 2px;cursor: pointer;\"\n                                 (click)=\"inforMatchingDocuments[currentSliderImage].status = 40; enableWorkOrderForm();\">\n                                <img [src]=\"assets.checkIcon\" width=\"23\"/>\n                            </div>\n                        </div>\n                    </div>\n                </ng-container>\n            </div>\n\n            <!-- Fourth Box  (Form)      -->\n            <div *ngIf=\"workOrderFormVisible\">\n                <div class=\"form-outline\">\n                    <div style=\"font-size: 16px; margin-bottom: 15px\">QUICK WORKORDER</div>\n                    <div style=\"display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px\">\n                        <div>\n                            <div>\n                                <input style=\"width: 100%\" type=\"text\" id=\"first-name\" name=\"first-name\"\n                                       placeholder=\"Title\">\n                            </div>\n                            <div style=\"margin-top: 10px;\">\n                                <textarea style=\"width: 100%; height: 120px\" id=\"description\" name=\"description\"\n                                          [(ngModel)]=\"inforMatchingDocuments[currentSliderImage].shortDescription\"\n                                          placeholder=\"Short Description\"></textarea>\n                            </div>\n                        </div>\n                        <div>\n                            <div>\n                                <div [ngStyle]=\"{'background-image': 'url(' + inforMatchingDocuments[currentSliderImage].imageSrc+ ')'}\"\n                                     style=\"background-size:cover;height:165px\">\n                                </div>\n                            </div>\n                            <div style=\"float: right; font-size: 12px; margin-top: 10px\">\n                                Location: {{inforMatchingDocuments[currentSliderImage].attributes['pin']}}<br>\n                                Time: {{inforMatchingDocuments[currentSliderImage].date}}\n                            </div>\n                        </div>\n                    </div>\n\n                    <div style=\"display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px; margin-top: 20px\">\n                        <div>\n                            <select style=\"width: 100%;\" id=\"states\" name=\"states\" class=\"dropdown\">\n                                <option value=\"AL\">Assign To:</option>\n                                <option value=\"CA\">California</option>\n                                <option value=\"DE\">Delaware</option>\n                                <option value=\"NY\">New York</option>\n                                <option value=\"WY\">Wyoming</option>\n                            </select>\n                        </div>\n                        <div>\n                            <button style=\"float: right\" class=\"btn-primary\" type=\"button\" id=\"page-button-primary\"\n                                    (click)=\"send()\">\n                                Send\n                            </button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n\n        /*************************************/\n        /*****           C S S           *****/\n        /*************************************/\n\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 3rem;\n            margin: 10px;\n        }\n\n        .expanded {\n            grid-column: 1 / -1;\n            margin-left: 25%;\n        }\n\n        .heading-row {\n            background-color: #c3c3c3;\n            color: white;\n            height: 5rem;\n        }\n\n        .grid-filter-input {\n            height: 1.5rem;\n            color: white;\n            width: 15rem;\n            background-color: white;\n            color: black;\n            border: 0px;\n            font-size: 11px;\n            padding-left: 0px;\n            margin-top: 2px;\n        }\n\n        .coordinates-outline {\n            border: 1px solid #cdcdcd;\n            border-radius: 15px;\n            height: 300px;\n            overflow-y: scroll;\n        }\n\n        .table-grid {\n            display: grid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            /*border: 0.5px solid #cdcdcd;*/\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n            height: 310px;\n            color: #ccc;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: white;\n            width: 98%;\n            margin-left: 1%;\n            padding-top: 1px;\n            border-radius: 5px;\n            height: 30px;\n            position: relative;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n\n        .mby-slider-wrapper {\n            display: grid;\n            width: 550px;\n        }\n\n        .slider-container {\n            height: 300px;\n            overflow: hidden;\n        }\n\n        .imageSlider {\n            display: grid;\n            position: relative;\n            transition-property: left;\n            transition-duration: 0.5s;\n            transition-timing-function: ease-in-out;\n            grid-template-columns: repeat(15, 550px);\n        }\n\n        /* Dropdown: Assign To: Label color */\n        ::ng-deep .dropdown span {\n            color: #ccc;\n        }\n\n        /* Dropdown: Assign To: Width */\n        ::ng-deep .dropdown-wrapper {\n            width: 100%;\n        }\n    "]
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