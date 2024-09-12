import { Page } from '@playwright/test';

export class NavigationBar {
  readonly locators = {
    navBar: this.page.locator(`.p-nav-list`),
    lnkLogIn: this.page.getByRole('link', { name: 'Log in' }),
    lnkRegister: this.page.getByRole('link', { name: 'Register' }),
    lblLoggedInUser: this.page.locator('.p-navgroup--member .p-navgroup-linkText').first(),
    lnkSearch: this.page.locator(`.p-discovery`).getByRole('link', { name: 'Search' }),
  };

  constructor(private readonly page: Page) {}

  async clickNavigation(linkName: string): Promise<void> {
    await this.locators.navBar.getByRole('link', { name: linkName }).click();
  }

  async clickLogIn(): Promise<void> {
    await this.locators.lnkLogIn.click();
  }

  async clickRegister(): Promise<void> {
    await this.locators.lnkRegister.click();
  }

  async clickSearch(): Promise<void> {
    await this.locators.lnkSearch.click();
  }
}
