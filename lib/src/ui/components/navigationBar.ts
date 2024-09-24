import { Locator, Page } from '@playwright/test';

export class NavigationBar {
  readonly locators = {
    navBar: this.page.locator('.p-nav-list'),
    navBarRight: this.page.locator(`.p-nav-opposite`),
    lnkLogIn: this.page.getByRole('link', { name: 'Log in' }),
    lnkRegister: this.page.getByRole('link', { name: 'Register' }),
    lblLoggedInUser: this.page.locator('.p-navgroup--member .p-navgroup-linkText').first(),
    lnkSearch: this.page.locator(`.p-discovery`).getByRole('link', { name: 'Search' }),
  };

  constructor(private readonly page: Page) {}

  async clickNavigationLink(mainLink: MainNavigationLinks) {
    await this.locators.navBar.getByRole('link', { name: mainLink }).click();
  }

  async clickLogIn() {
    await this.locators.lnkLogIn.click();
  }

  async clickRegister() {
    await this.locators.lnkRegister.click();
  }

  async clickSearch() {
    await this.locators.lnkSearch.click();
  }

  async clickMemberName(memberName: string) {
    await this.locators.navBarRight.getByRole('link', { name: memberName }).click();
  }

  get selectedNavigationLink(): Locator {
    return this.locators.navBar.locator('.is-selected');
  }
}

type MainNavigationLinks = 'Home' | 'Forums' | `What's new` | 'Members';
