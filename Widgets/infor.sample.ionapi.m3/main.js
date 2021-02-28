var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/common", "@angular/core", "@infor/sohoxi-angular", "./service"], function (require, exports, common_1, core_1, sohoxi_angular_1, service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IonApiM3Module = exports.IonApiM3Component = void 0;
    // Prerequisites
    // =============
    // The following steps are required before testing this sample widget.
    // - Aquire the server and port number for the ION API server to test with.
    // - Configure and start a localhost proxy with the ION API server and port number.
    // - Example: node proxy.js 8083 "yourservername" 443
    // - Example: \Samples\StartIonApiProxy.cmd
    //
    // - Set the ionApiUrl property in the configuration.json file to the URL of the localhost proxy.
    // - The configuration.json file is located in the root of the Widgets sample project by default.
    // - The URL should include the tenant to test with.
    // - Example: "ionApiUrl": "http://localhost:8083/tenantid"
    //
    // - Acquire an OAuth token string.
    // - Log on to Ming.le.
    // - Example: https://yourservername/tenantid/
    // - Open a new tab in the same browser and navigate to the Grid SAML Session Provider OAuth resource
    // - The Grid must be version 2.0 or later with a SAML Session Provider configured for the same IFS as Ming.le.
    // - Example: https://yourservernameandport/grid/rest/security/sessions/oauth
    // - Copy the the OAuth token string from the browser window.
    //
    // - If there are issues you can verify if your user has access to the grid by navigating to the Grid user page.
    // - Note that you must be logged on to Ming.le before doing this.
    // - Example: https://yourservernameandport/grid/user
    //
    // - Set the ionApiToken property in the configuration.json file to the OAuth token string.
    // - Example: "ionApiToken": "V9k5niTDR1kq6RuYlEq3N3HxGq8u"
    //
    // - Set the devConfiguration attribute on the <lm-page-container> to the name of the configuration.json file
    // - Example:
    // - <lm-page-container devWidget="infor.sample.ionapi.m3" devConfiguration="configuration.json"></lm-page-container>
    //
    //
    // Developing and debugging
    // ========================
    // A widget using the ION API can be developed and debugged like any other widget.
    // Just remember to start the proxy and configure the configuration.json file.
    // The OAuth token will time out and when that happens you must acquire a new token and update the configuration.json
    // file.
    var IonApiM3Component = /** @class */ (function () {
        function IonApiM3Component(m3Service) {
            this.m3Service = m3Service;
            this.customerItems$ = this.m3Service.getCustomerData();
        }
        IonApiM3Component = __decorate([
            core_1.Component({
                providers: [service_1.M3Service],
                template: "\n\t<soho-listview>\n\t\t<li soho-listview-item *ngFor=\"let item of customerItems$ | async\">\n\t\t\t<p soho-listview-header>{{item.title}}</p>\n\t\t\t<p soho-listview-subheader>{{item.description}}</p>\n\t\t</li>\n\t</soho-listview>\n\t",
            }),
            __metadata("design:paramtypes", [service_1.M3Service])
        ], IonApiM3Component);
        return IonApiM3Component;
    }());
    exports.IonApiM3Component = IonApiM3Component;
    var IonApiM3Module = /** @class */ (function () {
        function IonApiM3Module() {
        }
        IonApiM3Module = __decorate([
            core_1.NgModule({
                imports: [
                    sohoxi_angular_1.SohoListViewModule,
                    common_1.CommonModule
                ],
                declarations: [IonApiM3Component],
                entryComponents: [IonApiM3Component],
            })
        ], IonApiM3Module);
        return IonApiM3Module;
    }());
    exports.IonApiM3Module = IonApiM3Module;
});
//# sourceMappingURL=main.js.map