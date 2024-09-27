import { Page } from '@playwright/test';

export class LogIn {
  private readonly _dialog = this._page.locator(`.overlay-container`);
  private readonly _locators = {
    fields: {
      username: this._dialog.getByLabel('Your name or email address'),
      password: this._dialog.getByLabel('Password'),
    },
    checkboxes: {
      stayLoggedIn: this._dialog.locator('label').filter({ hasText: 'Stay logged in' }).locator('i'),
    },
    buttons: {
      logIn: this._dialog.getByRole('button', { name: 'Log in' }),
      register: this._dialog.getByRole('link', { name: 'Register now' }),
      closeX: this._dialog.getByRole('button', { name: 'Close' }),
    },
    links: {
      forgotPassword: this._dialog.getByRole('link', { name: 'Forgot your password?' }),
    },
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async loginAs(username: string, password: string, stayLoggedIn = false): Promise<void> {
    await this.setUserNameOrEmail(username);
    await this.setPassword(password);
    await this.checkStayLoggedIn(stayLoggedIn);
    await this.clickLogIn();
  }

  async setUserNameOrEmail(username: string): Promise<void> {
    await this._locators.fields.username.fill(username);
  }

  async setPassword(password: string): Promise<void> {
    await this._locators.fields.password.fill(password);
  }

  async clickLogIn(): Promise<void> {
    await this._locators.buttons.logIn.click();
  }

  async clickRegister(): Promise<void> {
    await this._locators.buttons.register.click();
  }

  async checkStayLoggedIn(checked: boolean): Promise<void> {
    await this._locators.checkboxes.stayLoggedIn.setChecked(checked);
  }
}
