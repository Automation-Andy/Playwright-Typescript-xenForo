import { Page } from '@playwright/test';

export class PostThreadIn {
  constructor(private readonly _page: Page) {}

  async clickThreadDestination(categoryName: string, forumName: string): Promise<void> {
    await this._page
      .locator(`.overlay .block-container`)
      .filter({ hasText: categoryName })
      .getByRole('link', { name: forumName })
      .click();
  }
}
