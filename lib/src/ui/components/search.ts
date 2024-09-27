import { Page } from '@playwright/test';

export class Search {
  private readonly _container = this._page.locator(`[data-xf-init=quick-search]`);

  private readonly _locators = {
    txtSearch: this._container.getByPlaceholder('Search…'),
    chkSearchTitlesOnly: this._container.getByText('Search titles only'),
    txtByMember: this._container.getByPlaceholder('Member'),
    btnSearch: this._container.getByRole('button', { name: 'Search' }),
    btnAdvancedSearch: this._container.getByRole('link', { name: 'Advanced search…' }),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async performSearch(searchText: string, titlesOnly?: boolean, byMember?: string): Promise<void> {
    await this._locators.txtSearch.fill(searchText);
    if (titlesOnly !== undefined) await this.setSearchTitlesOnly(titlesOnly);
    if (byMember !== undefined) await this.setByMember(byMember);

    await this._locators.btnSearch.click();
  }

  async setKeyword(keyword: string): Promise<void> {
    await this._locators.txtSearch.fill(keyword);
  }

  async setSearchTitlesOnly(checked: boolean): Promise<void> {
    await this._locators.chkSearchTitlesOnly.setChecked(checked);
  }

  async setByMember(member: string): Promise<void> {
    await this._locators.txtByMember.fill(member);
  }

  async clickAdvancedSearch(): Promise<void> {
    await this._locators.btnAdvancedSearch.click();
  }
}
