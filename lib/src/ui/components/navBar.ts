import { Page } from '@playwright/test';

export class NavBar {
  readonly locators = {
    navBar: this.page.locator(`.p-nav-list`),
    lnkLogIn: this.page.getByRole('link', { name: 'Log in' }),
    lnkRegister: this.page.getByRole('link', { name: 'Register' }),
    lblLoggedInUser: this.page
      .locator('.p-navgroup--member .p-navgroup-linkText')
      .first(),
  };

  constructor(private readonly page: Page) {}

  async clickNavigation(linkName: string): Promise<void> {
    await this.locators.navBar.getByRole('link', { name: linkName }).click();
  }

  async clickLogIn(): Promise<void> {
    await this.locators.lnkLogIn.click();
  }

  async register(): Promise<void> {
    await this.locators.lnkRegister.click();
  }
}
