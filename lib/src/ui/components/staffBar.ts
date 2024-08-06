import { Page } from "@playwright/test";

export class StaffBar {
    readonly locators = {
        links: {
            admin: this.page.getByRole("link", { name: "Admin" }),
        }
        
    }
    constructor(private readonly page: Page) {}
}