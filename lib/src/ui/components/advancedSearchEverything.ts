import { Page } from "@playwright/test";

export class AdvancedSearchEverything {
    readonly locators = {
        txtKeywords: this.page.getByLabel('Keywords'),
        chkSearchTitlesOnly: this.page.locator(`[name="c[title_only]"]`),
        txtPostedBy: this.page.getByLabel('Posted by'),
        txtNewerThan: this.page.getByLabel('Newer than'),
        txtOlderThan: this.page.getByLabel('Older than'),
        btnSearch: this.page.getByRole('button', { name: 'Search' }),
    }
    constructor(private page: Page) {}
    
    async search(keywords: string, titlesOnly: boolean, postedBy: string, newerThan: string, olderThan: string): Promise<void> {
        await this.locators.txtKeywords.fill(keywords);
        await this.locators.chkSearchTitlesOnly.setChecked(titlesOnly);
        await this.locators.txtPostedBy.fill(postedBy);
        await this.locators.txtNewerThan.fill(newerThan);
        await this.locators.txtOlderThan.fill(olderThan);
        await this.locators.btnSearch.click();
    }
}