import { Page } from '@playwright/test';

export class Home {
  constructor(private readonly page: Page) {}

  async navigateTo(): Promise<void> {
    await this.page.goto('./');
  }
}
