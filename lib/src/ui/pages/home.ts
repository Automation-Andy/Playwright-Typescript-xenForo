import { expect, Page } from '@playwright/test';

export class Home {
  private readonly _locators = {
    categoryContainers: this._page.locator(`.p-body-pageContent .block-container`),
    btnNewPosts: this._page.getByRole('link', { name: 'New posts' }),
    btnPostThread: this._page.getByRole('link', { name: 'Post thread…' }),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async goto(): Promise<void> {
    await this._page.goto('./');
  }

  async waitUntilForumIsPresent(categoryName: string, forumName: string): Promise<void> {
    await expect(async () => {
      await this._page.reload();
      await expect(
        this._locators.categoryContainers
          .filter({ has: this._page.getByRole('heading', { name: categoryName }) })
          .getByRole('link', { name: forumName }),
      ).toBeVisible();
    }).toPass({
      timeout: 10_000,
    });
  }

  async clickForum(categoryName: string, forumName: string) {
    await this._locators.categoryContainers
      .filter({ has: this._page.getByRole('heading', { name: categoryName }) })
      .getByRole('link', { name: forumName })
      .click();
  }

  async clickNewPosts(): Promise<void> {
    await this._locators.btnNewPosts.click();
  }

  async clickPostThread(): Promise<void> {
    await this._locators.btnPostThread.click();
  }
}
