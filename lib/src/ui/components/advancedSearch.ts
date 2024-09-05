import { Page } from "@playwright/test";
import { AdvancedSearchEverything } from "@ui/components/advancedSearchEverything";

export class AdvancedSearch {
    
    private readonly locators = {
        lnkSearchEverything: this.page.getByRole('link', { name: 'Search everything' }),
        lnkSearchThreads: this.page.getByRole('link', { name: 'Search threads' }),
        lnkSearchProfilePosts: this.page.getByRole('link', { name: 'Search profile posts' }),
    }

    private readonly _searchEverything = new AdvancedSearchEverything(this.page);
    constructor(private page: Page) {}
    
    async searchEverything(keywords: string, titlesOnly: boolean, postedBy: string, newerThan: string, olderThan: string): Promise<void> {
        await this.locators.lnkSearchEverything.click();
        await this._searchEverything.search(keywords, titlesOnly, postedBy, newerThan, olderThan);
    }
}