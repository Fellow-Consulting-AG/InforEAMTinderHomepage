var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "@angular/core", "lime", "rxjs", "rxjs/operators"], function (require, exports, core_1, lime_1, rxjs_1, operators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.M3Service = void 0;
    var M3Service = /** @class */ (function () {
        function M3Service(widgetContext) {
            this.widgetContext = widgetContext;
            this.logPrefix = "[IonApiM3Sample] ";
        }
        M3Service.prototype.getCustomerData = function () {
            var _this = this;
            this.setBusy(true);
            var request = this.createRequest();
            return this.widgetContext.executeIonApiAsync(request).pipe(operators_1.map(function (response) { return _this.getParsedRecords(response.data.MIRecord); }), operators_1.tap(function () { return _this.setBusy(false); }), operators_1.catchError(function (error) {
                _this.showErrorMessage(error);
                return rxjs_1.of([]);
            }));
        };
        M3Service.prototype.createRequest = function () {
            return {
                method: "GET",
                url: "/M3/m3api-rest/execute/CRS610MI/LstByName",
                cache: false,
                headers: {
                    Accept: "application/json"
                }
            };
        };
        M3Service.prototype.setBusy = function (isBusy) {
            this.widgetContext.setState(isBusy ? lime_1.WidgetState.busy : lime_1.WidgetState.running);
        };
        M3Service.prototype.getParsedRecords = function (records) {
            var _this = this;
            return records.map(function (record) { return ({
                title: _this.getValue(record.NameValue, "CUNO"),
                description: _this.getValue(record.NameValue, "CUNM"),
            }); });
        };
        M3Service.prototype.getValue = function (nameValues, name) {
            var nameValueWithMatchingName = nameValues.find(function (nameValue) { return nameValue.Name === name; });
            if (nameValueWithMatchingName) {
                return nameValueWithMatchingName.Value.trim();
            }
            else {
                return null;
            }
        };
        M3Service.prototype.showErrorMessage = function (error) {
            lime_1.Log.error(this.logPrefix + "ION API Error: " + JSON.stringify(error));
            this.widgetContext.showWidgetMessage({
                type: lime_1.WidgetMessageType.Error,
                message: "Unable to load customer data"
            });
            this.setBusy(false);
        };
        M3Service = __decorate([
            core_1.Injectable(),
            __param(0, core_1.Inject(lime_1.widgetContextInjectionToken)),
            __metadata("design:paramtypes", [lime_1.IWidgetContext])
        ], M3Service);
        return M3Service;
    }());
    exports.M3Service = M3Service;
});
//# sourceMappingURL=service.js.map