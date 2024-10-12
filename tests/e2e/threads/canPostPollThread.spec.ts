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

test(`Can post poll thread`, async ({ ui, data }) => {
  await test.step(`Create a poll type thread`, async () => {});
  await ui.pages.forumView.clickPostThread();
  const threadPollData = data.getThreadPollData(false);
  threadId = await ui.pages.postThread.poll.create(
    threadPollData.title,
    threadPollData.message,
    threadPollData.question,
    ['short', 'long'],
    'single',
  );

  await test.step(`Check the thread and poll have been created`, async () => {
    expect(threadId, `Expected thread id to be > 0 but received ${threadId}`).toBeGreaterThan(0);
  });
  await expect(ui.pages.threadView.getHeading()).toHaveText(threadPollData.title);
  await expect(ui.pages.threadView.getPosts()).toHaveCount(1);
});
