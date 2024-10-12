import { expect } from '@playwright/test';
import { UI } from '@ui/ui';

export class UserScripts {
  constructor(private readonly _ui: UI) {}

  async loginAs(userName: string, password: string) {
    await this._ui.components.navigationBar.clickLogIn();
    await this._ui.pages.login.loginAs(userName, password);
    await expect(this._ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(userName);
  }
}
