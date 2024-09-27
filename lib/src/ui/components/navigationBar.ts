import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  private readonly _locators = {
    navBar: this._page.locator('.p-nav-list'),
    navBarRight: this._page.locator(`.p-nav-opposite`),
    lnkLogIn: this._page.getByRole('link', { name: 'Log in' }),
    lnkRegister: this._page.getByRole('link', { name: 'Register' }),
    lblLoggedInUser: this._page.locator('.p-navgroup--member .p-navgroup-linkText').first(),
    lnkSearch: this._page.locator(`.p-discovery`).getByRole('link', { name: 'Search' }),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async clickNavigationLink(mainLink: MainNavigationLinks) {
    await this._locators.navBar.getByRole('link', { name: mainLink }).click();
  }

  async clickLogIn() {
    await this._locators.lnkLogIn.click();
  }

  async clickRegister() {
    await this._locators.lnkRegister.click();
  }

  async clickSearch() {
    await this._locators.lnkSearch.click();
  }

  async clickMemberName(memberName: string) {
    await this._locators.navBarRight.getByRole('link', { name: memberName }).click();
  }

  get selectedNavigationLink(): Locator {
    return this._locators.navBar.locator('.is-selected');
  }
}

type MainNavigationLinks = 'Home' | 'Forums' | `What's new` | 'Members';
