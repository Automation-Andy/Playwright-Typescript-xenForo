import { Page } from '@playwright/test';

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

  async gotoForum(categoryName: string, forumName: string) {
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
