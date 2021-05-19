/// <reference types="@types/googlemaps" />
import {CommonModule} from "@angular/common";
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    NgModule,
    OnInit,
    ViewChild
} from "@angular/core";
import {SohoListViewModule} from "@infor/sohoxi-angular";
// import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance} from "lime";
import {assets} from './assets';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";

interface DocumentAttribute {
    pin: string;
    location: { lat: number, lng: number }
}

interface InforDocument {
    imageSrc: string;
    attributes: DocumentAttribute[];
    date: string; // same date in string format
    lastChangedDate: Date; // same date in Date format
    pid: string;
    status: '10' | '30' | '40';
    selected: boolean;
    shortDescription: string;
    equipment_id: string;
    pin: string;
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
            <!-- <div class="coordinates-outline">
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
            </div>-->
            <div style="height: 300px" class="row">
                <div id="datagrid">
                </div>
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
                                 (click)="inforMatchingDocuments[currentSliderImage].status = '30'; disableWorkOrderForm();">
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
                                 (click)="inforMatchingDocuments[currentSliderImage].status = '40'; enableWorkOrderForm();">
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
                            <!--<select style="width: 100%;" id="states" name="states" class="dropdown">
                                <option value="AL">Assign To:</option>
                                <option value="CA">California</option>
                                <option value="DE">Delaware</option>
                                <option value="NY">New York</option>
                                <option value="WY">Wyoming</option>
                            </select>-->
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

        /* By default, infor grid take plae of toolbar, we don't need that */
        ::ng-deep .row > .toolbar.do-resize {
            display: none;
        }

        ::ng-deep .datagrid-header th {
            background: linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%);
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

    inforMatchingDocuments: InforDocument[];

    map: google.maps.Map;
    assets = assets;
    token: string;
    currentSliderImage = 0;
    workOrderFormVisible = false;
    shortDescription = '';

    constructor(private readonly changeDetectionRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient) {
        // setTimeout(() => {
        //     $('body').initialize('en-US');
        // }, 200);
    }

    async ngOnInit() {
        this.injectMeta();
        this.injectGoogleMapsScript();

        /** GENERATING TOKEN **/
        try {
            this.token = await this.http.get("https://mingle-extensions.eu1.inforcloudsuite.com/grid/rest/security/sessions/oauth", {responseType: 'text'}).toPromise();
            console.log('token is ', this.token);
        } catch (err) {
            console.error('prepareData: Error getting token.', err);
        }

        /** FETCHING DOCUMENTS **/
        let apiResponse: any;
        try {
            // apiResponse = await this.http.get('https://run.mocky.io/v3/beaece2c-005a-439f-97f7-0abdbb8b278f').toPromise();
            apiResponse = await this.http.get('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                })
            }).toPromise();
            console.log('Documents fetched from api are ', apiResponse);
        } catch (err) {
            console.error('Error while fetching documents.', err);
            $('body').toast({title: 'Error', message: 'Error while fetching documents.'});
            return;
        }

