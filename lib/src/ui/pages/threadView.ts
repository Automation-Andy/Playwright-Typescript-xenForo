import { Locator, Page } from '@playwright/test';
import { Poll } from '@ui/components/poll';

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

  getHeading(): Locator {
    return this.locators.heading;
  }

  getThreadId(): number | null {
    const url = this._page.url();
    const match = url.match(/(\d+)\/?$/);

    if (match) {
      return parseInt(match[1], 10);
    } else {
      throw new Error(`Thread ID not found in URL ${url}`);
    }
  }

  get poll(): Poll {
    return this._poll;
  }
}
