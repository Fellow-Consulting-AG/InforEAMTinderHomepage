var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core", "@infor/sohoxi-angular", "rxjs/operators", "../services/user.service"], function (require, exports, core_1, sohoxi_angular_1, operators_1, user_service_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserWorkspaceComponent = void 0;
    var UserWorkspaceComponent = /** @class */ (function () {
        function UserWorkspaceComponent(userService, toastService) {
            this.userService = userService;
            this.toastService = toastService;
        }
        UserWorkspaceComponent.prototype.ngOnInit = function () {
            this.editableUser = __assign({}, this.user);
            this.lang = this.widgetContext.getLanguage();
        };
        UserWorkspaceComponent.prototype.submitClicked = function () {
            var _this = this;
            return this.userService.update(this.editableUser).pipe(operators_1.tap(function () {
                _this.toastService.show({
                    title: _this.lang.submitToastTitle,
                    message: _this.lang.submitToastMessage,
                    timeout: 2000,
                    position: sohoxi_angular_1.SohoToastService.BOTTOM_RIGHT,
                });
            }));
        };
        UserWorkspaceComponent.prototype.launchClicked = function () {
            // this.widgetContext.launch({ ... })
            this.toastService.show({
                title: this.lang.launchToastTitle,
                message: this.lang.launchToastMessage,
                timeout: 2000,
                position: sohoxi_angular_1.SohoToastService.BOTTOM_RIGHT,
            });
        };
        UserWorkspaceComponent = __decorate([
            core_1.Component({
                template: "\n\t\t<div class=\"header-section\">\n\t\t\t<div class=\"row top-padding bottom-padding\">\n\t\t\t\t<div class=\"twelve columns\">\n\t\t\t\t\t<h1>{{user.firstName}} {{user.lastName}}</h1>\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t\t<div class=\"row\">\n\t\t\t\t<div class=\"two columns\">\n\t\t\t\t\t<img style=\"border-radius:50%; width: 80px;\" [src]=\"user.photoUrl\">\n\t\t\t\t</div>\n\t\t\t\t<div class=\"five columns\">\n\t\t\t\t\t<div class=\"field label-left\">\n\t\t\t\t\t\t<span class=\"label\">{{lang.title}}</span>\n\t\t\t\t\t\t<span class=\"data\">{{user.title}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"field label-left\">\n\t\t\t\t\t\t<span class=\"label\">{{lang.email}}</span>\n\t\t\t\t\t\t<span class=\"data\">{{user.email}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class=\"detail-section\">\n\t\t\t<div class=\"row top-padding\">\n\t\t\t\t<div class=\"six columns\">\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label class=\"required\">{{lang.firstName}}</label>\n\t\t\t\t\t\t<input type=\"text\" data-validate=\"required\" [(ngModel)]=\"editableUser.firstName\" [disabled]=\"readOnly\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label class=\"required\">{{lang.lastName}}</label>\n\t\t\t\t\t\t<input type=\"text\" data-validate=\"required\" [(ngModel)]=\"editableUser.lastName\" [disabled]=\"readOnly\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"six columns\">\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label>{{lang.title}}</label>\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"editableUser.title\" [disabled]=\"readOnly\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t<label>{{lang.email}}</label>\n\t\t\t\t\t\t<input type=\"text\" [(ngModel)]=\"editableUser.email\" [disabled]=\"readOnly\">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t",
            }),
            __metadata("design:paramtypes", [user_service_1.UserService, sohoxi_angular_1.SohoToastService])
        ], UserWorkspaceComponent);
        return UserWorkspaceComponent;
    }());
    exports.UserWorkspaceComponent = UserWorkspaceComponent;
});
//# sourceMappingURL=user-workspace.component.js.map