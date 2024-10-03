import { Page } from '@playwright/test';

export class AdvancedSearchProfilePosts {
  private readonly _container = this._page.locator(`.p-body-content`);
  private readonly _locators = {
    txtKeywords: this._container.getByLabel('Keywords'),
    txtPostedBy: this._container.getByLabel('Posted by'),
    txtPostedOnProfileOfMember: this._container.getByLabel('Posted on the profile of'),
    txtNewerThan: this._container.getByLabel('Newer than'),
    btnNewerThan: this._container.locator('dl').filter({ hasText: 'Newer than' }).locator('span'),
    txtOlderThan: this._container.getByLabel('Older than'),
    btnOlderThan: this._container.locator('dl').filter({ hasText: 'Older than' }).locator('span'),
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

    if (params.postedBy !== undefined) {
      await this.enterPostedBy(params.postedBy);
    }

    if (params.postedOnProfileOf !== undefined) {
      await this.enterPostedOnProfileOf(params.postedOnProfileOf);
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

  async enterPostedBy(postedBy: string): Promise<void> {
    await this._locators.txtPostedBy.fill(postedBy);
  }

  async enterPostedOnProfileOf(postedOnProfileOf: string): Promise<void> {
    await this._locators.txtPostedOnProfileOfMember.fill(postedOnProfileOf);
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
  postedBy?: string;
  postedOnProfileOf?: string;
  newerThan?: string;
  olderThan?: string;
}
