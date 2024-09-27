import { Page } from '@playwright/test';

export class AdvancedSearchThreads {
  private readonly _container = this._page.locator(`.p-body-content`);
  private readonly _locators = {
    txtKeywords: this._container.getByLabel('Keywords'),
    chkSearchTitlesOnly: this._container.locator(`[name="c[title_only]"]`),
    txtPostedBy: this._container.getByLabel('Posted by'),
    txtNewerThan: this._container.getByLabel('Newer than'),
    btnNewerThan: this._container.locator('dl').filter({ hasText: 'Newer than' }).locator('span'),
    txtOlderThan: this._container.getByLabel('Older than'),
    btnOlderThan: this._container.locator('dl').filter({ hasText: 'Older than' }).locator('span'),
    txtMinNumberReplies: this._container.getByLabel('Minimum number of replies'),
    btnAddMinNumberReplies: this._container.getByLabel('Increase'),
    btnMinusMinNumberReplies: this._container.getByLabel('Decrease'),
    cmbSearchInForums: this._container.locator(`[name='c[nodes][]']`),
    chkSearchSubForums: this._container.locator(`[name='c[child_nodes]'`),
    optOrderByDate: this._container.locator('label').filter({ hasText: 'Date' }).locator('i'),
    optOrderByMostReplies: this._container.locator('label').filter({ hasText: 'Most replies' }).locator('i'),
    chkDisplayResultsAsThreads: this._container.locator(`[name='grouped']`),
    btnSearch: this._container.getByRole('button', { name: 'Search' }),
  };

  constructor(private readonly _page: Page) {}

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
    await this._locators.txtKeywords.fill(keywords);
  }

  async setSearchTitlesOnly(checked: boolean): Promise<void> {
    await this._locators.chkSearchTitlesOnly.setChecked(checked);
  }

  async setPostedBy(postedBy: string): Promise<void> {
    await this._locators.txtPostedBy.fill(postedBy);
  }

  async setNewerThan(date: string): Promise<void> {
    await this._locators.txtNewerThan.fill(date);
  }

  async setOlderThan(date: string): Promise<void> {
    await this._locators.txtOlderThan.fill(date);
  }

  async setMinNumberReplies(replies: number): Promise<void> {
    await this._locators.txtMinNumberReplies.fill(replies.toString());
  }

  async clickAddMinimumNumberReplies(): Promise<void> {
    await this._locators.btnAddMinNumberReplies.click();
  }

  async clickMinusMinNumberReplies(): Promise<void> {
    await this._locators.btnMinusMinNumberReplies.click();
  }

  async selectSearchInForums(forum: string): Promise<void> {
    await this._locators.cmbSearchInForums.selectOption({ label: forum });
  }

  async setSearchSubForums(checked: boolean): Promise<void> {
    await this._locators.chkSearchSubForums.setChecked(checked);
  }

  async setOrderByDate(): Promise<void> {
    await this._locators.optOrderByDate.click();
  }

  async setOrderByMostReplies(): Promise<void> {
    await this._locators.optOrderByMostReplies.click();
  }

  async setDisplayResultsAsThreads(checked: boolean): Promise<void> {
    await this._locators.chkDisplayResultsAsThreads.setChecked(checked);
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
  minNumberReplies?: number;
  searchInForum?: string;
  searchSubForums?: boolean;
  orderByDate?: boolean;
  displayResultsAsThreads?: boolean;
}
