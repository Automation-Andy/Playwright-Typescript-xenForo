import { Locator, Page } from '@playwright/test';
import { Poll } from '@ui/components/poll';

export class ThreadView {
  readonly locators = {
    heading: this.page.locator(`.p-title`).getByRole('heading'),
    posts: this.page.locator('.message--post'),
  };

  private readonly _poll = new Poll(this.page);

  constructor(private readonly page: Page) {}

  getPosts(): Locator {
    return this.locators.posts;
  }

  getHeading(): Locator {
    return this.locators.heading;
  }

  get poll(): Poll {
    return this._poll;
  }
}
