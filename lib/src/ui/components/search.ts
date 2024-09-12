import { Page } from '@playwright/test';

export class Search {
  readonly container = this.page.locator(`[data-xf-init=quick-search]`);

  readonly locators = {
    txtSearch: this.container.getByPlaceholder('Search…'),
    chkSearchTitlesOnly: this.container.getByText('Search titles only'),
    txtByMember: this.container.getByPlaceholder('Member'),
    btnSearch: this.container.getByRole('button', { name: 'Search' }),
    btnAdvancedSearch: this.container.getByRole('link', { name: 'Advanced search…' }),
  };
  constructor(private page: Page) {}

  async performSearch(searchText: string, titlesOnly?: boolean, byMember?: string): Promise<void> {
    await this.locators.txtSearch.fill(searchText);
    if (titlesOnly !== undefined) await this.setSearchTitlesOnly(titlesOnly);
    if (byMember !== undefined) await this.setByMember(byMember);

    await this.locators.btnSearch.click();
  }

  async setKeyword(keyword: string): Promise<void> {
    await this.locators.txtSearch.fill(keyword);
  }

  async setSearchTitlesOnly(checked: boolean): Promise<void> {
    await this.locators.chkSearchTitlesOnly.setChecked(checked);
  }

  async setByMember(member: string): Promise<void> {
    await this.locators.txtByMember.fill(member);
  }

  async clickAdvancedSearch(): Promise<void> {
    await this.locators.btnAdvancedSearch.click();
  }
}
