import { Locator, Page } from '@playwright/test';

export class InlineModerationDeleteThreads {
  private readonly _container = this.page.locator('.overlay');
  readonly _locators = {
    title: this._container.locator(`.overlay-title`),
    optRemoveFromPublicView: this._container
      .locator('label')
      .filter({ hasText: 'Remove from public view' })
      .locator('i'),
    txtReason: this._container.getByPlaceholder('Reason...'),
    optPermanentlyDelete: this._container.locator('label').filter({ hasText: 'Permanently delete' }).locator('i'),
    chkNotifyThreadStarter: this._container
      .locator('label')
      .filter({ hasText: 'Notify thread starter of this' })
      .locator('i'),
    txtNotifyReason: this._container.getByPlaceholder('Optional'),
    btnDelete: this._container.getByRole('button', { name: 'Delete' }),
  };

  constructor(private readonly page: Page) {}

  async removeFromPublicView(reason = '', notifyThreadStarter = false, notifyReason = '') {
    await this.clickRemoveFromPublicView();
    await this.setReason(reason);
    await this.setNotifyThreadStarter(notifyThreadStarter);
    await this.setNotifyReason(notifyReason);
  }

  getTitle(): Locator {
    return this._locators.title;
  }

  async clickRemoveFromPublicView() {
    await this._locators.optRemoveFromPublicView.click();
  }

  async setReason(reason: string) {
    await this._locators.txtReason.fill(reason);
  }

  async clickPermanentlyDelete() {
    await this._locators.optPermanentlyDelete.click();
  }

  async setNotifyThreadStarter(checked: boolean) {
    await this._locators.chkNotifyThreadStarter.setChecked(checked);
  }

  async setNotifyReason(reason: string) {
    await this._locators.txtNotifyReason.fill(reason);
  }

  async clickDelete() {
    await this._locators.btnDelete.click();
  }
}
