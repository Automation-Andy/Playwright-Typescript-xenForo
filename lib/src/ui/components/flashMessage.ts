import { Locator, Page } from '@playwright/test';

export class FlashMessage {
  private readonly _locators = {
    message: this._page.locator(`.flashMessage`),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  getMessage(): Locator {
    return this._locators.message;
  }
}
