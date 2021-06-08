var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "lime", "./assets", "@angular/forms", "@angular/common/http", "@angular/common/http", "rxjs/operators"], function (require, exports, common_1, core_1, sohoxi_angular_1, lime_1, assets_1, forms_1, http_1, http_2, operators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MapsModule = exports.MapComponent = void 0;
    var MapComponent = /** @class */ (function () {
        function MapComponent(changeDetectionRef, fb, http) {
            this.changeDetectionRef = changeDetectionRef;
            this.fb = fb;
            this.http = http;
            this.inforMatchingDocumentsPins = {};
            this.assets = assets_1.assets;
            this.currentSliderImage = 0;
            this.shortDescription = '';
            // manifest properties
            this.tenantName = '';
            this.organizationCode = "";
            this.departmentCode = '';
            this.showWorkOrderModal = false;
            // setTimeout(() => {
            //     $('body').initialize('en-US');
            // }, 200);
        }
        MapComponent.prototype.keypress = function (e) {
            this.onKeyPress(e);
        };
        MapComponent.prototype.ngOnInit = function () {
            return __awaiter(this, void 0, void 0, function () {
                var _a, err_1, apiResponse, err_2;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            this.syncFromWidgetSettings();
                            this.injectMeta();
                            if (!(window.location.hostname !== 'localhost')) return [3 /*break*/, 4];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = this;
                            return [4 /*yield*/, this.http.get("https://mingle-extensions.eu1.inforcloudsuite.com/grid/rest/security/sessions/oauth", { responseType: 'text' }).toPromise()];
                        case 2:
                            _a.token = _b.sent();
                            console.log('token is ', this.token);
                            return [3 /*break*/, 4];
                        case 3:
                            err_1 = _b.sent();
                            console.error('prepareData: Error getting token.', err_1);
                            $('body').toast({ title: 'Error', message: 'Error while getting token.' });
                            return [3 /*break*/, 4];
                        case 4:
                            _b.trys.push([4, 9, , 10]);
                            if (!(window.location.hostname === 'localhost')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.http.get('https://run.mocky.io/v3/138aa5ce-9523-4ae6-bb1c-3afc57c5d53a').pipe(operators_1.take(1)).toPromise()];
                        case 5:
                            apiResponse = _b.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.http.get("https://mingle-ionapi.eu1.inforcloudsuite.com/" + this.tenantName + "/IDM/api/items/search?%24query=%2FEAM_Drone_Images&%24offset=0&%24limit=1000", {
                                headers: new http_1.HttpHeaders({
                                    'Content-Type': 'application/json',
                                    'Authorization': "Bearer " + this.token
                                })
                            }).toPromise()];
                        case 7:
                            apiResponse = _b.sent();
                            _b.label = 8;
                        case 8:
                            console.log('Documents fetched from api are ', apiResponse);
                            return [3 /*break*/, 10];
                        case 9:
                            err_2 = _b.sent();
                            console.error('Error while fetching documents.', err_2);
                            $('body').toast({ title: 'Error', message: 'Error while fetching documents.' });
                            return [2 /*return*/];
                        case 10:
                            /** PROCESSING DOCUMENTS **/
                            try {
                                this.inforMatchingDocuments = apiResponse.items.item.map(function (item) {
                                    var lastChangedTS = new Date(item.lastChangedTS);
                                    var lastChangedTSString = lastChangedTS.toLocaleString(navigator.language, { month: "long" }) + " " + lastChangedTS.getDate() + ", " + lastChangedTS.getFullYear();
                                    var latlng = {
                                        lat: +item.attrs.attr[0].value.split(',')[0],
                                        lng: +item.attrs.attr[0].value.split(',')[1]
                                    };
                                    var equipment_id = item.attrs.attr.filter(function (val) { return val.name === 'Equipment_ID'; })[0].value;
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
                                        status: '10',
                                        latlng: latlng.lat.toString() + latlng.lng.toString()
                                    };
                                });
                                console.log('Data after processed ', JSON.parse(JSON.stringify(this.inforMatchingDocuments)));
                                this.inforMatchingDocumentsCopy = this.inforMatchingDocuments.slice();
                                this.inforMatchingDocuments.forEach(function (doc) {
                                    if (_this.inforMatchingDocumentsPins[doc.latlng]) {
                                        _this.inforMatchingDocumentsPins[doc.latlng].push(doc);
                                    }
                                    else {
                                        _this.inforMatchingDocumentsPins[doc.latlng] = [];
                                        _this.inforMatchingDocumentsPins[doc.latlng].push(doc);
                                    }
                                });
                                console.log('Unique data ', this.inforMatchingDocumentsPins);
                                this.initializeGrid();
                                setTimeout(function () {
                                    _this.addCluster();
                                }, 1000);
                            }
                            catch (err) {
                                console.error('Error while processing documents.', err);
                            }
                            this.changeDetectionRef.markForCheck();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Creating GRID to display documents.
         */
        MapComponent.prototype.initializeGrid = function () {
            var _this = this;
            var columns = [];
            var statuses = [{ id: '', value: '', label: '&nbsp;' },
                { id: 'Initial', value: '10', label: 'Initial' },
                { id: 'Rejected', value: '40', label: 'Rejected' },
                { id: 'Approved', value: '30', label: 'Approved' }];
            // Define Columns for the Grid.
            columns.push({
                id: 'status',
                name: 'Status',
                field: 'status',
                formatter: Formatters.Alert,
                filterType: 'select',
                editorOptions: { clearable: true },
                options: statuses,
                width: '20%',
                ranges: [{ 'value': "40", 'classes': 'success', text: 'Approved' }, {
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
                editorOptions: { showMonthYearPicker: true }
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
                attributes: [{ name: 'id', value: 'custom-id' }, {
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
            }).on('filtered', function (e, args) {
                // console.log('on filter ran', args.conditions);
            }).on('selected', function (e, args) {
                // console.log('on selected', e, args);
            }).on('cellchange', function (e, args) {
                // console.log('on cellchange', e, args);
            }).on('activecellchange', function (e, args) {
                // console.log('on activecellchange', e, args);
                _this.selectRow(args.row);
            });
            this.selectRow(0);
        };
        /**
         * Select row of documents GRID
         * @param rowIndex - Row index (number)
         */
        MapComponent.prototype.selectRow = function (rowIndex) {
            var gridApi = $('#datagrid').data('datagrid');
            gridApi.selectRow(rowIndex);
            gridApi.activateRow(rowIndex);
            this.inforMatchingDocuments.forEach(function (doc, index) {
                doc.selected = false;
                if (rowIndex === index) {
                    doc.selected = true;
                }
            });
            this.currentSliderImage = rowIndex;
            // this.enableWorkOrderForm();
        };
        /**
         * Update row of documents GRID
         * @param rowIndex - Row index (number)
         * @param rowData - Row Data of type InforDocument
         */
        MapComponent.prototype.updateRow = function (rowIndex, rowData) {
            var gridApi = $('#datagrid').data('datagrid');
            gridApi.updateRow(rowIndex, rowData);
            this.saveStatus(rowData.pid, rowData.status, rowData.aclName);
        };
        // [Initial, Draft, Approved, Rejected]
        MapComponent.prototype.saveStatus = function (pid, status, aclName) {
            if (window.location.hostname === 'localhost') {
                return;
            }
            var StatusAttributesUpdate = {
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
            };
            console.log('body of object  to update status is  ', StatusAttributesUpdate);
            // checking in first (SAFE SIDE)
            this.http.get("https://idm.eu1.inforcloudsuite.com/ca/api/items/" + pid + "/checkin", {
                headers: new http_1.HttpHeaders({
                    'Authorization': "Bearer " + this.token,
                })
            }).toPromise().then(function (formAttributesUpdateApiResponse) {
                console.log('checkin successfully');
                // this.http.put(`https://mingle-ionapi.eu1.inforcloudsuite.com/${this.tenantName}/IDM/api/items/${pid}?%24checkout=true&%24checkin=true&%24merge=true`, StatusAttributesUpdate, {
                //     responseType: 'text',
                //     headers: new HttpHeaders({
                //         'accept': 'application/xml;charset=utf-8',
                //         'Content-Type': 'application/json;charset=utf-8',
                //         'Authorization': `Bearer ${this.token}`,
                //     })
                // }).toPromise().then((formAttributesUpdateApiResponse: any) => {
                //     console.log('form attributes updated ', formAttributesUpdateApiResponse);
                //     $('body').toast({title: 'Success', message: 'Successfully updated status.'});
                // }).catch(err => {
                //     console.error('Error while updating status.', err);
                //     $('body').toast({title: 'Error', message: 'Error while updating status.'});
                // });
            }).catch(function (err) {
                console.error('Error while updating status.', err);
                $('body').toast({ title: 'Error', message: 'Error while updating status.' });
            });
        };
        MapComponent.prototype.openDialog = function () {
            var _this = this;
            this.showWorkOrderModal = true;
            setTimeout(function () {
                var a;
                a = 'responsive';
                // a = 'always';
                $('body').modal({
                    content: $('#workOrderModal'),
                    buttons: [{
                            text: 'Close',
                            click: function (e, modal) {
                                modal.close();
                                this.showWorkOrderModal = false;
                            }
                        }, {
                            text: 'Send',
                            click: function (e, modal) {
                                if (window.location.hostname !== 'localhost') {
                                    _this.send().then(function (message) {
                                        $('body').toast({ title: 'Success', message: message });
                                        modal.close();
                                        _this.showWorkOrderModal = false;
                                    }).catch(function (err) {
                                        $('body').toast({ title: 'Error', message: err.message });
                                    });
                                }
                                else {
                                    modal.close();
                                }
                            }
                        }],
                    fullsize: a,
                    overlayOpacity: 0.5
                });
                // $('.modal').on('beforeclose', function () {
                //     $('body').toast({title: 'Example Only', message: 'This Dialog May not be closed.'});
                //     return false;
                // });
            }, 25);
        };
        /**
         * Show work order form
         */
        MapComponent.prototype.enableWorkOrderForm = function () {
            this.inforMatchingDocuments[this.currentSliderImage].status = '40';
            this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);
            /*setTimeout(() => {
                // @ts-ignore
                $('.dropdown').dropdown();
            }, 200);*/
        };
        /**
         * Hide work order form
         */
        MapComponent.prototype.disableWorkOrderForm = function () {
            this.inforMatchingDocuments[this.currentSliderImage].status = '30';
            this.updateRow(this.currentSliderImage, this.inforMatchingDocuments[this.currentSliderImage]);
        };
        MapComponent.prototype.slideToFirst = function () {
            this.currentSliderImage = 0;
            this.selectRow(this.currentSliderImage);
        };
        MapComponent.prototype.slideToLast = function () {
            this.currentSliderImage = this.inforMatchingDocuments.length - 1;
            this.selectRow(this.currentSliderImage);
        };
        MapComponent.prototype.slideToNextImage = function () {
            if (this.currentSliderImage < this.inforMatchingDocuments.length - 1) {
                this.currentSliderImage++;
                this.selectRow(this.currentSliderImage);
            }
        };
        MapComponent.prototype.slideToPreviousImage = function () {
            if (this.currentSliderImage > 0) {
                this.currentSliderImage--;
                this.selectRow(this.currentSliderImage);
            }
        };
        /**
         * We show error image in case of displaying original image
         * @param sliderImage - Original infor document
         */
        MapComponent.prototype.invalidateImage = function (sliderImage) {
            console.error('Error loading: ', sliderImage.imageSrc);
            sliderImage.imageSrc = assets_1.assets.error;
        };
        /**
         * Key pressed (Currently handling A and X only)
         * @param event - event
         * @private
         */
        MapComponent.prototype.onKeyPress = function (event) {
            var _this = this;
            if (event.code === 'KeyA' || event.code === 'KeyX') {
                this.inforMatchingDocuments.forEach(function (item, index) {
                    if (item.selected) {
                        // Approve on X & Reject on A
                        item.status = event.code === 'KeyA' ? '40' : '30';
                        _this.updateRow(index, item);
                    }
                });
            }
        };
        /**
         * UPDATE WORK ORDER (SHORT DESCRIPTION)
         */
        MapComponent.prototype.send = function () {
            return __awaiter(this, void 0, void 0, function () {
                var data;
                return __generator(this, function (_a) {
                    if (!this.inforMatchingDocuments[this.currentSliderImage].equipment_id) {
                        throw Error('No equipment code found.');
                    }
                    data = "<?xml version=\"1.0\" encoding=\"utf-8\" ?>\n<Envelope xmlns=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\n    <Header>\n        <Tenant>" + this.tenantName + "</Tenant>\n        <SessionScenario xmlns=\"http://schemas.datastream.net/headers\">terminate</SessionScenario>\n        <Organization xmlns=\"http://schemas.datastream.net/headers\">*</Organization>\n    </Header>\n    <Body>\n        <MP0023_AddWorkOrder_001 xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" verb=\"Add\" noun=\"WorkOrder\" version=\"001\" callname=\"AddWorkOrder\" xmlns=\"http://schemas.datastream.net/MP_functions/MP0023_001\">\n            <WorkOrder recordid=\"1\" is_completed=\"true\" is_cancelled=\"true\" has_department_security=\"has_1\" is_batchwo=\"true\" is_parentpmwo=\"true\" is_batchwo_update=\"true\" is_room_occupied=\"false\" xmlns=\"http://schemas.datastream.net/MP_entities/WorkOrder_001\">\n                <WORKORDERID auto_generated=\"true\" xmlns=\"http://schemas.datastream.net/MP_fields\">\n                    <JOBNUM></JOBNUM>\n                    <ORGANIZATIONID entity=\"User\">\n                        <ORGANIZATIONCODE>" + this.organizationCode + "</ORGANIZATIONCODE>\n                    </ORGANIZATIONID>\n                    <DESCRIPTION>" + this.inforMatchingDocuments[this.currentSliderImage].shortDescription + "</DESCRIPTION>\n                </WORKORDERID>\n                <STATUS entity=\"User\" xmlns=\"http://schemas.datastream.net/MP_fields\">\n                    <STATUSCODE>R</STATUSCODE>\n                </STATUS>\n                <EQUIPMENTID xmlns=\"http://schemas.datastream.net/MP_fields\">\n                    <EQUIPMENTCODE>" + this.inforMatchingDocuments[this.currentSliderImage].equipment_id + "</EQUIPMENTCODE>\n                    <ORGANIZATIONID entity=\"Organization\">\n                        <ORGANIZATIONCODE>" + this.organizationCode + "</ORGANIZATIONCODE>\n                    </ORGANIZATIONID>\n                </EQUIPMENTID>\n                <TYPE entity=\"User\" xmlns=\"http://schemas.datastream.net/MP_fields\">\n                    <TYPECODE>BRKD</TYPECODE>\n                </TYPE>\n                <DEPARTMENTID xmlns=\"http://schemas.datastream.net/MP_fields\">\n                    <DEPARTMENTCODE>" + this.departmentCode + "</DEPARTMENTCODE>\n                    <ORGANIZATIONID entity=\"Group\">\n                        <ORGANIZATIONCODE>*</ORGANIZATIONCODE>\n                    </ORGANIZATIONID>\n                </DEPARTMENTID>\n             <FIXED xmlns=\"http://schemas.datastream.net/MP_fields\"></FIXED>\n            </WorkOrder>\n        </MP0023_AddWorkOrder_001>\n    </Body>\n</Envelope>";
                    return [2 /*return*/, this.http.post("https://mingle-ionapi.eu1.inforcloudsuite.com/" + this.tenantName + "/EAM/axis/services/EWSConnector/EWSConnector", data, {
                            responseType: 'text',
                            headers: new http_1.HttpHeaders({
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer " + this.token
                            })
                        }).toPromise().then(function (apiResponse) {
                            try {
                                console.log('Workload api response is ', apiResponse);
                                var message = /<ns1:Message>(.*?)<\/ns1:Message>/g.exec(apiResponse)[1];
                                return message;
                                // $('body').toast({title: 'Success', message: message});
                            }
                            catch (err) {
                                console.error('Error while extracting message from response but work order saved.', err);
                                return "Work order successfully updated.";
                                // $('body').toast({title: 'Success', message: 'Work order successfully updated.'});
                            }
                        }).catch(function (err) {
                            console.error('Error while updating work order.', err);
                            throw Error('Error while updating work order.');
                        })];
                });
            });
        };
        /**
         * Update Grid Data
         * @param data - Data
         */
        MapComponent.prototype.updateDataSet = function (data) {
            this.inforMatchingDocuments = JSON.parse(JSON.stringify(data));
            var grid = $('#datagrid').data('datagrid');
            grid.updateDataset(this.inforMatchingDocuments);
            grid.deSelectAllRows();
            this.currentSliderImage = 0;
            this.selectRow(0);
        };
        /**
         * Display all data in grid
         */
        MapComponent.prototype.resetGrid = function () {
            this.updateDataSet(this.inforMatchingDocumentsCopy);
        };
        MapComponent.prototype.injectMeta = function () {
            var node = document.createElement('meta');
            node.name = 'referrer';
            node.content = 'no-referrer';
            document.getElementsByTagName('head')[0].appendChild(node);
            this.injectClusterScript();
        };
        MapComponent.prototype.injectClusterScript = function () {
            var script = document.createElement('script'); // creates the script tag
            script.src = "https://unpkg.com/@googlemaps/markerclustererplus/dist/index.min.js";
            script.type = 'text/javascript';
            document.getElementsByTagName('head')[0].appendChild(script);
            this.injectGoogleMapsScript();
        };
        MapComponent.prototype.injectGoogleMapsScript = function () {
            var node = document.createElement('script'); // creates the script tag
            node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAF2LWQraFh6vs8rKvc5fjkCZyzaKQkmE8';
            // node.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDLG1B0MT2DyoTSZWdjm5G-kn3UwyBixGA';
            // node.src = 'https://maps.googleapis.com/maps/api/js'; // sets the source (insert url in between quotes)
            node.type = 'text/javascript'; // set the script type
            function gmapsLoaded() {
                this.googleMapsLibraryLoaded();
            }
            var gmapsCallback = gmapsLoaded.bind(this);
            node.onload = gmapsCallback;
            // append to head of document
            document.getElementsByTagName('head')[0].appendChild(node);
        };
        MapComponent.prototype.googleMapsLibraryLoaded = function () {
            try {
                var mapProperties = {
                    center: new google.maps.LatLng(-85, 180),
                    zoom: 13,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
            }
            catch (err) {
                console.error('Error setting up google maps plugin.', err);
            }
        };
        /**
         * Add clusters/markers on map on map
         */
        MapComponent.prototype.addCluster = function () {
            var _this = this;
            var bounds = new google.maps.LatLngBounds();
            this.markers = this.inforMatchingDocuments.map(function (location, i) {
                var marker = new google.maps.Marker({
                    position: location.attributes.location,
                    // map: this.map,
                    // label: 'Direct label',
                    label: {
                        text: _this.inforMatchingDocumentsPins[location.latlng].length.toString(),
                    },
                    icon: {
                        url: assets_1.assets.marker,
                        scaledSize: new google.maps.Size(40, 40),
                        labelOrigin: new google.maps.Point(20, 15) // setting position of label on marker
                    }
                });
                // show map in such a way that all clusters/markers show on screen (no hidden marker) (centralize)
                bounds.extend(marker.getPosition());
                // attaching key with markers (to show data in grid when marker clicked)
                _this.attachKey(marker, location.latlng);
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
                        url: assets_1.assets.cluster,
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
        };
        /**
         * attaching key with markers (to show data in grid when marker clicked)
         * @param marker - Marker
         * @param key - (lan+lan).toString() | KEY
         */
        MapComponent.prototype.attachKey = function (marker, key) {
            var _this = this;
            var infowindow = new google.maps.InfoWindow({
                content: key,
            });
            marker.addListener("click", function () {
                _this.updateDataSet(_this.inforMatchingDocumentsPins[infowindow.get('content')]);
                // infowindow.open(marker.get("map"), marker);
            });
        };
        MapComponent.prototype.syncFromWidgetSettings = function () {
            this.tenantName = this.widgetContext.getSettings().get("Tenant");
            this.organizationCode = this.widgetContext.getSettings().get("Organization");
            this.departmentCode = this.widgetContext.getSettings().get("Department");
            console.log('**************************** tenant name is ', this.tenantName);
            console.log('**************************** organizationCode is ', this.organizationCode);
            console.log('**************************** departmentCode is ', this.departmentCode);
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
        __decorate([
            core_1.ViewChild("imageSlider", { static: true }),
            __metadata("design:type", Object)
        ], MapComponent.prototype, "imageSlider", void 0);
        __decorate([
            core_1.HostListener('document:keydown', ['$event']),
            __metadata("design:type", Function),
            __metadata("design:paramtypes", [KeyboardEvent]),
            __metadata("design:returntype", void 0)
        ], MapComponent.prototype, "keypress", null);
        MapComponent = __decorate([
            core_1.Component({
                template: "\n        <!-- **************************************   -->\n        <!-- *********      H T M L      **********   -->\n        <!-- **************************************   -->\n        <div class=\"main-container\">\n            <!-- First Box (map) -->\n            <div>\n                <div #map style=\"width:100%;height:300px\"></div>\n            </div>\n            <!-- Second Box (grid) -->\n            <div style=\"height: 300px;padding: 0\" class=\"row\">\n                <div id=\"datagrid\">\n                </div>\n            </div>\n            <!-- Third Box (reset button) -->\n            <div style=\"cursor:pointer;\" (click)=\"resetGrid()\">\n                <img [src]=\"assets.refresh\">\n            </div>\n            <!--  Slider   -->\n            <div class=\"expanded\">\n                <ng-container *ngIf=\"inforMatchingDocuments\">\n                    <div class=\"mby-slider-wrapper\">\n                        <div class=\"slider-container\">\n                            <div class=\"imageSlider\" [ngStyle]=\"{'left':'-' + currentSliderImage * 550+'px'}\">\n                                <div *ngFor=\"let sliderImage of inforMatchingDocuments;\"\n                                     [ngStyle]=\"{'background-image': 'url(' + sliderImage.imageSrc+ ')'}\"\n                                     style=\"background-size:cover;height:400px;width:550px;\">\n                                    <img [src]=\"sliderImage.imageSrc\" (error)=\"invalidateImage(sliderImage);\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"controls\">\n                            <div style=\"padding: 2px; cursor: pointer\"\n                                 (click)=\"disableWorkOrderForm();\">\n                                <img [src]=\"assets.noIcon\" width=\"23\"/>\n                            </div>\n                            <div style=\"display: flex; justify-content: center\">\n                                <div>\n                                    <img src=\"{{assets.doubleArrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToFirst()\"/>\n                                    <img src=\"{{assets.arrowLeft}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToPreviousImage()\"/>\n                                    <span class=\"slide-numbers\">{{currentSliderImage + 1}}\n                                        of {{inforMatchingDocuments.length}}</span>\n                                    <img src=\"{{assets.rightArrow}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToNextImage()\"/>\n                                    <img src=\"{{assets.doubleArrowRight}}\" class=\"navigation-icon\"\n                                         (click)=\"slideToLast()\"/>\n                                </div>\n                            </div>\n                            <div style=\"padding-left: 19px; padding-top: 2px;cursor: pointer;\"\n                                 (click)=\"enableWorkOrderForm(); openDialog()\"\n                            >\n                                <!--(click)=\"inforMatchingDocuments[currentSliderImage].status = '40'; enableWorkOrderForm();\"-->\n                                <img [src]=\"assets.checkIcon\" width=\"23\"/>\n                            </div>\n                        </div>\n                    </div>\n                </ng-container>\n            </div>\n        </div>\n        <div *ngIf=\"showWorkOrderModal\">\n            <div class=\"modal\" id=\"workOrderModal\" style=\"width: 600px\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\" style=\"display: flex\">\n                        <div style=\"width: 50%\">\n                            <!--<h3>QUICK WORKORDER</h3>-->\n                            <div style=\"font-size: 16px; margin-bottom: 15px\">QUICK WORKORDER</div>\n                        </div>\n                        <!--<div style=\"width: 50%\">\n                            <button style=\"float: right\" type=\"button\" (click)=\"closeDialog()\"><img\n                                    [src]=\"close\"\n                                    class=\"openDialogIcon\"/></button>\n                        </div>-->\n                    </div>\n                    <div class=\"modal-body\">\n                        <!-- Fourth Box  (Form)      -->\n                        <div>\n                            <div style=\"display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px\">\n                                <div>\n                                    <!--<div>\n                                        <input style=\"width: 100%\" type=\"text\" id=\"first-name\" name=\"first-name\"\n                                               placeholder=\"Title\">\n                                    </div>-->\n                                    <div>\n                                <textarea style=\"width: 100%; height: 165px\" id=\"description\" name=\"description\"\n                                          [(ngModel)]=\"inforMatchingDocuments[currentSliderImage].shortDescription\"\n                                          placeholder=\"Short Description\"></textarea>\n                                    </div>\n                                </div>\n                                <div>\n                                    <div>\n                                        <img [src]=\"inforMatchingDocuments[currentSliderImage].imageSrc\" height=\"165px\">\n                                        <!--<div [ngStyle]=\"{'background-image': 'url(' + inforMatchingDocuments[currentSliderImage].imageSrc+ ')'}\"\n                                             style=\"background-size:cover;height:165px\">\n                                        </div>-->\n                                    </div>\n                                    <div style=\"float: right; font-size: 12px; margin-top: 10px\">\n                                        Location: {{inforMatchingDocuments[currentSliderImage].attributes['pin']}}<br>\n                                        Time: {{inforMatchingDocuments[currentSliderImage].date}}\n                                    </div>\n                                </div>\n                            </div>\n                            <div style=\"display:grid; grid-template-columns: 0.6fr 0.4fr; grid-gap: 10px; margin-top: 20px\">\n                                <div>\n                                    <!--<select style=\"width: 100%;\" id=\"states\" name=\"states\" class=\"dropdown\">\n                                        <option value=\"AL\">Assign To:</option>\n                                        <option value=\"CA\">California</option>\n                                        <option value=\"DE\">Delaware</option>\n                                        <option value=\"NY\">New York</option>\n                                        <option value=\"WY\">Wyoming</option>\n                                    </select>-->\n                                </div>\n                                <!--<div>\n                                    <button style=\"float: right\" class=\"btn-primary\" type=\"button\"\n                                            id=\"page-button-primary\"\n                                            (click)=\"send()\">\n                                        Send\n                                    </button>\n                                </div>-->\n                            </div>\n                        </div>\n                        <!--<div class=\"modal-buttonset\">\n                            <button type=\"button\" id=\"generate\" class=\"btn-modal-primary\" style=\"width:50%\">Generate\n                            </button>\n                            <button type=\"button\" id=\"cancel\" class=\"btn-modal\" style=\"width:50%\">Cancel</button>\n                            <button type=\"button\" id=\"submit\" class=\"btn-modal-primary\" style=\"width:50%\">Submit</button>\n                        </div>-->\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                styles: ["\n        /*************************************/\n        /*****           C S S           *****/\n        /*************************************/\n        .main-container {\n            display: grid;\n            grid-template-columns: 1fr 1fr 12px;\n            grid-template-rows: repeat(auto-fit, 1fr);\n            gap: 1rem;\n            margin: 7px;\n        }\n\n        .expanded {\n            grid-column: 1 / -1;\n            margin-left: 25%;\n        }\n\n        .heading-row {\n            background-color: #c3c3c3;\n            color: white;\n            height: 5rem;\n        }\n\n        .grid-filter-input {\n            height: 1.5rem;\n            color: white;\n            width: 15rem;\n            background-color: white;\n            color: black;\n            border: 0px;\n            font-size: 11px;\n            padding-left: 0px;\n            margin-top: 2px;\n        }\n\n        .coordinates-outline {\n            border: 1px solid #cdcdcd;\n            border-radius: 15px;\n            height: 300px;\n            overflow-y: scroll;\n        }\n\n        .table-grid {\n            display: grid;\n            grid-template-columns: 0.1fr 0.9fr 0.9fr;\n        }\n\n        .table-grid > div {\n            padding: 10px;\n            line-height: 10px;\n            /*border: 0.5px solid #cdcdcd;*/\n            display: grid;\n        }\n\n        .form-outline {\n            border: 1px solid #ccc;\n            border-radius: 15px;\n            padding: 10px;\n            height: 310px;\n            color: #ccc;\n        }\n\n        .controls {\n            display: grid;\n            grid-template-columns: 0.1fr 1fr 0.1fr;\n            background-color: white;\n            width: 98%;\n            margin-left: 1%;\n            padding-top: 1px;\n            border-radius: 5px;\n            height: 30px;\n            position: relative;\n            bottom: 40px;\n        }\n\n        .navigation-icon {\n            cursor: pointer;\n            height: 25px;\n        }\n\n        .slide-numbers {\n            font-size: 16px;\n            position: relative;\n            top: -7px;\n        }\n\n        .mby-slider-wrapper {\n            display: grid;\n            width: 550px;\n        }\n\n        .slider-container {\n            height: 300px;\n            overflow: hidden;\n        }\n\n        .imageSlider {\n            display: grid;\n            position: relative;\n            transition-property: left;\n            transition-duration: 0.5s;\n            transition-timing-function: ease-in-out;\n            grid-template-columns: repeat(15, 550px);\n        }\n\n        /* Dropdown: Assign To: Label color */\n        ::ng-deep .dropdown span {\n            color: #ccc;\n        }\n\n        /* Dropdown: Assign To: Width */\n        ::ng-deep .dropdown-wrapper {\n            width: 100%;\n        }\n\n        /* By default, infor grid take plae of toolbar, we don't need that */\n        ::ng-deep .row > .toolbar.do-resize {\n            display: none;\n        }\n\n        ::ng-deep .datagrid-header th {\n            background: linear-gradient(0deg, #2b79a7 0%, #4ebbfb 50%, #2b79a7 100%);\n        }\n    "]
                // changeDetection: ChangeDetectionStrategy.OnPush
            })
            /*************************************/
            /* ****      TypeScript         **** */
            /*************************************/
            ,
            __metadata("design:paramtypes", [core_1.ChangeDetectorRef, forms_1.FormBuilder, http_2.HttpClient])
        ], MapComponent);
        return MapComponent;
    }());
    exports.MapComponent = MapComponent;
    var MapsModule = /** @class */ (function () {
        function MapsModule() {
        }
        MapsModule = __decorate([
            core_1.NgModule({
                imports: [common_1.CommonModule, sohoxi_angular_1.SohoListViewModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpClientModule],
                declarations: [MapComponent],
                entryComponents: [MapComponent]
            })
        ], MapsModule);
        return MapsModule;
    }());
    exports.MapsModule = MapsModule;
});
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
//# sourceMappingURL=main.js.map