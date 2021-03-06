/// <reference types="@types/googlemaps" />
import {CommonModule} from "@angular/common";
import {ChangeDetectorRef, Component, Input, NgModule, OnInit, ViewChild} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingMetadata, WidgetSettingsType} from "lime";
import {assets} from './assets';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filter} from "rxjs/operators";

@Component({
    template: `
        <div class="main-container">

            <!-- First Box (map)           -->
            <div>
                <div #map style="width:100%;height:300px"></div>
            </div>

            <!-- Second Box (Grid)        -->
            <div>
                <form [formGroup]="gridReactiveForm">
                    <div class="table-grid">
                        <div class="heading-row"></div>
                        <div class="heading-row">Location <input type="text" formControlName="locationFilter"
                                                                 class="grid-filter-input"></div>
                        <div class="heading-row">Data<input type="text" formControlName="dateFilter"
                                                            class="grid-filter-input"></div>
                        <ng-container *ngFor="let gridRow of gridDataFiltered">
                            <div style="padding:3px"><img [src]="gridRow.icon"></div>
                            <div>{{gridRow.coordinates}}</div>
                            <div>{{gridRow.date}}</div>
                        </ng-container>
                    </div>
                </form>
            </div>

            <!--  Third Box (Slider)    -->
            <div>
                <ul id="lightSlider" style="max-width: 500px">
                    <li>
                        <img src="{{assets.industry1}}"/>
                    </li>
                    <li data-thumb="some-industry-image.jpg">
                        <img src="some-industry-image.jpg"/>
                    </li>
                    <li data-thumb="5f17ad65171f3.jpg">
                        <img src="5f17ad65171f3.jpg"/>
                    </li>
                </ul>
                <div class="controls">
                    <div style="padding: 2px;">
                        <img [src]="assets.noIcon" width="25"/>
                    </div>
                    <div style="display: flex; justify-content: center">
                        <div>
                            <img src="{{assets.doubleArrowLeft}}" class="navigation-icon"/>
                            <img src="{{assets.arrowLeft}}" class="navigation-icon"/>
                            <span class="slide-numbers">1 of 3</span>
                            <img src="{{assets.rightArrow}}" class="navigation-icon"/>
                            <img src="{{assets.doubleArrowRight}}" class="navigation-icon"/>
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
            height: 4.5rem;
        }

        .grid-filter-input {
            height: 1.5rem;
            color: white;
            width: 20rem;
            border: 1px solid gray;
            font-size: 11px;
            padding-left: 0px;
            margin-top: 2px;
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
export class MapComponent implements OnInit, IWidgetComponent {
    @Input() widgetContext: IWidgetContext;
    @Input() widgetInstance: IWidgetInstance;
    @ViewChild("map", {static: true}) mapElement: any;
    map: google.maps.Map;
    gridData: any;
    gridDataFiltered: any;
    assets = assets;
    gridReactiveForm: FormGroup;

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

    constructor(private readonly changeDetectionRef: ChangeDetectorRef, private fb: FormBuilder) {
    }


    resetGridFilter() {
        this.gridDataFiltered = this.gridData.slice();
    }

    ngOnInit() {
        this.injectGoogleMapsScript();
        const instance = this.widgetInstance;

        this.gridData = [{icon: assets.checkIcon, coordinates: '52.5200° N, 13.4050° E', date: 'March 14, 1879'},
            {icon: assets.noIcon, coordinates: '48.1351° N, 11.5820° E', date: 'January 4, 1643'},
            {icon: assets.checkIcon, coordinates: '50.1109° N, 8.6821° E', date: 'July 10, 1856'},
            {icon: assets.checkIcon, coordinates: '53.5511° N, 9.9937° E', date: 'February 22, 1788'},
        ];
        this.gridDataFiltered = this.gridData.slice();


        this.gridReactiveForm = this.fb.group({
            locationFilter: '',
            dateFilter: ''
        });


        this.gridReactiveForm.get('locationFilter').valueChanges.pipe(filter((value) => {
            if(value === ''){
                this.resetGridFilter();
                return false;
            }
            return true;
        })).subscribe(locationFilterValue => {
            this.gridReactiveForm.get('dateFilter').setValue('');
            this.gridDataFiltered = this.gridData.filter((entry: any) => entry.coordinates.includes(locationFilterValue));
        });

        this.gridReactiveForm.get('dateFilter').valueChanges.pipe(filter((value) => {
            if(value === ''){
                this.resetGridFilter();
                return false;
            }
            return true;
        })).subscribe(dateFilterValue => {
            this.gridReactiveForm.get('locationFilter').setValue('');
            this.gridDataFiltered = this.gridData.filter((entry: any) => entry.date.toLowerCase().includes(dateFilterValue.toLowerCase()));
        });

        // this.updateSortOrder();
        // ** INITIALIZE JQUERY PLUGINS
        try {
            // @ts-ignore
            window.$('.dropdown').dropdown();
            // @ts-ignore
            window.$("#lightSlider").lightSlider({
                controls: false,
                item: 1,
                pager: false,
            });
        } catch (err) {
            console.log('Error initialzing JQuery components.');
            console.warn(err);
        }
        this.changeDetectionRef.markForCheck();
    }


    googleMapsLibraryLoaded() {
        console.log('Plugin should be loaded by now.');
        try {
            const mapProperties = {
                center: new google.maps.LatLng(35.2271, -80.8431),
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        } catch (err) {
            console.error('Error setting up google maps plugin.');
            console.warn(err);
        }
    }

    injectGoogleMapsScript() {
        let node = document.createElement('script'); // creates the script tag
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCs6jupPVulXGaxgb4Cer3oPtCIS2VPC68'; // sets the source (insert url in between quotes)
        node.type = 'text/javascript'; // set the script type
        function gmapsLoaded() {
            this.googleMapsLibraryLoaded();
        }

        const gmapsCallback = gmapsLoaded.bind(this);
        node.onload = <any>gmapsCallback;
        // append to head of document
        document.getElementsByTagName('head')[0].appendChild(node);
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
    imports: [CommonModule, SohoListViewModule, ReactiveFormsModule, FormsModule],
    declarations: [MapComponent],
    entryComponents: [MapComponent]
})
export class CardListModule {
}
