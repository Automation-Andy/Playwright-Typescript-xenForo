import { expect, test } from '@fixtures/threads';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });

let threadId = 0;

test.beforeEach(async ({ ui }) => {
  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.clickForum('Main category', 'Main forum');
    await expect(ui.pages.forumView.getHeading()).toHaveText('Main forum');
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the thread with id ${threadId}`, async () => {
    await api.threads.delete(threadId, true);
  });
});

test(`Can create a thread`, async ({ ui, threadData }) => {
  await test.step(`Create a thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    await ui.pages.postDiscussionThread.create(threadData.title, threadData.content);
  });

  await test.step(`Check thread has been created and the url is as expected`, async () => {
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
    threadId = ui.pages.threadView.getId();
    expect(threadId, `Expected thread id to be > 0 but received ${threadId}`).toBeGreaterThan(0);
  });
});
