"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = void 0;
var navBar_1 = require("./components/navBar");
var staffBar_1 = require("./components/staffBar");
var Components = /** @class */ (function () {
    function Components(page) {
        this.page = page;
        this.navBar = new navBar_1.NavBar(this.page);
        this.staffBar = new staffBar_1.StaffBar(this.page);
    }
    return Components;
}());
exports.Components = Components;
