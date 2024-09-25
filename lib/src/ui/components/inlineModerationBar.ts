import { Page } from '@playwright/test';

export class InlineModerationBar {
  private readonly _container = this.page.locator('.inline-moderator-bar');
  readonly _locators = {
    chkSelectAll: this._container.getByText('Select all', { exact: true }),
    cmbChooseActon: this._container.getByRole('combobox'),
    btnGo: this.page.getByRole('button', { name: 'Go' }),
  };
  constructor(private readonly page: Page) {}

  async moderate(selectAll: boolean, action: string) {
    await this.setSelectAll(selectAll);
    await this.selectAction(action);
    await this.clickGo();
  }

  async setSelectAll(checked: boolean) {
    await this._locators.chkSelectAll.setChecked(checked);
  }

  async selectAction(action: string) {
    await this._locators.cmbChooseActon.selectOption({ label: action });
  }

  async clickGo() {
    await this._locators.btnGo.click();
  }
}
