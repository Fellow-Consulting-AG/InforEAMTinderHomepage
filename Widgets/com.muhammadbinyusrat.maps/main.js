var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./assets"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, assets_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CardListModule = exports.CardListComponent = void 0;
    var CardListComponent = /** @class */ (function () {
        function CardListComponent(changeDetectionRef) {
            this.changeDetectionRef = changeDetectionRef;
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
        CardListComponent.prototype.ngOnInit = function () {
            var _this = this;
            var instance = this.widgetInstance;
            instance.settingsSaved = function () { return _this.updateSortOrder(); };
            instance.getMetadata = function () { return _this.getMetadata(); };
            var mapProperties = {
                center: new google.maps.LatLng(35.2271, -80.8431),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
            // this.updateSortOrder();
            this.gridData = [{ icon: assets_1.assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423' },
                { icon: assets_1.assets.noIcon, coordinates: '76.4534534, 34.09435435', data: '23423423' },
                { icon: assets_1.assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423' },
                { icon: assets_1.assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423' },
            ];
            // ** INITIALIZE JQUERY PLUGINS
            // @ts-ignore
            window.$('.dropdown').dropdown();
            // @ts-ignore
            window.$("#lightSlider").lightSlider({
                controls: false,
                item: 1,
                pager: false,
            });
        };
        CardListComponent.prototype.updateSortOrder = function () {
            // this.sortOrder = this.widgetContext.getSettings().get("order", "asc");
            this.changeDetectionRef.markForCheck();
        };
        CardListComponent.prototype.getMetadata = function () {
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
        ], CardListComponent.prototype, "widgetContext", void 0);
        __decorate([
            core_1.Input(),
            __metadata("design:type", lime_1.IWidgetInstance)
        ], CardListComponent.prototype, "widgetInstance", void 0);
        __decorate([
            core_1.ViewChild("map", { static: true }),
            __metadata("design:type", Object)
        ], CardListComponent.prototype, "mapElement", void 0);
        CardListComponent = __decorate([
            core_1.Component({
                template: "\n        <div class=\"main-container\">\n\n            <!-- First Box (map)           -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n\n            <!-- Second Box (Grid)        -->\n            <div>\n                <div class=\"table-grid\">\n                    <div class=\"heading-row\"></div>\n                    <div class=\"heading-row\">Location</div>\n                    <div class=\"heading-row\">Data</div>\n                    <ng-container *ngFor=\"let gridRow of gridData\">\n                        <div style=\"padding:3px\"><img [src]=\"gridRow.icon\"></div>\n                        <div>{{gridRow.coordinates}}</div>\n                        <div>{{gridRow.data}}</div>\n                    </ng-container>\n                </div>\n            </div>\n\n            <!--  Third Box (Slider)    -->\n            <div>\n                <ul id=\"lightSlider\" style=\"max-width: 500px\">\n                    <li data-thumb=\"/com.muhammadbinyusrat.maps/images/industr.jpeg\">\n                        <img src=\"/com.muhammadbinyusrat.maps/images/industry.jpeg\"/>\n                    </li>\n                    <li data-thumb=\"/com.muhammadbinyusrat.maps/images/some-industry-image.jpg\">\n                        <img src=\"/com.muhammadbinyusrat.maps/images/some-industry-image.jpg\"/>\n                    </li>\n                    <li data-thumb=\"/com.muhammadbinyusrat.maps/images/5f17ad65171f3.jpg\">\n                        <img src=\"/com.muhammadbinyusrat.maps/images/5f17ad65171f3.jpg\"/>\n                    </li>\n                </ul>\n                <div class=\"controls\">\n                    <div style=\"padding: 2px;\">\n                        <img [src]=\"assets.noIcon\" width=\"25\"/>\n                    </div>\n                    <div style=\"display: flex; justify-content: center\">\n                        <div>\n                            <img src=\"/com.muhammadbinyusrat.maps/images/left_double.png\" class=\"navigation-icon\"/>\n                            <img src=\"/com.muhammadbinyusrat.maps/images/left.png\" class=\"navigation-icon\"/>\n                            <span class=\"slide-numbers\">1 of 3</span>\n                            <img src=\"/com.muhammadbinyusrat.maps/images/right.png\" class=\"navigation-icon\"/>\n                            <img src=\"/com.muhammadbinyusrat.maps/images/right_double.png\" class=\"navigation-icon\"/>\n                        </div>\n                    </div>\n                    <div style=\"padding-left: 15px; padding-top: 2px;\">\n                        <img [src]=\"assets.checkIcon\" width=\"25\"/>\n                    </div>\n                </div>\n            </div>\n\n\n            <!-- Fourth Box  (Form)      -->\n            <div>\n                <div class=\"form-outline\">\n                    <div class=\"field\">\n                        <input type=\"text\" id=\"first-name\" name=\"first-name\" placeholder=\"Title\">\n                    </div>\n                    <div class=\"field\">\n                        <textarea id=\"description\" class=\"resizable\" name=\"description\"\n                                  placeholder=\"Short Description\"></textarea>\n                    </div>\n\n                    <div class=\"field\">\n                        Location: N75.34334 E36.4545454<br>\n                        Time: 14:00:00:00 PKST\n                    </div>\n\n                    <div style=\"display:grid; grid-template-columns: 0.7fr 0.3fr;\">\n                        <div>\n                            <div class=\"field\">\n                                <select id=\"states\" name=\"states\" class=\"dropdown\">\n                                    <option value=\"AL\">Assign To:</option>\n                                    <option value=\"CA\">California</option>\n                                    <option value=\"DE\">Delaware</option>\n                                    <option value=\"NY\">New York</option>\n                                    <option value=\"WY\">Wyoming</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div style=\"display:flex; flex-direction: row-reverse\">\n                            <button class=\"btn-primary\" type=\"button\" id=\"page-button-primary\">Send</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 3rem;\n            margin: 10px;\n        }\n\n        .heading-row {\n            background: #50535c;\n            color: white;\n            height: 3rem;\n        }\n\n        .table-grid {\n            display: grid;\n            border: 1px solid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            border: 0.5px solid;\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: #f0f0f098;\n            width: 100%;\n            border-radius: 10px;\n            height: 30px;\n            position: relative;\n            border: 1px solid;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n    "]
                // changeDetection: ChangeDetectionStrategy.OnPush
            }),
            __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
        ], CardListComponent);
        return CardListComponent;
    }());
    exports.CardListComponent = CardListComponent;
    var CardListModule = /** @class */ (function () {
        function CardListModule() {
        }
        CardListModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule],
                declarations: [CardListComponent],
                entryComponents: [CardListComponent]
            })
        ], CardListModule);
        return CardListModule;
    }());
    exports.CardListModule = CardListModule;
});
//# sourceMappingURL=main.js.map