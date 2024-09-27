import { Page } from '@playwright/test';

export class StaffBar {
  private readonly _locators = {
    links: {
      admin: this._page.getByRole('link', { name: 'Admin' }),
    },
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }
}
