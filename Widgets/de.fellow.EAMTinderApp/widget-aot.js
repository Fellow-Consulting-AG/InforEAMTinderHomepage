"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgetFactory = void 0;
var main_1 = require("./main");
var main_ngfactory_1 = require("./main.ngfactory");
exports.widgetFactory = function (context) {
    return {
        angularConfig: {
            moduleFactory: main_ngfactory_1.CardListModuleNgFactory,
            componentType: main_1.CardListComponent
        }
    };
};
