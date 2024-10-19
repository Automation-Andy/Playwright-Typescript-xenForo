import { RequestBody } from '@api/base';
import { APIThreadData } from '@api/interfaces/threadData';
import { expect, test } from '@fixtures/threads';
import { UserData } from '@interfaces/userData';

test.use({ storageState: { cookies: [], origins: [] } });

let testUser: UserData = null;
let threadData: APIThreadData = null;

test.beforeEach(async ({ api, ui, scripts }) => {
  threadData = await test.step(`As admin, use api to create a locked thread in existing forum`, async () => {
    const options: RequestBody = {
      discussion_open: false,
    };
    return await api.threads.create(api.data.randomThreadData(2), options);
  });

  testUser = await test.step(`Create a new user for the test and log in`, async () => {
    const testUser = await api.users.createAutomationGroupUser();
    await scripts.user.loginAs(testUser.username, testUser.password);
    return testUser;
  });

  await test.step(`Search for thread ${threadData.title} and check we found it`, async () => {
    await scripts.searching.performSearch(threadData!.title, true, process.env.ADMIN_USER, 1);
  });

  await test.step(`Go into thread and check it is locked`, async () => {
    await ui.pages.searchResults.clickResultByTitle(threadData.title);
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
    await expect(ui.pages.threadView.locators.statusMessages).toHaveText('Not open for further replies.');
  });
});

test.afterEach(async ({ api }) => {
  if (threadData) await api.threads.delete(threadData.id, true);
  if (testUser) await api.users.delete(testUser.id);
});

test(`Can unlock a locked thread`, { tag: ['@e2e', '@thread'] }, async ({ page, ui }) => {
  await test.step(`As user ${testUser!.username}, unlock the thread ${threadData.title}`, async () => {
    await ui.pages.threadView.clickMoreOptions('Unlock thread');
    await expect(ui.components.flashMessage.getMessage()).toHaveText('Your changes have been saved.');
    await page.reload();
    await expect(ui.pages.threadView.locators.statusMessages).toBeHidden();
  });
});
