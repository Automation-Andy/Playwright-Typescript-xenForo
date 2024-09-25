import { Page } from '@playwright/test';

export class InlineModerationTop {
  readonly _locators = {
    btnModeration: this.page.getByRole('button', { name: 'Moderation' }),
    btnMarkRead: this.page.getByRole('link', { name: 'Mark read' }),
    btnWatch: this.page.getByRole('link', { name: 'Watch', exact: true }),
  };
  constructor(private readonly page: Page) {}

  async clickModeration() {
    await this._locators.btnModeration.click();
  }

  async clickMarkRead() {
    await this._locators.btnMarkRead.click();
  }

  async clickWatch() {
    await this._locators.btnWatch.click();
  }
}
