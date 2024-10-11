import { expect, test } from '@fixtures/base';

test(`Can search for thread by title only`, async ({ ui }) => {
  const searchValue = 'posted by admin';
  await ui.components.navigationBar.clickSearch();
  await ui.components.search.performSearch(searchValue, true, '');
  await expect(ui.pages.searchResults.getHeading()).toHaveText(`Search results for query: ${searchValue}`);
  await expect(ui.pages.searchResults.getResultRows()).toHaveCount(2);
});

test(`Can advanced search for thread by title only`, async ({ ui }) => {
  const searchValue = 'posted by admin';
  await ui.components.navigationBar.clickSearch();
  await ui.components.search.clickAdvancedSearch();
  await ui.components.advancedSearch.searchEverything({
    keywords: searchValue,
    searchTitlesOnly: true,
    postedBy: 'admin',
  });
  await expect(ui.pages.searchResults.getHeading()).toHaveText(`Search results for query: ${searchValue}`);
  await expect(ui.pages.searchResults.getResultRows()).toHaveCount(2);
});
