var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./assets", "@angular/forms", "rxjs/operators"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, assets_1, forms_1, operators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapsModule = exports.MapComponent = void 0;
    var MapComponent = /** @class */ (function () {
        function MapComponent(changeDetectionRef, fb) {
            this.changeDetectionRef = changeDetectionRef;
            this.fb = fb;
            this.assets = assets_1.assets;
            this.sliderImageObject = [{
                    image: 'assets/img/slider/1.jpg',
                    thumbImage: 'assets/img/slider/1_min.jpeg',
                    alt: 'alt of image',
                    title: 'title of image'
                }, {
                    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==',
                    thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==',
                    title: 'Image title',
                    alt: 'Image alt' //Optional: You can use this key if want to show image with alt
                }
            ];
        }
        MapComponent.prototype.resetGridFilter = function () {
            this.gridDataFiltered = this.gridData.slice();
        };
        MapComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.injectGoogleMapsScript();
            var instance = this.widgetInstance;
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
                $("#lightSlider").lightSlider({
                    controls: false,
                    item: 1,
                    pager: false,
                });
            }
            catch (err) {
                console.log('Error initialzing JQuery components.');
                console.warn(err);
            }
            this.changeDetectionRef.markForCheck();
        };
        MapComponent.prototype.googleMapsLibraryLoaded = function () {
            console.log('Plugin should be loaded by now.');
            try {
                var mapProperties = {
                    center: new google.maps.LatLng(35.2271, -80.8431),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
            }
            catch (err) {
                console.error('Error setting up google maps plugin.');
                console.warn(err);
            }
        };
        MapComponent.prototype.injectGoogleMapsScript = function () {
            var node = document.createElement('script'); // creates the script tag
            node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCs6jupPVulXGaxgb4Cer3oPtCIS2VPC68'; // sets the source (insert url in between quotes)
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
        MapComponent = __decorate([
            core_1.Component({
                template: "\n        <div class=\"main-container\">\n\n            <!-- First Box (map)           -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n\n            <!-- Second Box (Grid)        -->\n            <div>\n                <form [formGroup]=\"gridReactiveForm\">\n                    <div class=\"table-grid\">\n                        <div class=\"heading-row\"></div>\n                        <div class=\"heading-row\">Location <input type=\"text\" formControlName=\"locationFilter\"\n                                                                 class=\"grid-filter-input\"></div>\n                        <div class=\"heading-row\">Data<input type=\"text\" formControlName=\"dateFilter\"\n                                                            class=\"grid-filter-input\"></div>\n                        <ng-container *ngFor=\"let gridRow of gridDataFiltered\">\n                            <div style=\"padding:3px\"><img [src]=\"gridRow.icon\"></div>\n                            <div>{{gridRow.coordinates}}</div>\n                            <div>{{gridRow.date}}</div>\n                        </ng-container>\n                    </div>\n                </form>\n            </div>\n\n            <!--  Third Box (Slider)    -->\n            <div>\n                <ul id=\"lightSlider\" style=\"max-width: 500px\">\n                    <li>\n                        <img src=\"{{assets.industry1}}\"/>\n                    </li>\n                    <li data-thumb=\"some-industry-image.jpg\">\n                        <img src=\"some-industry-image.jpg\"/>\n                    </li>\n                    <li data-thumb=\"5f17ad65171f3.jpg\">\n                        <img src=\"5f17ad65171f3.jpg\"/>\n                    </li>\n                </ul>\n                <div class=\"controls\">\n                    <div style=\"padding: 2px;\">\n                        <img [src]=\"assets.noIcon\" width=\"25\"/>\n                    </div>\n                    <div style=\"display: flex; justify-content: center\">\n                        <div>\n                            <img src=\"{{assets.doubleArrowLeft}}\" class=\"navigation-icon\"/>\n                            <img src=\"{{assets.arrowLeft}}\" class=\"navigation-icon\"/>\n                            <span class=\"slide-numbers\">1 of 3</span>\n                            <img src=\"{{assets.rightArrow}}\" class=\"navigation-icon\"/>\n                            <img src=\"{{assets.doubleArrowRight}}\" class=\"navigation-icon\"/>\n                        </div>\n                    </div>\n                    <div style=\"padding-left: 15px; padding-top: 2px;\">\n                        <img [src]=\"assets.checkIcon\" width=\"25\"/>\n                    </div>\n                </div>\n            </div>\n\n\n            <!-- Fourth Box  (Form)      -->\n            <div>\n                <div class=\"form-outline\">\n                    <div class=\"field\">\n                        <input type=\"text\" id=\"first-name\" name=\"first-name\" placeholder=\"Title\">\n                    </div>\n                    <div class=\"field\">\n                        <textarea id=\"description\" class=\"resizable\" name=\"description\"\n                                  placeholder=\"Short Description\"></textarea>\n                    </div>\n\n                    <div class=\"field\">\n                        Location: N75.34334 E36.4545454<br>\n                        Time: 14:00:00:00 PKST\n                    </div>\n\n                    <div style=\"display:grid; grid-template-columns: 0.7fr 0.3fr;\">\n                        <div>\n                            <div class=\"field\">\n                                <select id=\"states\" name=\"states\" class=\"dropdown\">\n                                    <option value=\"AL\">Assign To:</option>\n                                    <option value=\"CA\">California</option>\n                                    <option value=\"DE\">Delaware</option>\n                                    <option value=\"NY\">New York</option>\n                                    <option value=\"WY\">Wyoming</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div style=\"display:flex; flex-direction: row-reverse\">\n                            <button class=\"btn-primary\" type=\"button\" id=\"page-button-primary\">Send</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 3rem;\n            margin: 10px;\n        }\n\n        .heading-row {\n            background: #50535c;\n            color: white;\n            height: 4.5rem;\n        }\n\n        .grid-filter-input {\n            height: 1.5rem;\n            color: white;\n            width: 20rem;\n            border: 1px solid gray;\n            font-size: 11px;\n            padding-left: 0px;\n            margin-top: 2px;\n        }\n\n        .table-grid {\n            display: grid;\n            border: 1px solid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            border: 0.5px solid;\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: #f0f0f098;\n            width: 100%;\n            border-radius: 10px;\n            height: 30px;\n            position: relative;\n            border: 1px solid;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n    "]
                // changeDetection: ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core_1.ChangeDetectorRef, forms_1.FormBuilder])
        ], MapComponent);
        return MapComponent;
    }());
    exports.MapComponent = MapComponent;
    var MapsModule = /** @class */ (function () {
        function MapsModule() {
        }
        MapsModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule, forms_1.ReactiveFormsModule, forms_1.FormsModule],
                declarations: [MapComponent],
                entryComponents: [MapComponent]
            })
        ], MapsModule);
        return MapsModule;
    }());
    exports.MapsModule = MapsModule;
});
//# sourceMappingURL=main.js.map