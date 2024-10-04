import { StringHelpers } from '@helpers/string';
import { Locator, Page } from '@playwright/test';
import { Poll } from '@ui/components/poll';
import { PostBit } from '@ui/components/postBit';

export class ThreadView {
  readonly locators = {
    heading: this._page.locator(`.p-title`).getByRole('heading'),
    posts: this._page.locator('.message--post'),
  };

  private readonly _poll = new Poll(this._page);

  constructor(private readonly _page: Page) {}

  getPosts(): Locator {
    return this.locators.posts;
  }

  async getPostByIndex(oneBasedIndex: number): Promise<PostBit> {
    const zeroBasedIndex = oneBasedIndex - 1;
    const postCount = await this.locators.posts.count();

    if (zeroBasedIndex < 0 || zeroBasedIndex >= postCount) {
      throw new Error(`Index out of range: ${oneBasedIndex}. Valid range is 1 to ${postCount}.`);
    }

    return new PostBit(this._page, this.locators.posts.nth(zeroBasedIndex));
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
}
