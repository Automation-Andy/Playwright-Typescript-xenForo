import { Page } from '@playwright/test';
import {
  AdvancedSearchEverything,
  SearchParameters as SearchEverythingParams,
} from '@ui/components/advancedSearchEverything';
import { AdvancedSearchThreads, SearchParameters as SearchThreadsParams } from '@ui/components/advancedSearchThreads';
import {
  AdvancedSearchProfilePosts,
  SearchParameters as SearchProfilePostParams,
} from '@ui/components/advancedSearchProfilePosts';

export class AdvancedSearch {
  private readonly locators = {
    lnkSearchEverything: this._page.getByRole('link', { name: 'Search everything' }),
    lnkSearchThreads: this._page.getByRole('link', { name: 'Search threads' }),
    lnkSearchProfilePosts: this._page.getByRole('link', { name: 'Search profile posts' }),
  };

  private readonly _searchEverything = new AdvancedSearchEverything(this._page);
  private readonly _searchProfilePosts = new AdvancedSearchProfilePosts(this._page);
  private readonly _searchThreads = new AdvancedSearchThreads(this._page);

  constructor(private _page: Page) {}

  async searchEverything(params: SearchEverythingParams): Promise<void> {
    await this.locators.lnkSearchEverything.click();
    await this._searchEverything.search(params);
  }

  async searchThreads(params: SearchThreadsParams): Promise<void> {
    await this.locators.lnkSearchThreads.click();
    await this._searchThreads.search(params);
  }

  async searchProfilePosts(params: SearchProfilePostParams): Promise<void> {
    await this.locators.lnkSearchProfilePosts.click();
    await this._searchProfilePosts.search(params);
  }
}
