import { expect, test } from '@fixtures/threads';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });

const threadsToDelete: number[] = [];

test.beforeEach(async ({ ui }) => {
  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.clickForum('Main category', 'Main forum');
  });

  await test.step(`Create the sticky thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    const stickyThreadId = await ui.pages.postThread.discussion.create(
      'Sticky thread',
      'This is a sticky thread',
      true,
    );
    threadsToDelete.push(stickyThreadId);
  });

  await test.step(`Go back to Main forum`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem('Main forum');
  });

  await test.step(`Create the non-stick thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    const nonStickyThreadId = await ui.pages.postThread.discussion.create(
      'Unsticky bop',
      'All night and day (nod to the band Poison)',
      false,
    );
    threadsToDelete.push(nonStickyThreadId);
  });

  await test.step(`Go back to Main forum again to display created threads`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem('Main forum');
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the threads created`, async () => {
    for (const threadId of threadsToDelete) {
      await api.threads.delete(threadId, true);
    }
  });
});

test(`Check sticky thread is first and other is second`, async ({ ui }) => {
  await expect((await ui.pages.forumView.getThreadByIndex(1)).getTitle()).toHaveText('Sticky thread');
  await expect((await ui.pages.forumView.getThreadByIndex(2)).getTitle()).toHaveText('Unsticky bop');
});