        /** PROCESSING DOCUMENTS **/
        try {
            this.inforMatchingDocuments = apiResponse.items.item.map((item: any) => {
                const lastChangedTS = new Date(item.lastChangedTS);
                const lastChangedTSString = `${lastChangedTS.toLocaleString(navigator.language, {month: "long"})} ${lastChangedTS.getDate()}, ${lastChangedTS.getFullYear()}`;
                const latlng = {
                    lat: +item.attrs.attr[0].value.split(',')[0],
                    lng: +item.attrs.attr[0].value.split(',')[1]
                };
                const equipment_id = item.attrs.attr.filter(
                    (val: any) => val.name === 'Equipment_ID'
                )[0].value;

                this.addMarker(latlng);
                return {
                    imageSrc: item.resrs.res[1].url,
                    pid: item.pid,
                    attributes: {
                        location: latlng,
                        pin: item.attrs.attr[2].value
                    },
                    date: lastChangedTSString,
                    lastChangedDate: lastChangedTS,
                    equipment_id: equipment_id,
                    pin: item.attrs.attr[2].value,
                    status: '10' // 10 means initial
                }
            });
            console.log('Final data is ', JSON.parse(JSON.stringify(this.inforMatchingDocuments)));
            this.initializeGrid();
        } catch (err) {
            console.error('Error while processing documents.', err);
        }
        this.changeDetectionRef.markForCheck();
    }

    /**
     * Creating GRID to display documents.
     */
    initializeGrid() {
        let columns = [];

        const statuses = [{id: '', value: '', label: '&nbsp;'},
            {id: 'Initial', value: '10', label: 'Initial'},
            {id: 'Rejected', value: '40', label: 'Rejected'},
            {id: 'Approved', value: '30', label: 'Approved'}];

        // Define Columns for the Grid.
        columns.push({
            id: 'status',
            name: 'Status',
            field: 'status',
            formatter: Formatters.Alert,
            filterType: 'select',
            editorOptions: {clearable: true},
            options: statuses,
            width: '20%',
            ranges: [{'value': "40", 'classes': 'success', text: 'Approved'}, {
                'value': '30', 'classes': 'error', text: 'Rejected'
            }, {
                'value': '10', 'classes': 'info', text: 'Initial'
            }]
        });
        columns.push({
            id: 'pin',
            name: 'Location',
            field: 'pin',
            width: '50%',
            formatter: Formatters.Text,
            filterType: 'text'
        });
        columns.push({
            id: 'lastChangedDate',
            name: 'Date',
            field: 'lastChangedDate',
            formatter: Formatters.Date,
            dateFormat: 'MMMM dd, yyyy',
            filterType: 'date',
            width: '30%',
            editorOptions: {showMonthYearPicker: true}
        });

        // Init and get the api for the grid
        $('#datagrid').datagrid({
            columns: columns,
            rowHeight: 'extra-small',
            dataset: this.inforMatchingDocuments,
            filterable: true,
            filterWhenTyping: true,
            columnReorder: true,
            selectable: 'single',
            editable: true,
            attributes: [{name: 'id', value: 'custom-id'}, {
                name: 'data-automation-id',
                value: 'custom-automation-id'
            }],
            // frozenColumns: {left: ['id', 'productId']},
            emptyMessage: {
                title: 'NoData',
                info: 'NoDataFilter',
                icon: 'icon-empty-no-data'
            },
            toolbar: {
                // title: 'Items',
                // filterRow: true,
                // results: true,
                // dateFilter: false,
                // keywordFilter: false,
                // actions: true,
                // views: false,
                // rowHeight: true,
                // collapsibleFilter: false
            }
        }).on('filtered', (e, args) => {
            // console.log('on filter ran', args.conditions);
        }).on('selected', (e, args) => {
            // console.log('on selected', e, args);
        }).on('cellchange', (e, args) => {
            // console.log('on cellchange', e, args);
        }).on('activecellchange', (e, args) => {
            // console.log('on activecellchange', e, args);
            this.selectRow(args.row);
        });
        // this.selectRow(0);
    }

    /**
     * Select row of documents GRID
     * @param rowIndex - Row index (number)
     */
    selectRow(rowIndex: number) {
        const gridApi = $('#datagrid').data('datagrid');
        gridApi.selectRow(rowIndex);
        gridApi.activateRow(rowIndex);
        this.inforMatchingDocuments.forEach((doc, index) => {
            doc.selected = false;
            if (rowIndex === index) {
                doc.selected = true;
            }
        })
        this.currentSliderImage = rowIndex;
        this.enableWorkOrderForm();
    }

    /**
     * Update row of documents GRID
     * @param rowIndex - Row index (number)
     * @param rowData - Row Data of type InforDocument
     */
    updateRow(rowIndex: number, rowData: InforDocument) {
        const gridApi = $('#datagrid').data('datagrid');
        gridApi.updateRow(rowIndex, rowData);
    }

    /**
     * Show work order form
     */
    enableWorkOrderForm() {
        this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);

        if (this.workOrderFormVisible) {
            return;
        }
        this.workOrderFormVisible = true;

        setTimeout(() => {
            // @ts-ignore
            $('.dropdown').dropdown();
        }, 200);
    }

    /**
     * Hide work order form
     */
    disableWorkOrderForm() {
        this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);
        this.workOrderFormVisible = false;
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

    /**
     * Add marker on map
     * @param latLong - Contains lat and lng
     * @param title
     */
    addMarker(latLong: { lat: number, lng: number }, title?: string) {
        new google.maps.Marker({
            position: latLong,
            map: this.map,
            title: title ? title : ''
        });
    }

    /**
     * We show error image in case of displaying original image
     * @param sliderImage - Original infor document
     */
    invalidateImage(sliderImage: InforDocument) {
        console.error('Error loading: ', sliderImage.imageSrc);
        sliderImage.imageSrc = assets.error;
    }

    /**
     * Key pressed (Currently handling A and X only)
     * @param event - event
     * @private
     */
    private onKeyPress(event: KeyboardEvent) {
        if (event.code === 'KeyA' || event.code === 'KeyX') {
            this.inforMatchingDocuments.forEach((item: InforDocument, index) => {
                if (item.selected) {
                    // Approve on X & Reject on A
                    item.status = event.code === 'KeyA' ? '30' : '40';
                    this.updateRow(index, item);
                }
            })
        }
    }

    /**
     * UPDATE WORK ORDER (SHORT DESCRIPTION)
     */
    send() {
        if (!this.inforMatchingDocuments[this.currentSliderImage].equipment_id) {
            $('body').toast({title: 'Error', message: 'No equipment code found.'});
            return;
        }
        const data = `<?xml version="1.0" encoding="utf-8" ?>
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Header>
        <Tenant>FELLOWCONSULTING_DEV</Tenant>
        <SessionScenario xmlns="http://schemas.datastream.net/headers">terminate</SessionScenario>
        <Organization xmlns="http://schemas.datastream.net/headers">*</Organization>
    </Header>
    <Body>
        <MP0023_AddWorkOrder_001 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" verb="Add" noun="WorkOrder" version="001" callname="AddWorkOrder" xmlns="http://schemas.datastream.net/MP_functions/MP0023_001">
            <WorkOrder recordid="1" is_completed="true" is_cancelled="true" has_department_security="has_1" is_batchwo="true" is_parentpmwo="true" is_batchwo_update="true" is_room_occupied="false" xmlns="http://schemas.datastream.net/MP_entities/WorkOrder_001">
                <WORKORDERID auto_generated="true" xmlns="http://schemas.datastream.net/MP_fields">
                    <JOBNUM></JOBNUM>
                    <ORGANIZATIONID entity="User">
                        <ORGANIZATIONCODE>01</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                    <DESCRIPTION>${this.inforMatchingDocuments[this.currentSliderImage].shortDescription}</DESCRIPTION>
                </WORKORDERID>
                <STATUS entity="User" xmlns="http://schemas.datastream.net/MP_fields">
                    <STATUSCODE>R</STATUSCODE>
                </STATUS>
                <EQUIPMENTID xmlns="http://schemas.datastream.net/MP_fields">
                    <EQUIPMENTCODE>${this.inforMatchingDocuments[this.currentSliderImage].equipment_id}</EQUIPMENTCODE>
                    <ORGANIZATIONID entity="Organization">
                        <ORGANIZATIONCODE>01</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                </EQUIPMENTID>
                <TYPE entity="User" xmlns="http://schemas.datastream.net/MP_fields">
                    <TYPECODE>BRKD</TYPECODE>
                </TYPE>
                <DEPARTMENTID xmlns="http://schemas.datastream.net/MP_fields">
                    <DEPARTMENTCODE>DRONENDEMO</DEPARTMENTCODE>
                    <ORGANIZATIONID entity="Group">
                        <ORGANIZATIONCODE>*</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                </DEPARTMENTID>
             <FIXED xmlns="http://schemas.datastream.net/MP_fields"></FIXED>
            </WorkOrder>
        </MP0023_AddWorkOrder_001>
    </Body>
</Envelope>`

        this.http.post('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/EAM/axis/services/EWSConnector/EWSConnector', data, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {
            try {
                console.log('Workload api response is ', apiResponse);
                const message = /<ns1:Message>(.*?)<\/ns1:Message>/g.exec(apiResponse)[1];
                $('body').toast({title: 'Success', message: message});
            } catch (err) {
                $('body').toast({title: 'Success', message: 'Work order successfully updated.'});
            }
        }).catch(err => {
            $('body').toast({title: 'Error', message: 'Error while updating work order.'});
        });
    }

    injectMeta() {
        let node = document.createElement('meta');
        node.name = 'referrer';
        node.content = 'no-referrer';
        document.getElementsByTagName('head')[0].appendChild(node);
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

    googleMapsLibraryLoaded() {
        try {
            const mapProperties = {
                center: new google.maps.LatLng(53.544258, 9.952000),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                controlSize: 20
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        } catch (err) {
            console.error('Error setting up google maps plugin.', err);
        }
    }
}

@NgModule({
    imports: [CommonModule, SohoListViewModule, ReactiveFormsModule, FormsModule, HttpClientModule],
    declarations: [MapComponent],
    entryComponents: [MapComponent]
})
export class MapsModule {
}

/*
async refreshToken() {
       // const url = 'https://mingle-sso.eu1.inforcloudsuite.com:443/FELLOWCONSULTING_DEV/as/token.oauth2';
       const config = {
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
           "saak": "FELLOWCONSULTING_DEV#bxFTqeWylzBeff3ZtsoDk2kPcrPdDfcAp7ZW0T9G8LsEPIBNFsv7lA838njAhPnQiSNVGUxDpo5vzA4qHgybwg",
           "sask": "rtjQI2MDBk-TiKUfymebiR9RqdZ517FZREJaT_APukw4oDkc6B3tKnV4r6w6cU8aJEnQObXks9XFIv_gDi0Yrg"
       };

       return await this.http.post(
           `https://mingle-sso.eu1.inforcloudsuite.com:443/FELLOWCONSULTING_DEV/as/token.oauth2`,
           {
               username: `FELLOWCONSULTING_DEV#bxFTqeWylzBeff3ZtsoDk2kPcrPdDfcAp7ZW0T9G8LsEPIBNFsv7lA838njAhPnQiSNVGUxDpo5vzA4qHgybwg`,
               password: `rtjQI2MDBk-TiKUfymebiR9RqdZ517FZREJaT_APukw4oDkc6B3tKnV4r6w6cU8aJEnQObXks9XFIv_gDi0Yrg`,
               client_id: `FELLOWCONSULTING_DEV~f7OB2dfXWicZAgc0Iqrzxjm61Mo2_fg603uJhd_Ebw4`,
               client_secret: `uhnI9VPlKqjiqSWkfvuC1KRWXw9EanXs7d1ezfgUP8TDiS_FG3IxgpLQX9qe7mq5VEPMo47ZhzC_SqE7qQnLCw`,
               grant_type: "password"
           },
           {
               headers: {
                   // 'Access-Control-Allow-Origin': '*',
                   'Content-Type': 'application/x-www-form-urlencoded',
                   'Authorization': 'Bearer ' + btoa(`${config.ci}:${config.cs}`)
               }
           }).toPromise();
   }*/


/*private getMetadata(): IWidgetSettingMetadata[] {
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
    }*/


/*updateItemStatus(newStatusValue: 'approved' | 'rejected') {
        this.http.put('https://mingle-ionapi.eu1.inforcloudsuite.com/FELLOWCONSULTING_DEV/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000', {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {

        });
    }*/