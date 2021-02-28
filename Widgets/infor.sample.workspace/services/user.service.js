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
define(["require", "exports", "@angular/core", "rxjs", "rxjs/operators"], function (require, exports, core_1, rxjs_1, operators_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UserService = void 0;
    var UserService = /** @class */ (function () {
        function UserService() {
            this.usersSubject = new rxjs_1.BehaviorSubject(generateUsers());
        }
        Object.defineProperty(UserService.prototype, "users$", {
            get: function () {
                return this.usersSubject.pipe(operators_1.map(deepCopy));
            },
            enumerable: false,
            configurable: true
        });
        UserService.prototype.update = function (user) {
            var _this = this;
            return new rxjs_1.Observable(function (observer) {
                var users = _this.usersSubject.value;
                var index = users.findIndex(function (_a) {
                    var id = _a.id;
                    return id === user.id;
                });
                if (index === -1) {
                    observer.error(Error("Could not find user with id '" + user.id + "'"));
                    return;
                }
                if (!user.firstName) {
                    observer.error(Error("User must have a first name"));
                    return;
                }
                if (!user.lastName) {
                    observer.error(Error("User must have a last name"));
                    return;
                }
                users[index] = __assign(__assign({}, users[index]), user);
                _this.usersSubject.next(users);
                observer.next();
                observer.complete();
            });
        };
        UserService = __decorate([
            core_1.Injectable({
                providedIn: "root",
            })
        ], UserService);
        return UserService;
    }());
    exports.UserService = UserService;
    function deepCopy(value) {
        // tslint:disable-next-line: no-unsafe-any
        return JSON.parse(JSON.stringify(value));
    }
    function generateUsers() {
        return [
            user({ firstName: "Eddard", lastName: "Stark", title: "Warden of the North", email: "ned@housestark.north" }),
            user({ firstName: "Jamie", lastName: "Lannister", title: "Kniggit", email: "jamie@kingsguard.gov" }),
            user({ firstName: "John", lastName: "Doe" }),
            user({ firstName: "James", lastName: "Bond", title: "Secret Agent" }),
            user({ firstName: "Bilbo", lastName: "Baggins", title: "Burglar" }),
        ];
        function user(partial) {
            return __assign({ id: "id-" + Math.random(), photoUrl: "https://picsum.photos/80", email: "example@example.com", firstName: "First", lastName: "Last", title: "Unknown" }, partial);
        }
    }
});
//# sourceMappingURL=user.service.js.map