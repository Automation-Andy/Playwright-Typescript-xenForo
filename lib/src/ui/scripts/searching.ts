import { expect } from '@playwright/test';
import { UI } from '@ui/ui';

export class Searching {
  constructor(private readonly _ui: UI) {}

  async performSearch(searchValue: string, titlesOnly: boolean, byMember: string, expectedResultsCount: number) {
    await this._ui.components.navigationBar.clickSearch();
    await this._ui.components.search.performSearch(searchValue, titlesOnly, byMember);
    await expect(this._ui.pages.searchResults.getHeading()).toHaveText(`Search results for query: ${searchValue}`);
    await expect(this._ui.pages.searchResults.getResultRows()).toHaveCount(expectedResultsCount);
  }
}
