"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffBar = void 0;
var StaffBar = /** @class */ (function () {
    function StaffBar(page) {
        this.page = page;
        this.locators = {
            links: {
                admin: this.page.getByRole("link", { name: "Admin" }),
            }
        };
    }
    return StaffBar;
}());
exports.StaffBar = StaffBar;
