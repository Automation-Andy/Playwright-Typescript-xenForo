import { Page } from '@playwright/test';

export class AdvancedSearchThreads {
  readonly container = this.page.locator(`.p-body-content`);
  readonly locators = {
    txtKeywords: this.container.getByLabel('Keywords'),
    chkSearchTitlesOnly: this.container.locator(`[name="c[title_only]"]`),
    txtPostedBy: this.container.getByLabel('Posted by'),
    txtNewerThan: this.container.getByLabel('Newer than'),
    btnNewerThan: this.container.locator('dl').filter({ hasText: 'Newer than' }).locator('span'),
    txtOlderThan: this.container.getByLabel('Older than'),
    btnOlderThan: this.container.locator('dl').filter({ hasText: 'Older than' }).locator('span'),
    txtMinNumberReplies: this.container.getByLabel('Minimum number of replies'),
    btnAddMinNumberReplies: this.container.getByLabel('Increase'),
    btnMinusMinNumberReplies: this.container.getByLabel('Decrease'),
    cmbSearchInForums: this.container.locator(`[name='c[nodes][]']`),
    chkSearchSubForums: this.container.locator(`[name='c[child_nodes]'`),
    optOrderByDate: this.container.locator('label').filter({ hasText: 'Date' }).locator('i'),
    optOrderByMostReplies: this.container.locator('label').filter({ hasText: 'Most replies' }).locator('i'),
    chkDisplayResultsAsThreads: this.container.locator(`[name='grouped']`),
    btnSearch: this.container.getByRole('button', { name: 'Search' }),
  };

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

    if (params.minNumberReplies !== undefined) {
      await this.setMinNumberReplies(params.minNumberReplies);
    }

    if (params.searchInForum !== undefined) {
      await this.selectSearchInForums(params.searchInForum);
    }

    if (params.searchSubForums !== undefined) {
      await this.setSearchSubForums(params.searchSubForums);
    }

    if (params.orderByDate !== undefined) {
      if (params.orderByDate) {
        await this.setOrderByDate();
      } else {
        await this.setOrderByMostReplies();
      }
    }
    if (params.displayResultsAsThreads !== undefined) {
      await this.setDisplayResultsAsThreads(params.displayResultsAsThreads);
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

  async setNewerThan(date: string): Promise<void> {
    await this.locators.txtNewerThan.fill(date);
  }

  async setOlderThan(date: string): Promise<void> {
    await this.locators.txtOlderThan.fill(date);
  }

  async setMinNumberReplies(replies: number): Promise<void> {
    await this.locators.txtMinNumberReplies.fill(replies.toString());
  }

  async clickAddMinimumNumberReplies(): Promise<void> {
    await this.locators.btnAddMinNumberReplies.click();
  }

  async clickMinusMinNumberReplies(): Promise<void> {
    await this.locators.btnMinusMinNumberReplies.click();
  }

  async selectSearchInForums(forum: string): Promise<void> {
    await this.locators.cmbSearchInForums.selectOption({ label: forum });
  }

  async setSearchSubForums(checked: boolean): Promise<void> {
    await this.locators.chkSearchSubForums.setChecked(checked);
  }

  async setOrderByDate(): Promise<void> {
    await this.locators.optOrderByDate.click();
  }

  async setOrderByMostReplies(): Promise<void> {
    await this.locators.optOrderByMostReplies.click();
  }

  async setDisplayResultsAsThreads(checked: boolean): Promise<void> {
    await this.locators.chkDisplayResultsAsThreads.setChecked(checked);
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
  minNumberReplies?: number;
  searchInForum?: string;
  searchSubForums?: boolean;
  orderByDate?: boolean;
  displayResultsAsThreads?: boolean;
}
