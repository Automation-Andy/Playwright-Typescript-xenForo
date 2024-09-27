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
      await this.setKeywords(params.keywords);
    }

    if (params.postedBy !== undefined) {
      await this.setPostedBy(params.postedBy);
    }

    if (params.postedOnProfileOf !== undefined) {
      await this.setPostedOnProfileOf(params.postedOnProfileOf);
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
    await this._locators.txtKeywords.fill(keywords);
  }

  async setPostedBy(postedBy: string): Promise<void> {
    await this._locators.txtPostedBy.fill(postedBy);
  }

  async setPostedOnProfileOf(postedOnProfileOf: string): Promise<void> {
    await this._locators.txtPostedOnProfileOfMember.fill(postedOnProfileOf);
  }

  async setNewerThan(newerThan: string): Promise<void> {
    await this._locators.txtNewerThan.fill(newerThan);
  }

  async setOlderThan(olderThan: string): Promise<void> {
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
