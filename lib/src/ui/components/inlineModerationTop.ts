import { Page } from '@playwright/test';

export class InlineModerationTop {
  private readonly _locators = {
    btnModeration: this._page.getByRole('button', { name: 'Moderation' }),
    btnMarkRead: this._page.getByRole('link', { name: 'Mark read' }),
    btnWatch: this._page.getByRole('link', { name: 'Watch', exact: true }),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

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
