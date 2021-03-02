/// <reference types="@types/googlemaps" />
import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgModule, OnInit, ViewChild} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingMetadata, WidgetSettingsType} from "lime";
import {assets} from './assets';

@Component({
    template: `
        <div class="main-container">

            <!-- First Box (map)           -->
            <div>
                <div #map style="width:100%;height:300px"></div>
            </div>

            <!-- Second Box (Grid)        -->
            <div>
                <div class="table-grid">
                    <div class="heading-row"></div>
                    <div class="heading-row">Location</div>
                    <div class="heading-row">Data</div>
                    <ng-container *ngFor="let gridRow of gridData">
                        <div style="padding:3px"><img [src]="gridRow.icon"></div>
                        <div>{{gridRow.coordinates}}</div>
                        <div>{{gridRow.data}}</div>
                    </ng-container>
                </div>
            </div>

            <!--  Third Box (Slider)    -->
            <div>
                <ul id="lightSlider" style="max-width: 500px">
                    <li data-thumb="/com.muhammadbinyusrat.maps/images/industr.jpeg">
                        <img src="/com.muhammadbinyusrat.maps/images/industry.jpeg"/>
                    </li>
                    <li data-thumb="/com.muhammadbinyusrat.maps/images/some-industry-image.jpg">
                        <img src="/com.muhammadbinyusrat.maps/images/some-industry-image.jpg"/>
                    </li>
                    <li data-thumb="/com.muhammadbinyusrat.maps/images/5f17ad65171f3.jpg">
                        <img src="/com.muhammadbinyusrat.maps/images/5f17ad65171f3.jpg"/>
                    </li>
                </ul>
                <div class="controls">
                    <div style="padding: 2px;">
                        <img [src]="assets.noIcon" width="25"/>
                    </div>
                    <div style="display: flex; justify-content: center">
                        <div>
                            <img src="/com.muhammadbinyusrat.maps/images/left_double.png" class="navigation-icon"/>
                            <img src="/com.muhammadbinyusrat.maps/images/left.png" class="navigation-icon"/>
                            <span class="slide-numbers">1 of 3</span>
                            <img src="/com.muhammadbinyusrat.maps/images/right.png" class="navigation-icon"/>
                            <img src="/com.muhammadbinyusrat.maps/images/right_double.png" class="navigation-icon"/>
                        </div>
                    </div>
                    <div style="padding-left: 15px; padding-top: 2px;">
                        <img [src]="assets.checkIcon" width="25"/>
                    </div>
                </div>
            </div>


            <!-- Fourth Box  (Form)      -->
            <div>
                <div class="form-outline">
                    <div class="field">
                        <input type="text" id="first-name" name="first-name" placeholder="Title">
                    </div>
                    <div class="field">
                        <textarea id="description" class="resizable" name="description"
                                  placeholder="Short Description"></textarea>
                    </div>

                    <div class="field">
                        Location: N75.34334 E36.4545454<br>
                        Time: 14:00:00:00 PKST
                    </div>

                    <div style="display:grid; grid-template-columns: 0.7fr 0.3fr;">
                        <div>
                            <div class="field">
                                <select id="states" name="states" class="dropdown">
                                    <option value="AL">Assign To:</option>
                                    <option value="CA">California</option>
                                    <option value="DE">Delaware</option>
                                    <option value="NY">New York</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>
                        </div>
                        <div style="display:flex; flex-direction: row-reverse">
                            <button class="btn-primary" type="button" id="page-button-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .main-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(auto-fit, 1fr);
            gap: 3rem;
            margin: 10px;
        }

        .heading-row {
            background: #50535c;
            color: white;
            height: 3rem;
        }

        .table-grid {
            display: grid;
            border: 1px solid;
            grid-template-columns: 0.1fr 0.9fr 0.9fr;
        }

        .table-grid > div {
            padding: 10px;
            line-height: 10px;
            border: 0.5px solid;
            display: grid;
        }

        .form-outline {
            border: 1px solid #ccc;
            border-radius: 15px;
            padding: 10px;
        }

        .controls {
            display: grid;
            grid-template-columns: 0.1fr 1fr 0.1fr;
            background-color: #f0f0f098;
            width: 100%;
            border-radius: 10px;
            height: 30px;
            position: relative;
            border: 1px solid;
            bottom: 40px;
        }

        .navigation-icon {
            cursor: pointer;
            height: 25px;
        }

        .slide-numbers {
            font-size: 16px;
            position: relative;
            top: -7px;
        }
    `]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit, IWidgetComponent {
    @Input() widgetContext: IWidgetContext;
    @Input() widgetInstance: IWidgetInstance;
    @ViewChild("map", {static: true}) mapElement: any;
    map: google.maps.Map;
    gridData: any;
    assets = assets;

    sliderImageObject: Array<object> = [{
        image: 'assets/img/slider/1.jpg',
        thumbImage: 'assets/img/slider/1_min.jpeg',
        alt: 'alt of image',
        title: 'title of image'
    }, {
        image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
        thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
        title: 'Image title', //Optional: You can use this key if want to show image with title
        alt: 'Image alt' //Optional: You can use this key if want to show image with alt
    }
    ];

    constructor(private readonly changeDetectionRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        const instance = this.widgetInstance;
        instance.settingsSaved = () => this.updateSortOrder();
        instance.getMetadata = () => this.getMetadata();

        const mapProperties = {
            center: new google.maps.LatLng(35.2271, -80.8431),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        // this.updateSortOrder();
        this.gridData = [{icon: assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423'},
            {icon: assets.noIcon, coordinates: '76.4534534, 34.09435435', data: '23423423'},
            {icon: assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423'},
            {icon: assets.checkIcon, coordinates: '76.4534534, 34.09435435', data: '23423423'},
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
    }

    private updateSortOrder() {
        // this.sortOrder = this.widgetContext.getSettings().get("order", "asc");
        this.changeDetectionRef.markForCheck();
    }

    private getMetadata(): IWidgetSettingMetadata[] {
        // Dynamically create metadata for the standard metadata controlled settings UI.
        // For dynamic settings / values that need to be resolved asynchronously,
        // implement IWidgetInstance getMetadataAsync() instead.
        // For known/hardcoded values, place the metadata in the manifest instead.

        return [{
            labelId: "order",
            type: WidgetSettingsType.selectorType,
            name: "order",
            defaultValue: "desc",
            values: [
                {textId: "ascending", value: "asc"},
                {textId: "descending", value: "desc"}
            ]
        }];
    }
}

@NgModule({
    imports: [CommonModule, SohoListViewModule],
    declarations: [CardListComponent],
    entryComponents: [CardListComponent]
})
export class CardListModule {
}
