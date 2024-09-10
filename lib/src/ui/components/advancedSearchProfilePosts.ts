import { Page } from "@playwright/test";

export class AdvancedSearchProfilePosts {
  readonly locators = {
    txtKeywords: this.page.getByLabel('Keywords'),
    txtPostedBy: this.page.getByLabel('Posted by'),
    txtPostedOnProfileOfMember: this.page.getByLabel('Posted on the profile of'),
    txtNewerThan: this.page.getByLabel('Newer than'),
    btnNewerThan: this.page.locator('dl').filter({ hasText: 'Newer than' }).locator('span'),
    txtOlderThan: this.page.getByLabel('Older than'),
    btnOlderThan: this.page.locator('dl').filter({ hasText: 'Older than' }).locator('span'),
    btnSearch: this.page.getByRole('button', { name: 'Search' }),
  }
  
  constructor(private page: Page) {}

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
    await this.locators.txtKeywords.fill(keywords);
  }

  async setPostedBy(postedBy: string): Promise<void> {
    await this.locators.txtPostedBy.fill(postedBy);
  }

  async setPostedOnProfileOf(postedOnProfileOf: string): Promise<void> {
    await this.locators.txtPostedOnProfileOfMember.fill(postedOnProfileOf);
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
  postedBy?: string;
  postedOnProfileOf?: string;
  newerThan?: string;
  olderThan?: string;
}