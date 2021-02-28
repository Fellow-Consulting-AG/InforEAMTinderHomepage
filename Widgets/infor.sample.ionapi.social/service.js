var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "rxjs", "rxjs/operators"], function (require, exports, core_1, rxjs_1, operators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DataService = void 0;
    var DataService = /** @class */ (function () {
        function DataService() {
            this.serviceUrl = "Mingle/SocialService.Svc";
        }
        DataService.prototype.loadUser = function (widgetContext) {
            var _this = this;
            if (this.user) {
                return rxjs_1.of(this.user);
            }
            var request = this.createRequest("User/Detail");
            return widgetContext.executeIonApiAsync(request).pipe(operators_1.map(function (response) { return response.data.UserDetailList[0]; }), operators_1.tap(function (user) { return _this.user = user; }));
        };
        DataService.prototype.loadPhoto = function (userGuid, widgetContext) {
            var relativeUrl = "User/" + userGuid + "/ProfilePhoto?thumbnailType=3";
            var request = this.createRequest(relativeUrl, { Accept: "image/png, image/jpeg" });
            request.responseType = "blob";
            return widgetContext.executeIonApiAsync(request).pipe(operators_1.map(function (response) { return response.data; }));
        };
        DataService.prototype.createRequest = function (relativeUrl, headers) {
            if (!headers) {
                headers = { Accept: "application/json" };
            }
            // Create the relative URL to the ION API
            var url = this.serviceUrl + "/" + relativeUrl;
            // Create HTTP GET request object
            var request = {
                method: "GET",
                url: url,
                cache: false,
                headers: headers || null
            };
            return request;
        };
        DataService = __decorate([
            core_1.Injectable({
                providedIn: "root"
            })
        ], DataService);
        return DataService;
    }());
    exports.DataService = DataService;
});
//# sourceMappingURL=service.js.map