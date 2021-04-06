/// <reference types="@types/googlemaps" />
import {CommonModule} from "@angular/common";
import {ChangeDetectorRef, Component, HostListener, Input, NgModule, OnInit, ViewChild} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance, IWidgetSettingMetadata, WidgetSettingsType} from "lime";
import {assets} from './assets';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {filter, take} from "rxjs/operators";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

interface DocumentAttribute {
    pin: string;
    location: { lat: number, lng: number }
}

interface InforDocument {
    imageSrc: string;
    attributes: DocumentAttribute[];
    date: string;
    pid: string;
    status: '10' | '30' | '40';
    selected: boolean;
}

@Component({
    template: `

        <!-- **************************************   -->
        <!-- *********      H T M L      **********   -->
        <!-- **************************************   -->


        <div class="main-container">
            <!-- First Box (map)           -->
            <div>
                <div #map style="width:100%;height:300px"></div>
            </div>

            <!-- Second Box (Grid)        -->
            <div class="coordinates-outline">
                <form [formGroup]="gridReactiveForm">
                    <div class="table-grid">
                        <div class="heading-row">
                            <select id="states" name="states" style="width: 16px;" formControlName="statusFilter">
                                <option value="all">Status</option>
                                <option value="10">Initial</option>
                                <option value="30">Rejected</option>
                                <option value="40">Approved</option>
                            </select>
                        </div>
                        <div class="heading-row">LOCATION<input type="text" formControlName="locationFilter"
                                                                class="grid-filter-input"></div>
                        <div class="heading-row">DATA<input type="text" formControlName="dateFilter"
                                                            class="grid-filter-input"></div>
                        <ng-container *ngFor="let gridRow of gridDataFiltered;">
                            <div style="padding:3px" [ngClass]="{'table-grid-selected': gridRow.selected}"
                            ><img width="20" style="place-self: center"
                                  [src]="gridRow.status == '40' ? assets.checkIcon : gridRow.status == '30' ? assets.noIcon : ''">
                            </div>
                            <div [ngClass]="{'table-grid-selected': gridRow.selected}"
                            >{{gridRow.attributes.pin}}</div>
                            <div [ngClass]="{'table-grid-selected': gridRow.selected}"
                            >{{gridRow.date}}</div>
                        </ng-container>
                    </div>
                </form>
            </div>

            <!--  Third Box (Slider)    -->
            <div [ngClass]="{'expanded': !workOrderFormVisible}">
                <ng-container *ngIf="inforMatchingDocuments">
                    <div class="mby-slider-wrapper">
                        <div class="slider-container">
                            <div class="imageSlider" [ngStyle]="{'left':'-' + currentSliderImage * 550+'px'}">
                                <div *ngFor="let sliderImage of inforMatchingDocuments;"
                                     [ngStyle]="{'background-image': 'url(' + sliderImage.imageSrc+ ')'}"
                                     style="background-size:cover;height:400px;width:550px;">
                                    <img [src]="sliderImage.imageSrc" (error)="invalidateImage(sliderImage);">
                                </div>
                            </div>
                        </div>

                        <div class="controls">
                            <div style="padding: 2px; cursor: pointer"
                                 (click)="inforMatchingDocuments[currentSliderImage].status = 30; workOrderFormVisible = false;">
                                <img [src]="assets.noIcon" width="25"/>
                            </div>
                            <div style="display: flex; justify-content: center">
                                <div>
                                    <img src="{{assets.doubleArrowLeft}}" class="navigation-icon"
                                         (click)="slideToFirst()"/>
                                    <img src="{{assets.arrowLeft}}" class="navigation-icon"
                                         (click)="slideToPreviousImage()"/>
                                    <span class="slide-numbers">{{currentSliderImage + 1}}
                                        of {{inforMatchingDocuments.length}}</span>
                                    <img src="{{assets.rightArrow}}" class="navigation-icon"
                                         (click)="slideToNextImage()"/>
                                    <img src="{{assets.doubleArrowRight}}" class="navigation-icon"
                                         (click)="slideToLast()"/>
                                </div>
                            </div>
                            <div style="padding-left: 15px; padding-top: 2px;cursor: pointer;"
                                 (click)="inforMatchingDocuments[currentSliderImage].status = 40; workOrderFormVisible = true;">
                                <img [src]="assets.checkIcon" width="25"/>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>

            <!-- Fourth Box  (Form)      -->
            <div *ngIf="workOrderFormVisible">
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

        /*************************************/
        /*****           C S S           *****/
        /*************************************/

        .main-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: repeat(auto-fit, 1fr);
            gap: 3rem;
            margin: 10px;
        }

        .expanded {
            grid-column: 1 / -1;
            margin-left: 25%;
        }

        .heading-row {
            background: #c3c3c3;
            color: white;
            height: 5rem;
        }

        .grid-filter-input {
            height: 1.5rem;
            color: white;
            width: 15rem;
            background-color: white;
            color: black;
            border: 0px;
            font-size: 11px;
            padding-left: 0px;
            margin-top: 2px;
        }

        .coordinates-outline {
            border: 1px solid #cdcdcd;
            border-radius: 15px;
            overflow: hidden;
        }

        .table-grid {
            display: grid;
            grid-template-columns: 0.1fr 0.9fr 0.9fr;
        }

        .table-grid > div {
            padding: 10px;
            line-height: 10px;
            border: 0.5px solid #cdcdcd;
            display: grid;
        }

        .table-grid-selected {
            background-color: lightgray;
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

        .mby-slider-wrapper {
            display: grid;
            width: 550px;
        }

        .slider-container {
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


/*************************************/
/* ****      TypeScript         **** */
/*************************************/

export class MapComponent implements OnInit, IWidgetComponent {
    @Input() widgetContext: IWidgetContext;
    @Input() widgetInstance: IWidgetInstance;
    @ViewChild("map", {static: true}) mapElement: any;
    @ViewChild("imageSlider", {static: true}) imageSlider: any;

    @HostListener('document:keydown', ['$event'])
    keypress(e: KeyboardEvent) {
        this.onKeyPress(e);
    }

    sliderElement: HTMLElement;
    map: google.maps.Map;
    gridData: any;
    gridDataFiltered: any;
    assets = assets;
    gridReactiveForm: FormGroup;
    requestJSONResponse = new HttpHeaders();
    token: string;

    inforMatchingDocuments: InforDocument[];
    monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    currentSliderImage = 0;
    workOrderFormVisible = false;

    constructor(private readonly changeDetectionRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient) {
    }


    resetGridFilter() {
        this.gridDataFiltered = this.inforMatchingDocuments.slice();
    }

    async ngOnInit() {
        this.injectMeta();
        this.injectGoogleMapsScript();
        const instance = this.widgetInstance;

        this.gridReactiveForm = this.fb.group({
            locationFilter: '',
            dateFilter: '',
            statusFilter: ''
        });

        this.gridReactiveForm.get('locationFilter').valueChanges.pipe(filter((value) => {
            if (value === '') {
                this.resetGridFilter();
                this.clearSelectionOnTableData();
                return false;
            }
            return true;
        })).subscribe(locationFilterValue => {
            this.gridReactiveForm.get('dateFilter').setValue('');
            this.gridDataFiltered = this.inforMatchingDocuments.filter((entry: any) => entry.attributes.pin.includes(locationFilterValue));
        });

        this.gridReactiveForm.get('dateFilter').valueChanges.pipe(filter((value) => {
            if (value === '') {
                this.resetGridFilter();
                this.clearSelectionOnTableData();
                return false;
            }
            return true;
        })).subscribe(dateFilterValue => {
            this.gridReactiveForm.get('locationFilter').setValue('');
            this.gridDataFiltered = this.inforMatchingDocuments.filter((entry: any) => entry.date.toLowerCase().includes(dateFilterValue.toLowerCase()));
        });

        this.gridReactiveForm.get('statusFilter').valueChanges.pipe(filter((value) => {
            if (value === '' || value === 'all') {
                this.resetGridFilter();
                this.clearSelectionOnTableData();
                return false;
            }
            return true;
        })).subscribe(dateFilterValue => {
            if (dateFilterValue === '10') {
                dateFilterValue = null;
            }
            this.gridReactiveForm.get('locationFilter').setValue('');
            this.gridDataFiltered = this.inforMatchingDocuments.filter((entry: any) => entry.status == dateFilterValue);
        });
        // this.updateSortOrder();
        // ** INITIALIZE JQUERY PLUGINS
        try {
            // @ts-ignore
            $('.dropdown').dropdown();
            // @ts-ignore
            $('.dropdown-2').dropdown();
            // @ts-ignore
        } catch (err) {
            console.log('Error initialzing JQuery components.');
            console.warn(err);
        }


        // setInterval(() => {
        //     console.log('Scroll position should now be changed.');
        //     this.imageSlider.nativeElement.scrollLeft = 550;
        // }, 4000);

        this.token = await this.getToken() as string;
        this.http.get('https://run.mocky.io/v3/4b3b0b41-5a5e-43a2-8d47-ddafac189bd2').pipe(take(1)).toPromise().then((apiResponse: any) => {
            // this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
            //     headers: new HttpHeaders({
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${this.token}`
            //     })
            // }).toPromise().then((apiResponse: any) => {
            console.clear();
            console.log(apiResponse);

            this.inforMatchingDocuments = apiResponse.items.item.map((item: any) => {
                const lastChangedTS = new Date(item.lastChangedTS);
                const lastChangedTSString = `${this.monthNames[lastChangedTS.getMonth()]} ${lastChangedTS.getDate()}, ${lastChangedTS.getFullYear()}`;
                const latlng = {
                    lat: +item.attrs.attr[0].value.split(',')[0],
                    lng: +item.attrs.attr[0].value.split(',')[1]
                };
                this.addMarker(latlng);
                return {
                    imageSrc: item.resrs.res[1].url,
                    pid: item.pid,
                    attributes: {
                        location: latlng,
                        pin: item.attrs.attr[2].value
                    },
                    date: lastChangedTSString,
                }
            });
            this.gridDataFiltered = this.inforMatchingDocuments.slice();
            console.log(this.inforMatchingDocuments);
        }).catch((err) => {
            console.warn('--------------------------------------------');
            console.error(err);
            console.warn('---------------------------------------------');
        });

        this.changeDetectionRef.markForCheck();
    }


    async getToken() {
        return new Promise((resolve, reject) => {
            this.http.get("https://mingle-extensions.eu1.inforcloudsuite.com/grid/rest/security/sessions/oauth")
                .subscribe(
                    s => {
                    },
                    e => {
                        console.log('Error', e);
                        resolve(e.error.text);
                    }
                );
        });
    }

    slideToFirst() {
        this.currentSliderImage = 0;
    }

    slideToLast() {
        this.currentSliderImage = this.inforMatchingDocuments.length - 1;
    }

    slideToNextImage() {
        if (this.currentSliderImage < this.inforMatchingDocuments.length - 1) {
            this.currentSliderImage++;
        }
    }

    slideToPreviousImage() {
        if (this.currentSliderImage > 0) {
            this.currentSliderImage--;
        }
    }

    googleMapsLibraryLoaded() {
        console.log('Plugin should be loaded by now.');
        try {
            const mapProperties = {
                center: new google.maps.LatLng(53.544258, 9.952000),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        } catch (err) {
            console.error('Error setting up google maps plugin.');
            console.warn(err);
        }
    }

    addMarker(latLong: { lat: number, lng: number }, title?: string) {
        new google.maps.Marker({
            position: latLong,
            map: this.map,
            title: title ? title : ''
        });
    }

    injectMeta() {
        let node = document.createElement('meta');
        node.name = 'referrer';
        node.content = 'no-referrer';
        document.getElementsByTagName('head')[0].appendChild(node);
    }

    updateItemStatus(newStatusValue: 'approved' | 'rejected') {
        this.http.put('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {

        });
    }


    injectGoogleMapsScript() {
        let node = document.createElement('script'); // creates the script tag
        node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAF2LWQraFh6vs8rKvc5fjkCZyzaKQkmE8';
        // node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLG1B0MT2DyoTSZWdjm5G-kn3UwyBixGA';
        // node.src = 'https://maps.googleapis.com/maps/api/js'; // sets the source (insert url in between quotes)
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

    invalidateImage(sliderImage: InforDocument) {
        sliderImage.imageSrc = assets.error;
        console.error('Error loading: ', sliderImage.imageSrc);
    }

    selectItem(gridRow: any) {
        this.gridDataFiltered.forEach((item: any) => {
            item.selected = false;
        });
        gridRow.selected = true;
    }

    clearSelectionOnTableData() {
        this.gridDataFiltered.forEach((item: InforDocument) => {
            item.selected = false;
        });
    }

    private onKeyPress(event: KeyboardEvent) {
        if (event.code === 'Enter') {
            const indexOfSelectedImage = this.inforMatchingDocuments.findIndex((item: InforDocument) => item.selected === true);
            if (indexOfSelectedImage != -1) {
                this.currentSliderImage = indexOfSelectedImage;
                this.workOrderFormVisible = true;
            }
        }
        if (event.code === 'KeyA') {
            this.gridDataFiltered.forEach((item: InforDocument) => item.selected && (item.status = "40"))
        }

        if (event.code === 'KeyX') {
            this.gridDataFiltered.forEach((item: InforDocument) => item.selected && (item.status = "30"))
        }
        // On Down Arrow Press
        if (event.key === 'ArrowDown') {
            if (this.gridDataFiltered.every((item: InforDocument) => !item.selected)) {
                //Select the top item in the list.
                this.gridDataFiltered[0].selected = true;
                return;
            }
            this.selectNextItemInTable();
        }


        //On Up Arrow Press
        if (event.key === 'ArrowUp') {
            if (this.gridDataFiltered.every((item: InforDocument) => !item.selected)) {
                //Select the top item in the list.
                this.gridDataFiltered[this.gridDataFiltered.length - 1].selected = true;
                return;
            }

            this.gridDataFiltered.reverse();
            this.selectNextItemInTable();
            this.gridDataFiltered.reverse();
            // this.clearSelectionOnTableData();
        }

    }

    selectNextItemInTable() {
        let itemSwitched = false;
        this.gridDataFiltered.forEach((item: InforDocument, index: number) => {
            if (index === this.gridDataFiltered.length) {
                itemSwitched = false;
                return;
            }
            if (item.selected) {
                item.selected = false;
                itemSwitched = true;
                return;
            }
            if (itemSwitched) {
                item.selected = true;
                itemSwitched = false;
            }
        });
    }
}

@NgModule({
    imports: [CommonModule, SohoListViewModule, ReactiveFormsModule, FormsModule, HttpClientModule],
    declarations: [MapComponent],
    entryComponents: [MapComponent]
})
export class MapsModule {
}
