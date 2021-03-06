/// <reference types="@types/googlemaps" />
import {CommonModule} from "@angular/common";
import {ChangeDetectorRef, Component, Input, NgModule, OnInit, ViewChild} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingMetadata, WidgetSettingsType} from "lime";
import {assets} from './assets';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filter, take} from "rxjs/operators";
import {HttpClientModule} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

interface SliderImage {
    src: string;

    [key: string]: any;
}

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
                <ng-container *ngIf="sliderImages">

                    <div class="slider-container">
                        <div class="imageSlider" [ngStyle]="{'left':'-' + currentSliderImage * 550+'px'}">
                            <div *ngFor="let sliderImage of sliderImages;"
                                 [ngStyle]="{'background-image': 'url(' + sliderImage.src+ ')'}"
                                 style="background-size:cover;height:400px;width:550px;">
                                <img [src]="sliderImage.src" (error)="invalidateImage(sliderImage);">
                            </div>
                        </div>
                    </div>

                    <div class="controls">
                        <div style="padding: 2px;">
                            <img [src]="assets.noIcon" width="25"/>
                        </div>
                        <div style="display: flex; justify-content: center">
                            <div>
                                <img src="{{assets.doubleArrowLeft}}" class="navigation-icon" (click)="slideToFirst()"/>
                                <img src="{{assets.arrowLeft}}" class="navigation-icon"
                                     (click)="slideToPreviousImage()"/>
                                <span class="slide-numbers">{{currentSliderImage + 1}} of {{sliderImages.length}}</span>
                                <img src="{{assets.rightArrow}}" class="navigation-icon" (click)="slideToNextImage()"/>
                                <img src="{{assets.doubleArrowRight}}" class="navigation-icon" (click)="slideToLast()"/>
                            </div>
                        </div>
                        <div style="padding-left: 15px; padding-top: 2px;">
                            <img [src]="assets.checkIcon" width="25"/>
                        </div>
                    </div>
                </ng-container>

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

        .slider-container {
            width: 550px;
            height: 300px;
            overflow: hidden;
        }

        .imageSlider {
            position: relative;
            transition-property: left;
            transition-duration: 0.5s;
            transition-timing-function: ease-in-out;
            display: grid;
            grid-template-columns: repeat(15, 550px);
        }
    `]
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, IWidgetComponent {
    @Input() widgetContext: IWidgetContext;
    @Input() widgetInstance: IWidgetInstance;
    @ViewChild("map", {static: true}) mapElement: any;
    @ViewChild("imageSlider", {static: true}) imageSlider: any;
    sliderElement: HTMLElement;
    map: google.maps.Map;
    gridData: any;
    gridDataFiltered: any;
    assets = assets;
    gridReactiveForm: FormGroup;

    sliderImages: SliderImage[];
    currentSliderImage = 0;

    constructor(private readonly changeDetectionRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient) {
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
            if (value === '') {
                this.resetGridFilter();
                return false;
            }
            return true;
        })).subscribe(locationFilterValue => {
            this.gridReactiveForm.get('dateFilter').setValue('');
            this.gridDataFiltered = this.gridData.filter((entry: any) => entry.coordinates.includes(locationFilterValue));
        });

        this.gridReactiveForm.get('dateFilter').valueChanges.pipe(filter((value) => {
            if (value === '') {
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
            $('.dropdown').dropdown();
            // @ts-ignore
        } catch (err) {
            console.log('Error initialzing JQuery components.');
            console.warn(err);
        }

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
        this.http.get('https://run.mocky.io/v3/5c3199e0-823f-4d88-b67a-407a33c30af3').pipe(take(1)).subscribe((apiResponse: any) => {
            // console.clear();
            console.log('---------------------------------------------------');
            const newSliderImagesObject = apiResponse.items.item.map((item: any) => {
                return {
                    src: item.resrs.res[1].url
                }
                // return item.resrs.res[1].url;
                // console.log(item.resrs.res[1].url);
            });

            this.sliderImages = newSliderImagesObject;
            console.log(this.sliderImages);
            // console.log(apiResponse?.items.item);
        });

        this.changeDetectionRef.markForCheck();
    }

    slideToFirst() {
        this.currentSliderImage = 0;
        this.calibrateSlider();
    }

    slideToLast() {
        this.currentSliderImage = this.sliderImages.length - 1;
        this.calibrateSlider();
    }

    slideToNextImage() {
        if (this.currentSliderImage < this.sliderImages.length - 1) {
            this.currentSliderImage++;
            this.calibrateSlider();
        }
    }

    slideToPreviousImage() {
        if (this.currentSliderImage > 0) {
            this.currentSliderImage--;
            this.calibrateSlider();
        }
    }

    calibrateSlider() {
        // console.log(this.currentSliderImage);
        // console.log(this.imageSlider.nativeElement.scrollLeft);
        // console.log(this.sliderElement.scrollLeft);
        // this.sliderElement.scrollLeft = this.currentSliderImage * 550;
        // this.sliderElement.scrollLeft = (this.currentSliderImage -1) * 550
        // const targetChild = document.getElementById('slider_image_' + this.currentSliderImage);
        // console.log(targetChild.offsetLeft);
        // this.sliderElement.scrollLeft += 560;
    }


    googleMapsLibraryLoaded() {
        console.log('Plugin should be loaded by now.');
        try {
            const mapProperties = {
                center: new google.maps.LatLng(53.551086, 9.993682),
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
        // node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAF2LWQraFh6vs8rKvc5fjkCZyzaKQkmE8'; // sets the source (insert url in between quotes)
        node.src = 'https://maps.googleapis.com/maps/api/js'; // sets the source (insert url in between quotes)
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

    invalidateImage(sliderImage: SliderImage) {
        sliderImage.src= assets.error;
        console.error('Error loading: ', sliderImage.src);
    }
}

@NgModule({
    imports: [CommonModule, SohoListViewModule, ReactiveFormsModule, FormsModule, HttpClientModule],
    declarations: [MapComponent],
    entryComponents: [MapComponent]
})
export class MapsModule {
}
