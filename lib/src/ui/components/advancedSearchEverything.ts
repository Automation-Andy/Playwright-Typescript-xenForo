import { Page } from '@playwright/test';

export class AdvancedSearchEverything {
  private readonly _container = this._page.locator(`.p-body-content`);
  private readonly _locators = {
    txtKeywords: this._page.getByLabel('Keywords'),
    chkSearchTitlesOnly: this._container.getByText('Search titles only'),
    txtPostedBy: this._container.getByLabel('Posted by'),
    txtNewerThan: this._container.getByLabel('Newer than'),
    txtOlderThan: this._container.getByLabel('Older than'),
    btnSearch: this._container.getByRole('button', { name: 'Search' }),
  };

  constructor(private _page: Page) {}

  get locators() {
    return this._locators;
  }

  async search(params: SearchParameters): Promise<void> {
    if (params.keywords !== undefined) {
      await this.enterKeywords(params.keywords);
    }

    if (params.searchTitlesOnly !== undefined) {
      await this.setSearchTitlesOnly(params.searchTitlesOnly);
    }

    if (params.postedBy !== undefined) {
      await this.enterPostedBy(params.postedBy);
    }

    if (params.newerThan !== undefined) {
      await this.enterNewerThan(params.newerThan);
    }

    if (params.olderThan !== undefined) {
      await this.enterOlderThan(params.olderThan);
    }

    await this.clickSearch();
  }

  async enterKeywords(keywords: string): Promise<void> {
    await this._locators.txtKeywords.fill(keywords);
  }

  async setSearchTitlesOnly(checked: boolean): Promise<void> {
    await this._locators.chkSearchTitlesOnly.setChecked(checked);
  }

  async enterPostedBy(postedBy: string): Promise<void> {
    await this._locators.txtPostedBy.fill(postedBy);
  }

  async enterNewerThan(newerThan: string): Promise<void> {
    await this._locators.txtNewerThan.fill(newerThan);
  }

  async enterOlderThan(olderThan: string): Promise<void> {
    await this._locators.txtOlderThan.fill(olderThan);
  }

  async clickSearch(): Promise<void> {
    await this._locators.btnSearch.click();
  }
}

export interface SearchParameters {
  keywords?: string;
  searchTitlesOnly?: boolean;
  postedBy?: string;
  newerThan?: string;
  olderThan?: string;
}
