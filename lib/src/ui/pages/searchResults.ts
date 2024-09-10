import { Locator, Page } from "@playwright/test";

export class SearchResults {
  readonly locators = {
    resultRows: this.page.locator(`.contentRow`),
  }

  constructor(private readonly page: Page) {}

  getTitle(): Locator {
    return this.page.getByRole('heading');
  }

  getResultRows(): Locator {
    return this.locators.resultRows;
  }
}