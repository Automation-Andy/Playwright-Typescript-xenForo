import { Page } from "@playwright/test";

export class Search {
    readonly container = this.page.locator(`[data-xf-init=quick-search]`);

    readonly locators = {
        txtSearch: this.container.getByPlaceholder('Search…'),
        chkSearchTitlesOnly: this.container.locator(`[name="c[title_only]"]`),
        txtByMember: this.container.getByPlaceholder('Member'),
        btnSearch: this.container.getByRole('button', { name: 'Search' }),
        btnAdvancedSearch: this.container.getByRole('link', { name: 'Advanced search…' }),
    }
    constructor(private page: Page) {}
    
    async performSearch(searchText: string, titlesOnly: boolean, byMember: string): Promise<void> {
        await this.locators.txtSearch.fill(searchText);
        await this.locators.chkSearchTitlesOnly.setChecked(titlesOnly);
        await this.locators.txtByMember.fill(byMember);
        await this.locators.btnSearch.click();
    }
}