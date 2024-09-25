import { Page } from '@playwright/test';

export class Breadcrumb {
  readonly locators = {
    breadcrumb: this.page.locator('.p-breadcrumbs'),
  };

  constructor(private readonly page: Page) {}

  async clickBreadcrumbItem(item: string) {
    await this.locators.breadcrumb.getByRole('link', { name: item }).first().click();
  }
}
