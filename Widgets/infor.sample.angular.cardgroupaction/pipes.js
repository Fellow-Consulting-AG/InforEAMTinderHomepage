var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "@angular/core", "./core"], function (require, exports, core_1, core_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CategoryFilterPipe = void 0;
    var CategoryFilterPipe = /** @class */ (function () {
        function CategoryFilterPipe() {
        }
        CategoryFilterPipe.prototype.transform = function (items, category) {
            if (category === core_2.Category.All) {
                return items;
            }
            return items.filter(function (item) { return item.category === category; });
        };
        CategoryFilterPipe = __decorate([
            core_1.Pipe({ name: "filterBy" })
        ], CategoryFilterPipe);
        return CategoryFilterPipe;
    }());
    exports.CategoryFilterPipe = CategoryFilterPipe;
});
//# sourceMappingURL=pipes.js.map