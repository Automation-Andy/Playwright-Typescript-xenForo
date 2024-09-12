import { Locator, Page } from '@playwright/test';

export class SearchResults {
  readonly locators = {
    heading: this.page.locator(`.p-title`).getByRole('heading'),
    resultRows: this.page.locator(`.contentRow`),
  };

  constructor(private readonly page: Page) {}

  getHeading(): Locator {
    return this.locators.heading;
  }

  getResultRows(): Locator {
    return this.locators.resultRows;
  }
}
