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
    threadId = await ui.pages.postDiscussionThread.create(threadData.title, threadData.message);
  });

  await test.step(`Check thread has been created`, async () => {
    expect(threadId, `Expected thread id to be > 0 but received ${threadId}`).toBeGreaterThan(0);
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
    const threadPost = await ui.pages.threadView.getPostByIndex(1);
    await expect(threadPost.getMessage()).toHaveText(threadData.message);
    await expect(threadPost.getPostedBy()).toHaveText(process.env.ADMIN_USER);
    await expect(threadPost.getUserTitle()).toHaveText('Administrator');
  });
});
