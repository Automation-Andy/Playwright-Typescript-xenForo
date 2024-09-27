import { Locator, Page } from '@playwright/test';

export class Poll {
  private readonly _container = this._page.locator('.js-pollContainer-1');
  private readonly _locators = {
    pollHeading: this._container.getByRole('heading'),
    btnCastVote: this._page.getByRole('button', { name: 'Cast vote' }),
    btnEdit: this._page.getByRole('link', { name: 'Edit' }),
    btnChangeVote: this._page.getByRole('link', { name: 'Change vote' }),
    btnViewResults: this._page.getByRole('link', { name: 'View results' }),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  get heading(): Locator {
    return this._locators.pollHeading;
  }

  async clickPollOption(option: string) {
    await this._container.locator('label').filter({ hasText: option }).locator('i').check();
  }

  async clickCastVote() {
    await this._locators.btnCastVote.click();
  }

  async clickEdit() {
    await this._locators.btnEdit.click();
  }

  async clickChangeVote() {
    await this._locators.btnChangeVote.click();
  }

  async clickViewResults() {
    await this._locators.btnViewResults.click();
  }
}
