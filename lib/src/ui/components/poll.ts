import { Locator, Page } from '@playwright/test';

export class Poll {
  private readonly container = this.page.locator('.js-pollContainer-1');
  readonly locators = {
    pollHeading: this.container.getByRole('heading'),
    btnCastVote: this.page.getByRole('button', { name: 'Cast vote' }),
    btnEdit: this.page.getByRole('link', { name: 'Edit' }),
    btnChangeVote: this.page.getByRole('link', { name: 'Change vote' }),
    btnViewResults: this.page.getByRole('link', { name: 'View results' }),
  };
  constructor(private readonly page: Page) {}

  get heading(): Locator {
    return this.locators.pollHeading;
  }

  async clickPollOption(option: string) {
    await this.container.locator('label').filter({ hasText: option }).locator('i').check();
  }

  async clickCastVote() {
    await this.locators.btnCastVote.click();
  }

  async clickEdit() {
    await this.locators.btnEdit.click();
  }

  async clickChangeVote() {
    await this.locators.btnChangeVote.click();
  }

  async clickViewResults() {
    await this.locators.btnViewResults.click();
  }
}
