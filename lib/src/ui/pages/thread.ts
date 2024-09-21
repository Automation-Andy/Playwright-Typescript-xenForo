import { Locator, Page } from '@playwright/test';

export class Thread {
  readonly locators = {
    heading: this.page.locator(`.p-title`).getByRole('heading'),
    posts: this.page.locator('.message--post'),
  };
  constructor(private readonly page: Page) {}

  getPosts(): Locator {
    return this.locators.posts;
  }

  getHeading(): Locator {
    return this.locators.heading;
  }
}
