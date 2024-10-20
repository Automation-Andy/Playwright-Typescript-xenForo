import { StringHelpers } from '@helpers/string';
import { Locator, Page } from '@playwright/test';
import { Poll } from '@ui/components/poll';
import { PostBit } from '@ui/components/postBit';

export class ThreadView {
  readonly locators = {
    heading: this._page.locator(`.p-title`).getByRole('heading'),
    posts: this._page.locator('.message--post'),
    moreOptions: this._page.getByRole('button', { name: '•••' }),
    statusMessages: this._page.locator('.blockStatus-message').first(),
  };

  private readonly _poll = new Poll(this._page);

  constructor(private readonly _page: Page) {}

  getPosts(): Locator {
    return this.locators.posts;
  }

  async getPostByIndex(oneBasedIndex: number): Promise<PostBit> {
    return new PostBit(this._page, this.locators.posts.nth(oneBasedIndex - 1));
  }

  getHeading(): Locator {
    return this.locators.heading;
  }

  getId(): number {
    return StringHelpers.getIdFromUrl(this._page.url());
  }

  get poll(): Poll {
    return this._poll;
  }

  async clickMoreOptions(menuItem: string) {
    await this.locators.moreOptions.click();
    await this._page.locator(`.menu.is-active`).getByRole('link', { name: menuItem, exact: true }).click();
  }
}
