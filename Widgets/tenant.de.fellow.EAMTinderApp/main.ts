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
import {} from "googlemaps";
import {IWidgetComponent, IWidgetContext, IWidgetInstance} from "lime";
import {assets} from './assets';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpHeaders} from "@angular/common/http";
import {HttpClient} from "@angular/common/http";
import {take} from "rxjs/operators";

interface DocumentAttribute {
    pin: string;
    location: { lat: number, lng: number }
}

interface InforDocument {
    aclName: string;
    imageSrc: string;
    attributes: DocumentAttribute;
    date: string; // same date in string format
    lastChangedDate: Date; // same date in Date format
    pid: string;
    status: '10' | '30' | '40';
    selected: boolean;
    shortDescription: string;
    equipment_id: string;
    pin: string;
    latlng: string;
}

@Component({
    template: `
        <!-- **************************************   -->
        <!-- *********      H T M L      **********   -->
        <!-- **************************************   -->
        <div class="main-container">
            <!-- First Box (map) -->
            <div>
                <div #map style="width:100%;height:300px"></div>
            </div>
            <!-- Second Box (grid) -->
            <div style="height: 300px;padding: 0" class="row">
                <div id="datagrid">
                </div>
            </div>
            <!-- Third Box (reset button) -->
            <div style="cursor:pointer;" (click)="resetGrid()">
                <img [src]="assets.refresh">
            </div>
            <!--  Slider   -->
            <div class="expanded">
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
                                 (click)="disableWorkOrderForm();">
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
                                 (click)="enableWorkOrderForm(); openDialog()"
                            >
                                <!--(click)="inforMatchingDocuments[currentSliderImage].status = '40'; enableWorkOrderForm();"-->
                                <img [src]="assets.checkIcon" width="23"/>
                            </div>
                        </div>
                    </div>
                </ng-container>
            </div>
        </div>
        <div class="modal" id="workOrderModal" style="width: 600px; display: none">
            <div class="modal-content">
                <div class="modal-header" style="display: flex">
                    <div style="width: 50%">
                        <!--<h3>QUICK WORKORDER</h3>-->
                        <div style="font-size: 16px; margin-bottom: 15px">QUICK WORKORDER</div>
                    </div>
                    <!--<div style="width: 50%">
                        <button style="float: right" type="button" (click)="closeDialog()"><img
                                [src]="close"
                                class="openDialogIcon"/></button>
                    </div>-->
                </div>
                <div class="modal-body">
                    <!-- Fourth Box  (Form)      -->
                    <div>
                        <div style="display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px">
                            <div>
                                <div>
                                        <textarea style="width: 100%; height: 165px" id="description" name="description"
                                                  [(ngModel)]="inforMatchingDocuments[currentSliderImage].shortDescription"
                                                  placeholder="Short Description"></textarea>
                                </div>
                                <div>
                                    <select style="width: 100%;" id="assignTo" class="dropdown"
                                            placeholder="Assign To">
                                        <option value="">&nbsp;</option>
                                        <option value="AFRIEDMANNN">Andreas Friedmann</option>
                                        <option value="AKONZAN"> Andreas Konzan</option>
                                        <option value="ASCHOLZ">Anke Scholz</option>
                                        <option value="BFINK">Birgit Fink</option>
                                        <option value="CBEHR">Carsten Behr</option>
                                        <option value="CTHEISSEN">Christian Theissen</option>
                                        <option value="DANIEL_JORDAN">Daniel Jordan</option>
                                        <option value="EKNOPP">Ernst Knopp</option>
                                        <option value="FMEIER">Florian Meier</option>
                                        <option value="FNEUMANN">Felix Neumann</option>
                                        <option value="HEGERM">Heger Manfred</option>
                                        <option value="INESBRANDO1">Ines Brandao</option>
                                        <option value="JREISS">Jochen Reib</option>
                                        <option value="KERSTIN_MENDE">Kerstin Mende</option>
                                        <option value="MANUEL_KANKA">Manuel Kanka</option>
                                        <option value="MEGGERS">Monika Eggers</option>
                                        <option value="MEIERF">Meier Friedrich</option>
                                        <option value="MRRERICKS">Martin Frericks</option>
                                        <option value="MUELLERM">Mueller Max</option>
                                        <option value="MWIRTZ">Marco Wirtz</option>
                                        <option value="PLANG">Phillip Lang</option>
                                        <option value="RAETHELE">Raethel Elmar</option>
                                        <option value="REHLK">Rehl Kari</option>
                                        <option value="SCHILZED">Schulze Dennis</option>
                                        <option value="SSCHULZ">Sebastian Schulz</option>
                                        <option value="STEFFENSS">Steffens Sebastian</option>
                                        <option value="TBERGMANN">Tim Bergmann</option>
                                        <option value="TSCHUSTER">Tim Schuster</option>
                                        <option value="WEBERT">Weber Till</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <img [src]="inforMatchingDocuments[currentSliderImage].imageSrc" height="165px">
                                    <!--<div [ngStyle]="{'background-image': 'url(' + inforMatchingDocuments[currentSliderImage].imageSrc+ ')'}"
                                         style="background-size:cover;height:165px">
                                    </div>-->
                                </div>
                                <div style="float: right; font-size: 12px; margin-top: 10px">
                                    Location: {{inforMatchingDocuments[currentSliderImage].attributes['pin']}}<br>
                                    Time: {{inforMatchingDocuments[currentSliderImage].date}}
                                </div>
                            </div>
                        </div>
                        <div style="display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px; margin-top: 20px">
                            <!--<div>
                                <button style="float: right" class="btn-primary" type="button"
                                        id="page-button-primary"
                                        (click)="send()">
                                    Send
                                </button>
                            </div>-->
                        </div>
                    </div>
                    <!--<div class="modal-buttonset">
                        <button type="button" id="generate" class="btn-modal-primary" style="width:50%">Generate
                        </button>
                        <button type="button" id="cancel" class="btn-modal" style="width:50%">Cancel</button>
                        <button type="button" id="submit" class="btn-modal-primary" style="width:50%">Submit</button>
                    </div>-->
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
            grid-template-columns: 1fr 1fr 12px;
            grid-template-rows: repeat(auto-fit, 1fr);
            gap: 1rem;
            margin: 7px;
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

    inforMatchingDocumentsCopy: InforDocument[];
    inforMatchingDocuments: InforDocument[];
    inforMatchingDocumentsPins: { [key: string]: InforDocument[] } = {};

    map: google.maps.Map;
    assets = assets;
    token: string;
    currentSliderImage = 0;
    shortDescription = '';

    markers: google.maps.Marker[];

    // manifest properties
    tenantName: string = '';
    organizationCode: string = "";
    departmentCode: string = '';

    dialogOpened = false;

    constructor(private readonly changeDetectionRef: ChangeDetectorRef, private fb: FormBuilder, private http: HttpClient) {
        // setTimeout(() => {
        //     $('body').initialize('en-US');
        // }, 200);
        setTimeout(() => {
            // @ts-ignore
            $('.dropdown').dropdown();
        }, 200);
    }

    async ngOnInit() {
        this.syncFromWidgetSettings();
        this.injectMeta();

        /** GENERATING TOKEN **/
        if (window.location.hostname !== 'localhost') {
            try {
                this.token = await this.http.get("https://mingle-extensions.eu1.inforcloudsuite.com/grid/rest/security/sessions/oauth", {responseType: 'text'}).toPromise();
                console.log('token is ', this.token);
            } catch (err) {
                console.error('prepareData: Error getting token.', err);
                $('body').toast({title: 'Error', message: 'Error while getting token.'});
            }
        }

        /** FETCHING DOCUMENTS **/
        let apiResponse: any;
        try {
            if (window.location.hostname === 'localhost') {
                apiResponse = await this.http.get('https://run.mocky.io/v3/138aa5ce-9523-4ae6-bb1c-3afc57c5d53a').pipe(take(1)).toPromise();
            } else {
                apiResponse = await this.http.get(`https://mingle-ionapi.eu1.inforcloudsuite.com/${this.tenantName}/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000`, {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.token}`
                    })
                }).toPromise();
            }

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

                // this.addMarker(latlng);
                return {
                    aclName: item.acl.name,
                    imageSrc: item.resrs.res[1].url,
                    pid: item.pid,
                    attributes: {
                        location: latlng,
                        pin: item.attrs.attr[2].value
                    },
                    date: lastChangedTSString,
                    lastChangedDate: new Date(item.lastChangedTS),
                    equipment_id: equipment_id,
                    pin: item.attrs.attr[2].value,
                    status: '10', // 10 means initial
                    latlng: latlng.lat.toString() + latlng.lng.toString()
                }
            });
            console.log('Data after processed ', JSON.parse(JSON.stringify(this.inforMatchingDocuments)));
            this.inforMatchingDocumentsCopy = this.inforMatchingDocuments.slice();
            this.inforMatchingDocuments.forEach((doc: any) => {
                if (this.inforMatchingDocumentsPins[doc.latlng]) {
                    this.inforMatchingDocumentsPins[doc.latlng].push(doc);
                } else {
                    this.inforMatchingDocumentsPins[doc.latlng] = [];
                    this.inforMatchingDocumentsPins[doc.latlng].push(doc);
                }
            });
            console.log('Unique data ', this.inforMatchingDocumentsPins);
            this.initializeGrid();
            setTimeout(() => {
                this.addCluster();
            }, 1000)
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
        this.selectRow(0);
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
        // this.enableWorkOrderForm();
    }

    /**
     * Update row of documents GRID
     * @param rowIndex - Row index (number)
     * @param rowData - Row Data of type InforDocument
     */
    updateRow(rowIndex: number, rowData: InforDocument) {
        const gridApi = $('#datagrid').data('datagrid');
        gridApi.updateRow(rowIndex, rowData);
        this.saveStatus(rowData.pid, rowData.status, rowData.aclName);
    }

    // [Initial, Draft, Approved, Rejected]
    saveStatus(pid: string, status: string, aclName: string) {
        if (window.location.hostname === 'localhost') {
            return;
        }
        const StatusAttributesUpdate: any = {
            item: {
                attrs: {
                    attr: [{
                        name: 'DocumentStatus',
                        value: status === '40' ? 'Approved' : (status === '30' ? 'Rejected' : 'Draft')
                    }]
                },
                resrs: {
                    res: []
                },
                acl: {
                    name: aclName
                },
                pid: pid
            }
        }

        console.log('body of object to update status is  ', StatusAttributesUpdate);

        // checking in first (SAFE SIDE)
        // this.http.get(`https://idm.eu1.inforcloudsuite.com/ca/api/items/${pid}/checkin`, {
        //     headers: new HttpHeaders({
        //         'Authorization': `Bearer ${this.token}`,
        //     })
        // }).toPromise().then((formAttributesUpdateApiResponse: any) => {
        //     console.log('checkin successfully');
        this.http.put(`https://mingle-ionapi.eu1.inforcloudsuite.com/${this.tenantName}/IDM/api/items/${pid}?%24checkout=true&%24checkin=true&%24merge=true`, StatusAttributesUpdate, {
            responseType: 'text',
            headers: new HttpHeaders({
                'accept': 'application/xml;charset=utf-8',
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${this.token}`,
            })
        }).toPromise().then((formAttributesUpdateApiResponse: any) => {
            console.log('form attributes updated ', formAttributesUpdateApiResponse);
            $('body').toast({title: 'Success', message: 'Successfully updated status.'});
        }).catch(err => {
            const error = err.error.replace('\n', ' ').replace('\r', '');
            const message = /<detail>(.*?)<\/detail>/g.exec(error)[1];
            console.error('Error while updating status.', err.error);
            $('body').toast({title: 'Error', message: message ? message : 'Error while updating status.'});
        });
        // }).catch(err => {
        //     console.error('Error while updating status.', err);
        //     $('body').toast({title: 'Error', message: 'Error while updating status.'});
        // });
    }

    openDialog() {
        this.dialogOpened = true;
        var ddVal = $('#assignTo').data('dropdown');
        ddVal.selectValue('');

        /*$('#assignTo').on('selected', (event) => {
            // '.dropdown').val()
            $('#assignTo').val().toString();
        });*/

        let a: SohoModalFullSize;
        a = 'responsive';
        // a = 'always';

        $('body').modal({
            content: $('#workOrderModal'),
            buttons: [{
                text: 'Close',
                click: function (e, modal) {
                    // $('#assignTo').off();
                    modal.close();
                }
            }, {
                text: 'Send',
                click: (e, modal) => {
                    if (window.location.hostname !== 'localhost') {
                        this.send($('#assignTo').val().toString() ? $('#assignTo').val().toString() : '').then((message: string) => {
                            $('body').toast({title: 'Success', message: message});
                            // $('#assignTo').off();
                            modal.close();
                        }).catch(err => {
                            $('body').toast({title: 'Error', message: err.message});
                        })
                    } else {
                        // $('#assignTo').off();
                        modal.close();
                    }
                }
            }],
            fullsize: a,
            overlayOpacity: 0.5
        });

        $('.modal').on('beforeclose', () => {
            this.dialogOpened = false;
        });
    }

    /**
     * Show work order form
     */
    enableWorkOrderForm() {
        this.inforMatchingDocuments[this.currentSliderImage].status = '40';
        this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);
    }

    /**
     * Hide work order form
     */
    disableWorkOrderForm() {
        this.inforMatchingDocuments[this.currentSliderImage].status = '30';
        this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);
    }

    slideToFirst() {
        this.currentSliderImage = 0;
        this.selectRow(this.currentSliderImage);
    }

    slideToLast() {
        this.currentSliderImage = this.inforMatchingDocuments.length - 1;
        this.selectRow(this.currentSliderImage);
    }

    slideToNextImage() {
        if (this.currentSliderImage < this.inforMatchingDocuments.length - 1) {
            this.currentSliderImage++;
            this.selectRow(this.currentSliderImage);
        }
    }

    slideToPreviousImage() {
        if (this.currentSliderImage > 0) {
            this.currentSliderImage--;
            this.selectRow(this.currentSliderImage);
        }
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
        if (this.dialogOpened) {
            return;
        }
        if (event.code === 'KeyA' || event.code === 'KeyX') {
            this.inforMatchingDocuments.forEach((item: InforDocument, index) => {
                if (item.selected) {
                    // Approve on X & Reject on A
                    item.status = event.code === 'KeyA' ? '40' : '30';
                    this.updateRow(index, item);
                }
            })
        }
    }

    /**
     * UPDATE WORK ORDER (SHORT DESCRIPTION)
     */
    async send(userAssigned: string) {
        console.log('User assigned is ', $('#assignTo').val());
        if (!this.inforMatchingDocuments[this.currentSliderImage].equipment_id) {
            throw Error('No equipment code found.')
        }
        const data = `<?xml version="1.0" encoding="utf-8" ?>
<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <Header>
        <Tenant>${this.tenantName}</Tenant>
        <SessionScenario xmlns="http://schemas.datastream.net/headers">terminate</SessionScenario>
        <Organization xmlns="http://schemas.datastream.net/headers">*</Organization>
    </Header>
    <Body>
        <MP0023_AddWorkOrder_001 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" verb="Add" noun="WorkOrder" version="001" callname="AddWorkOrder" xmlns="http://schemas.datastream.net/MP_functions/MP0023_001">
            <WorkOrder recordid="1" is_completed="true" is_cancelled="true" has_department_security="has_1" is_batchwo="true" is_parentpmwo="true" is_batchwo_update="true" is_room_occupied="false" xmlns="http://schemas.datastream.net/MP_entities/WorkOrder_001">
                <WORKORDERID auto_generated="true" xmlns="http://schemas.datastream.net/MP_fields">
                    <JOBNUM></JOBNUM>
                    <ORGANIZATIONID entity="User">
                        <ORGANIZATIONCODE>${this.organizationCode}</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                    <DESCRIPTION>${this.inforMatchingDocuments[this.currentSliderImage].shortDescription}</DESCRIPTION>
                </WORKORDERID>
                <STATUS entity="User" xmlns="http://schemas.datastream.net/MP_fields">
                    <STATUSCODE>R</STATUSCODE>
                </STATUS>
                <EQUIPMENTID xmlns="http://schemas.datastream.net/MP_fields">
                    <EQUIPMENTCODE>${this.inforMatchingDocuments[this.currentSliderImage].equipment_id}</EQUIPMENTCODE>
                    <ORGANIZATIONID entity="Organization">
                        <ORGANIZATIONCODE>${this.organizationCode}</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                </EQUIPMENTID>
                <TYPE entity="User" xmlns="http://schemas.datastream.net/MP_fields">
                    <TYPECODE>BRKD</TYPECODE>
                </TYPE>
                <DEPARTMENTID xmlns="http://schemas.datastream.net/MP_fields">
                    <DEPARTMENTCODE>${this.departmentCode}</DEPARTMENTCODE>
                    <ORGANIZATIONID entity="Group">
                        <ORGANIZATIONCODE>*</ORGANIZATIONCODE>
                    </ORGANIZATIONID>
                </DEPARTMENTID>
                 <ASSIGNEDTO xmlns="http://schemas.datastream.net/MP_fields">
                    <PERSONCODE>${userAssigned}</PERSONCODE>
                </ASSIGNEDTO>
             <FIXED xmlns="http://schemas.datastream.net/MP_fields"></FIXED>
            </WorkOrder>
        </MP0023_AddWorkOrder_001>
    </Body>
</Envelope>`

        console.log('work order payload is ', data);

        return this.http.post(`https://mingle-ionapi.eu1.inforcloudsuite.com/${this.tenantName}/EAM/axis/services/EWSConnector/EWSConnector`, data, {
            responseType: 'text',
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            })
        }).toPromise().then((apiResponse: any) => {
            try {
                console.log('Workload api response is ', apiResponse);
                const message = /<ns1:Message>(.*?)<\/ns1:Message>/g.exec(apiResponse)[1];
                return message;
                // $('body').toast({title: 'Success', message: message});
            } catch (err) {
                console.error('Error while extracting message from response but work order saved.', err);
                return "Work order successfully updated.";
                // $('body').toast({title: 'Success', message: 'Work order successfully updated.'});
            }
        }).catch(err => {
            console.error('Error while updating work order.', err);
            throw Error('Error while updating work order.');
        });
    }

    /**
     * Update Grid Data
     * @param data - Data
     */
    updateDataSet(data: InforDocument[]) {
        this.inforMatchingDocuments = JSON.parse(JSON.stringify(data));
        const grid = $('#datagrid').data('datagrid');
        grid.updateDataset(this.inforMatchingDocuments);
        grid.deSelectAllRows();
        this.currentSliderImage = 0;
        this.selectRow(0);
    }

    /**
     * Display all data in grid
     */
    resetGrid() {
        this.updateDataSet(this.inforMatchingDocumentsCopy);
    }

    injectMeta() {
        const node = document.createElement('meta');
        node.name = 'referrer';
        node.content = 'no-referrer';
        document.getElementsByTagName('head')[0].appendChild(node);

        this.injectClusterScript();
    }

    injectClusterScript() {
        let script = document.createElement('script'); // creates the script tag
        script.src = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);

        this.injectGoogleMapsScript();
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
                center: new google.maps.LatLng(-85, 180),
                zoom: 13,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
        } catch (err) {
            console.error('Error setting up google maps plugin.', err);
        }
    }

    /**
     * Add clusters/markers on map on map
     */
    addCluster() {
        const bounds = new google.maps.LatLngBounds();
        this.markers = this.inforMatchingDocuments.map((location, i) => {
            const marker: google.maps.Marker = new google.maps.Marker({
                position: location.attributes.location,
                // map: this.map,
                // label: 'Direct label',
                label: {
                    text: this.inforMatchingDocumentsPins[location.latlng].length.toString(),
                    // color: 'white'
                },
                icon: {
                    url: assets.marker,
                    scaledSize: new google.maps.Size(40, 40), // scaled big images to small sizes
                    labelOrigin: new google.maps.Point(20, 15) // setting position of label on marker
                }
            });
            // show map in such a way that all clusters/markers show on screen (no hidden marker) (centralize)
            bounds.extend(marker.getPosition());
            // attaching key with markers (to show data in grid when marker clicked)
            this.attachKey(marker, location.latlng);
            return marker;
        });
        // show map in such a way that all clusters/markers show on screen (no hidden marker) (centralize)
        this.map.fitBounds(bounds);

        /** CREATING CLUSTER **/
        // @ts-ignore
        new MarkerClusterer(this.map, this.markers, {
            // maxZoom: 15,
            styles: [{
                height: 46,
                url: assets.cluster,
                width: 46,
                textColor: 'white',
                anchorText: [16, 0] // [vertical,horizontal]
            }]
        });

        /** TESTING: MAY BE WE NEED IT LATER **/
        /** On Zoom, show which markers are currently in the map boundary **/
        /*google.maps.event.addListener(this.map, 'zoom_changed', () => {
            console.log('zoom level is ', this.map.getZoom());
            let no_of_markers = 0;
            for (let i = this.markers.length, bounds = this.map.getBounds(); i--;) {
                if (bounds.contains(this.markers[i].getPosition())) {
                    no_of_markers = no_of_markers + 1;
                    // console.log('bounded', this.markers[i].getPosition().lat());
                    // console.log('bounded', this.markers[i].getPosition().lng());
                }
            }
            console.log('number of markers inside available space in map is ', no_of_markers);
        });*/
    }

    /**
     * attaching key with markers (to show data in grid when marker clicked)
     * @param marker - Marker
     * @param key - (lan+lan).toString() | KEY
     */
    attachKey(marker: google.maps.Marker, key: string) {
        const infowindow: google.maps.InfoWindow = new google.maps.InfoWindow({
            content: key,
        });

        marker.addListener("click", () => {
            this.updateDataSet(this.inforMatchingDocumentsPins[infowindow.get('content')]);
            // infowindow.open(marker.get("map"), marker);
        });
    }

    syncFromWidgetSettings() {
        this.tenantName = this.widgetContext.getSettings().get<string>("Tenant");
        this.organizationCode = this.widgetContext.getSettings().get<string>("Organization");
        this.departmentCode = this.widgetContext.getSettings().get<string>("Department");
        console.log('**************************** tenant name is ', this.tenantName);
        console.log('**************************** organizationCode is ', this.organizationCode);
        console.log('**************************** departmentCode is ', this.departmentCode);
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