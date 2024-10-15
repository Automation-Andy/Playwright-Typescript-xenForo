import { expect, test } from '@fixtures/threads';
import { UserData } from '@interfaces/userData';
import { ThreadData } from '@ui/interfaces/threadData';

test.use({ storageState: { cookies: [], origins: [] } });

let testUser: UserData = null;
let threadData: ThreadData = null;

test.beforeEach(async ({ api, ui, scripts }) => {
  threadData = await test.step(`As admin, use api to create a thread in existing forum`, async () => {
    return await api.threads.create(api.data.randomThreadData(2, false, false));
  });

  testUser = await test.step(`Create a new user for the test and log in`, async () => {
    const testUser = await api.users.createAutomationGroupUser();
    await scripts.userScripts.loginAs(testUser.username, testUser.password);
    return testUser;
  });

  await test.step(`Search for thread ${threadData.title} and check we found it`, async () => {
    await ui.components.navigationBar.clickSearch();
    await ui.components.search.performSearch(threadData.title, true, 'admin');
    await expect(ui.pages.searchResults.getHeading()).toHaveText(`Search results for query: ${threadData.title}`);
    await expect(ui.pages.searchResults.getResultRows()).toHaveCount(1);
  });

  await test.step(`Click the search result to go into the thread`, async () => {
    await ui.pages.searchResults.clickResultByTitle(threadData.title);
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the thread, and user`, async () => {
    await api.threads.delete(threadData.id, true);
    await api.users.delete(testUser.id);
  });
});

test(`Can user with lock permissions lock a thread`, { tag: ['@e2e', '@thread'] }, async ({ page, ui }) => {
  await test.step(`As user ${testUser.username}, lock the thread ${threadData.title}`, async () => {
    await ui.pages.threadView.clickMoreOptions('Lock thread');
  });

  await test.step(`Check the thread was successfully locked`, async () => {
    await expect(page.getByText('Your changes have been saved.')).toBeVisible();
    await page.reload();
    await expect(page.getByText('Not open for further replies.').first()).toBeVisible();
  });
});
