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
    shortDescription: string;
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
                            <select id="states" name="states" style="width: 1.5vw;" formControlName="statusFilter">
                                <option value="all">All</option>
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
                            <div style="padding:3px; border-bottom: 3px solid #f0f0f0;"
                                 [style.background-image]="gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null">
                                <img width="20" style="place-self: center"
                                     [src]="gridRow.status == '40' ? assets.checkIcon : gridRow.status == '30' ? assets.noIcon : ''">
                            </div>
                            <div style="border-bottom: 3px solid #f0f0f0;"
                                 [style.background-image]="gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null">{{gridRow.attributes.pin}}</div>
                            <div style="border-bottom: 3px solid #f0f0f0;"
                                 [style.background-image]="gridRow.selected ? 'linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%)' : null">{{gridRow.date}}</div>
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
                                 (click)="inforMatchingDocuments[currentSliderImage].status = 30;disableWorkOrderForm();">
                                <img [src]="assets.noIcon" width="23"/>
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
                            <div style="padding-left: 19px; padding-top: 2px;cursor: pointer;"
                                 (click)="inforMatchingDocuments[currentSliderImage].status = 40; enableWorkOrderForm();">
                                <img [src]="assets.checkIcon" width="23"/>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>

            <!-- Fourth Box  (Form)      -->
            <div *ngIf="workOrderFormVisible">
                <div class="form-outline">
                    <div style="font-size: 16px; margin-bottom: 15px">QUICK WORKORDER</div>
                    <div style="display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px">
                        <div>
                            <div>
                                <input style="width: 100%" type="text" id="first-name" name="first-name"
                                       placeholder="Title">
                            </div>
                            <div style="margin-top: 10px;">
                                <textarea style="width: 100%; height: 120px" id="description" name="description"
                                          [(ngModel)]="inforMatchingDocuments[currentSliderImage].shortDescription"
                                          placeholder="Short Description"></textarea>
                            </div>
                        </div>
                        <div>
                            <div>
                                <div [ngStyle]="{'background-image': 'url(' + inforMatchingDocuments[currentSliderImage].imageSrc+ ')'}"
                                     style="background-size:cover;height:165px">
                                </div>
                            </div>
                            <div style="float: right; font-size: 12px; margin-top: 10px">
                                Location: {{inforMatchingDocuments[currentSliderImage].attributes['pin']}}<br>
                                Time: {{inforMatchingDocuments[currentSliderImage].date}}
                            </div>
                        </div>
                    </div>

                    <div style="display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px; margin-top: 20px">
                        <div>
                            <select style="width: 100%;" id="states" name="states" class="dropdown">
                                <option value="AL">Assign To:</option>
                                <option value="CA">California</option>
                                <option value="DE">Delaware</option>
                                <option value="NY">New York</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </div>
                        <div>
                            <button style="float: right" class="btn-primary" type="button" id="page-button-primary"
                                    (click)="send()">
                                Send
                            </button>
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
            background-color: #c3c3c3;
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
            height: 300px;
            overflow-y: scroll;
        }

        .table-grid {
            display: grid;
            grid-template-columns: 0.1fr 0.9fr 0.9fr;
        }

        .table-grid > div {
            padding: 10px;
            line-height: 10px;
            /*border: 0.5px solid #cdcdcd;*/
            display: grid;
        }

        .form-outline {
            border: 1px solid #ccc;
            border-radius: 15px;
            padding: 10px;
            height: 310px;
            color: #ccc;
        }

        .controls {
            display: grid;
            grid-template-columns: 0.1fr 1fr 0.1fr;
            background-color: white;
            width: 98%;
            margin-left: 1%;
            padding-top: 1px;
            border-radius: 5px;
            height: 30px;
            position: relative;
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
            display: grid;
            position: relative;
            transition-property: left;
            transition-duration: 0.5s;
            transition-timing-function: ease-in-out;
            grid-template-columns: repeat(15, 550px);
        }

        /* Dropdown: Assign To: Label color */
        ::ng-deep .dropdown span {
            color: #ccc;
        }

        /* Dropdown: Assign To: Width */
        ::ng-deep .dropdown-wrapper {
            width: 100%;
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

    shortDescription = '';

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

        this.token = await this.getToken() as string;
        // this.http.get('https://run.mocky.io/v3/da377b86-8cac-4a35-a4a0-fd6c94ff1d82').pipe(take(1)).toPromise().then((apiResponse: any) => {
        this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {
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

    enableWorkOrderForm() {
        if (this.workOrderFormVisible) {
            return;
        }
        this.workOrderFormVisible = true;
        setTimeout(() => {
            // @ts-ignore
            $('.dropdown').dropdown();
        }, 200);
    }

    disableWorkOrderForm() {
        this.workOrderFormVisible = false;
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
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                controlSize: 20
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
            console.log(this.inforMatchingDocuments);
            const indexOfSelectedImage = this.inforMatchingDocuments.findIndex((item: InforDocument) => item.selected === true);
            if (indexOfSelectedImage != -1) {
                this.currentSliderImage = indexOfSelectedImage;
                this.enableWorkOrderForm();
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
            const indexOfSelectedRow = this.gridDataFiltered.findIndex((item: InforDocument) => item.selected);
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
            const indexOfSelectedRow = this.gridDataFiltered.findIndex((item: InforDocument) => item.selected);
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
    }

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

    send() {
        console.log('sending...', this.token);
        console.log('short description is ', this.inforMatchingDocuments[this.currentSliderImage].shortDescription);

        const bodid = new Date().getTime();
        const creationDateTime = new Date().toISOString();
        const id = Math.floor(new Date().getTime() / 1000000000);

        console.log('bodid is ', bodid);
        console.log('creationDateTime is ', creationDateTime);
        console.log('id is ', id);

        const data = {
            "documentName": "Sync.FellowWO",
            "messageId": "message741569",
            "fromLogicalId": "lid://infor.ims.testims",
            "toLogicalId": "lid://default",
            "document": {
                "value": `<SyncFellowWO><ApplicationArea> <Sender><LogicalID>infor.ims.testims</LogicalID><ComponentID>External</ComponentID><ConfirmationCode>OnError</ConfirmationCode></Sender><CreationDateTime>${creationDateTime}</CreationDateTime><BODID>infor.ims.testims_bod:${bodid}:123fc4a8-41f1-4385-8d05-${bodid}</BODID></ApplicationArea><DataArea><Sync><AccountingEntityID>JR01_01</AccountingEntityID><LocationID>01</LocationID><ActionCriteria><ActionExpression actionCode=\"Add\"/><ChangeStatus><Code>Released</Code><Description>Freigegeben</Description><EffectiveDateTime>${creationDateTime}</EffectiveDateTime></ChangeStatus></ActionCriteria></Sync><FellowWO><ID>${id}</ID><Description>${this.inforMatchingDocuments[this.currentSliderImage].shortDescription}</Description><Equipment>0000J${id}</Equipment><Type>Breakdown</Type><Department>006</Department><Status>Freigegeben</Status><Organisation>*</Organisation></FellowWO></DataArea></SyncFellowWO>`,
                "encoding": "NONE",
                "characterSet": "UTF-8"
            }
        }

        console.log(data.document.value);

        this.http.post('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IONSERVICES/api/ion/messaging/service/v2/message', data, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {
            console.log('api response is ', apiResponse);
        }).catch(err => {
            console.error('error response ', err);
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
