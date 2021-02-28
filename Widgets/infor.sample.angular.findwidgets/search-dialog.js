var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", "@angular/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchDialogComponent = void 0;
    var SearchDialogComponent = /** @class */ (function () {
        function SearchDialogComponent() {
        }
        __decorate([
            core_1.Input(),
            __metadata("design:type", String)
        ], SearchDialogComponent.prototype, "searchLabel", void 0);
        SearchDialogComponent = __decorate([
            core_1.Component({
                template: "\n\t<div class=\"field\">\n\t\t<label for=\"queryInput\" class=\"required\">{{searchLabel}}</label>\n\t\t<input\n\t\t\tid=\"queryInput\"\n\t\t\t[(ngModel)]=\"query\"\n\t\t\tdata-validate=\"required\"\n\t\t\tplaceholder=\"Example: infor.sample.angular.helloworld\"/>\n\t</div>\n\t",
            })
        ], SearchDialogComponent);
        return SearchDialogComponent;
    }());
    exports.SearchDialogComponent = SearchDialogComponent;
});
//# sourceMappingURL=search-dialog.js.map