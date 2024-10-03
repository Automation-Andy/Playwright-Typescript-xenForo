import { Page } from '@playwright/test';

export class LogIn {
  private readonly _dialog = this.page.locator(`.overlay-container`);

  private readonly _locators = {
    txtUsername: this._dialog.locator('[name=login]'),
    txtPassword: this._dialog.locator('[name=password]'),
    chkStayLoggedIn: this._dialog.locator('label').filter({ hasText: 'Stay logged in' }).locator('i'),
    btnLogIn: this._dialog.getByRole('button', { name: 'Log in' }),
    btnRegister: this._dialog.getByRole('link', { name: 'Register now' }),
    btnCloseX: this._dialog.getByRole('button', { name: 'Close' }),
    lnkForgotPassword: this._dialog.getByRole('link', { name: 'Forgot your password?' }),
  };

  constructor(private readonly page: Page) {}

  get locators() {
    return this._locators;
  }

  async loginAs(username: string, password: string, stayLoggedIn = false): Promise<void> {
    await this.enterUserNameOrEmail(username);
    await this.enterPassword(password);
    await this.checkStayLoggedIn(stayLoggedIn);
    await this.clickLogIn();
  }

  async enterUserNameOrEmail(username: string): Promise<void> {
    await this._locators.txtUsername.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this._locators.txtPassword.fill(password);
  }

  async clickLogIn(): Promise<void> {
    await this._locators.btnLogIn.click();
  }

  async clickRegister(): Promise<void> {
    await this._locators.btnRegister.click();
  }

  async checkStayLoggedIn(checked: boolean): Promise<void> {
    await this._locators.chkStayLoggedIn.setChecked(checked);
  }
}
