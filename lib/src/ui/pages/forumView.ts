import { Locator, Page } from '@playwright/test';

export class ForumView {
  private readonly _locators = {
    heading: this._page.locator(`.p-title`).getByRole('heading'),
    threads: this._page.locator('.structItem--thread'),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  getThreads(): Locator {
    return this._locators.threads;
  }

  getHeading(): Locator {
    return this._locators.heading;
  }
}