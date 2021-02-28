define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockData = exports.Category = void 0;
    var Category;
    (function (Category) {
        Category["All"] = "All";
        Category["Customer"] = "Customer";
        Category["Warehouse"] = "Warehouse";
    })(Category = exports.Category || (exports.Category = {}));
    exports.mockData = [
        {
            isError: true,
            title: "Stock level 31-22",
            description: "Stocklevel has reached 100 items",
            category: Category.Warehouse
        },
        {
            title: "Customer returns",
            description: "Customer returns has increased with 10%",
            category: Category.Customer
        },
        {
            title: "Customer approved",
            description: "Customer Hulk Holding has been approved.",
            category: Category.Customer
        },
        {
            title: "Stock level Chair-3",
            description: "WHLO 200 has 500 items",
            category: Category.Customer
        },
        {
            title: "Planned machine maintenance",
            description: "Planned time",
            category: Category.Warehouse
        }
    ];
});
//# sourceMappingURL=core.js.map