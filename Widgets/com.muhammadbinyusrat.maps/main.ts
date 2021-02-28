import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgModule, OnInit, ViewChild} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingMetadata, WidgetSettingsType} from "lime";
import {assets} from './assets';

@Component({
    template: `
        <div class="main-container">
            <div>
                <div #map style="width:100%;height:300px"></div>
            </div>
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
            <div>third box</div>
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
                                <select id="states" name="states">
                                    <option value="AL">Assigned To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
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
    `]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent implements OnInit, IWidgetComponent {
    @Input() widgetContext: IWidgetContext;
    @Input() widgetInstance: IWidgetInstance;
    @ViewChild("map", {static: true}) mapElement: any;
    map: google.maps.Map;
    gridData: any;

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
        ]
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
