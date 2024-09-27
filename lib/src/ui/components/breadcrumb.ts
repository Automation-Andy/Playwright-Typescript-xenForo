import { Page } from '@playwright/test';

export class Breadcrumb {
  private readonly _locators = {
    breadcrumb: this._page.locator('.p-breadcrumbs'),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async clickBreadcrumbItem(item: string) {
    await this._locators.breadcrumb.getByRole('link', { name: item }).first().click();
  }
}
