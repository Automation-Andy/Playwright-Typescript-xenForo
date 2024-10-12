import { Locator, Page } from '@playwright/test';

export class SearchResults {
  private readonly _locators = {
    heading: this._page.locator(`.p-title`).getByRole('heading'),
    resultRows: this._page.locator(`.contentRow`),
  };

  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  getHeading(): Locator {
    return this._locators.heading;
  }

  getResultRows(): Locator {
    return this._locators.resultRows;
  }

  async clickResultByTitle(title: string): Promise<void> {
    await this._locators.resultRows.getByText(title).click();
  }
}
