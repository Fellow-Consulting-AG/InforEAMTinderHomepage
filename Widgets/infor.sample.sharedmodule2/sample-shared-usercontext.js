var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "rxjs"], function (require, exports, core_1, rxjs_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserContextService = void 0;
    var UserContextService = /** @class */ (function () {
        function UserContextService() {
            this.noOfContextRequests = 0;
        }
        UserContextService.prototype.getUserContext = function (widgetContext) {
            this.noOfContextRequests++;
            var subject = new rxjs_1.AsyncSubject();
            if (this.userContext) {
                subject.next(this.userContext);
                subject.complete();
                this.showLoadInfo(false);
            }
            else {
                var pending = this.pendingContextSubjects;
                if (pending && pending.length) {
                    pending.push(subject);
                }
                else {
                    this.pendingContextSubjects = [subject];
                    this.loadUserContext(widgetContext);
                }
            }
            return subject.asObservable();
        };
        UserContextService.prototype.loadUserContext = function (widgetContext) {
            var _this = this;
            var pending = this.pendingContextSubjects;
            // *** Real scenario would be to load the context through some ION API ***
            // const baseUrl = widgetContext.isCloud() ? "M3" : "CustomerApi/M3";
            // const options = {
            // 	url: baseUrl + "MNS150MI/GetUserData",
            // 	method: "GET"
            // } as IIonApiRequestOptions;
            // widgetContext.executeIonApiAsync(options).subscribe((response: IIonApiResponse<IUserContext>) => {
            // 	const userContext = response.data as IUserContext;
            // 	this.userContext = userContext;
            // 	this.resolve(pending, userContext);
            // }, (e) => {
            // 	this.reject(pending, e);
            // });
            // *** Using mock data for sample ***
            setTimeout(function () {
                var userContext = {
                    name: "Hulk Holding",
                    userId: "hholding",
                    department: "Dept. A",
                    area: "10"
                };
                _this.userContext = userContext;
                _this.resolve(pending, userContext);
            }, 3000);
        };
        UserContextService.prototype.resolve = function (subjects, value) {
            for (var _i = 0, subjects_1 = subjects; _i < subjects_1.length; _i++) {
                var subject = subjects_1[_i];
                subject.next(value);
                subject.complete();
            }
            subjects.splice(0, subjects.length);
            this.showLoadInfo(true);
        };
        UserContextService.prototype.reject = function (subjects, reason) {
            for (var _i = 0, subjects_2 = subjects; _i < subjects_2.length; _i++) {
                var subject = subjects_2[_i];
                subject.error(reason);
            }
            subjects.splice(0, subjects.length);
        };
        UserContextService.prototype.showLoadInfo = function (onInit) {
            var title = onInit ? "User context loaded" : "User context not loaded";
            var loadedOnceMessage = "User context was requested " + this.noOfContextRequests + " times, but only loaded once";
            var notReloadedMessage = "Existing user context returned, not re-loaded";
            var message = onInit ? loadedOnceMessage : notReloadedMessage;
            $("body").toast({ title: title, message: message, position: "bottom right" });
        };
        UserContextService = __decorate([
            core_1.Injectable({
                providedIn: "root"
            })
        ], UserContextService);
        return UserContextService;
    }());
    exports.UserContextService = UserContextService;
});
//# sourceMappingURL=sample-shared-usercontext.js.map