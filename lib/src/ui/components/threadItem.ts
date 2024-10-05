import { Locator, Page } from '@playwright/test';

export class ThreadItem {
  readonly locators = {
    lnkTitle: this._container.locator('.structItem-title a'),
  };

  constructor(
    private readonly _page: Page,
    private readonly _container: Locator,
  ) {}

  getTitle(): Locator {
    return this.locators.lnkTitle;
  }
}
