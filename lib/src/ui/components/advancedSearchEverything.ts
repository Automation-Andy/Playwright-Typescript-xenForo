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

  async search(params: SearchParameters): Promise<void> {
    if (params.keywords !== undefined) {
      await this.setKeywords(params.keywords);
    }

    if (params.searchTitlesOnly !== undefined) {
      await this.setSearchTitlesOnly(params.searchTitlesOnly);
    }

    if (params.postedBy !== undefined) {
      await this.setPostedBy(params.postedBy);
    }

    if (params.newerThan !== undefined) {
      await this.setNewerThan(params.newerThan);
    }

    if (params.olderThan !== undefined) {
      await this.setOlderThan(params.olderThan);
    }
  
    await this.clickSearch();
  }

  async setKeywords(keywords: string): Promise<void> {
    await this.locators.txtKeywords.fill(keywords);
  }

  async setSearchTitlesOnly(checked: boolean): Promise<void> {
    await this.locators.chkSearchTitlesOnly.setChecked(checked);
  }

  async setPostedBy(postedBy: string): Promise<void> {
    await this.locators.txtPostedBy.fill(postedBy);
  }

  async setNewerThan(newerThan: string): Promise<void> {
    await this.locators.txtNewerThan.fill(newerThan);
  }

  async setOlderThan(olderThan: string): Promise<void> {
    await this.locators.txtOlderThan.fill(olderThan);
  }

  async clickSearch(): Promise<void> {
    await this.locators.btnSearch.click();
  } 
}

export interface SearchParameters {
  keywords?: string;
  searchTitlesOnly?: boolean;
  postedBy?: string;
  newerThan?: string;
  olderThan?: string;
}