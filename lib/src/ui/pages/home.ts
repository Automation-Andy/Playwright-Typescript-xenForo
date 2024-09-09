import { Page } from '@playwright/test';

export class Home {

  readonly locators = {
    btnNewPosts: this.page.getByRole('link', { name: 'New posts' }),
    btnPostThread: this.page.getByRole('link', { name: 'Post thread…' }),
  }

  constructor(private readonly page: Page) {}

  async navigateTo(): Promise<void> {
    await this.page.goto('./');
  }

  async clickNewPosts(): Promise<void> {
    await this.locators.btnNewPosts.click();
  }

  async clickPostThread(): Promise<void> {
    await this.locators.btnPostThread.click();
  }
}
