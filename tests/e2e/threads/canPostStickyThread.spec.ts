import { expect, test } from '@fixtures/threads';
import { NodeInfo, NodeType } from '@api/nodes';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';
import { ThreadData } from '@interfaces/threadData';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });

let nodeInfo: NodeInfo = null;
const threadsToDelete: number[] = [];
let stickyThreadData: ThreadData = null;
let nonStickyThreadData: ThreadData = null;

test.beforeEach(async ({ api, ui, dataGeneration }) => {
  nodeInfo = await test.step(`Create a new discussion forum inside 'Main category'`, async () => {
    return await api.nodes.create(1, NodeType.Forum, 'Yet another new discussion forum');
  });

  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.waitUntilForumIsPresent('Main category', 'Yet another new discussion forum');
  });

  stickyThreadData = await test.step(`Create the sticky thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    const threadData = dataGeneration.getThreadData();
    const stickyThreadId = await ui.pages.postThread.discussion.create(threadData.title, threadData.message, true);
    threadsToDelete.push(stickyThreadId);
    return threadData;
  });

  nonStickyThreadData =
    await test.step(`Go back to forum ${nodeInfo.title} and create the non-sticky thread`, async () => {
      await ui.components.breadcrumb.clickBreadcrumbItem(nodeInfo.title);
      await ui.pages.forumView.clickPostThread();
      const threadData = dataGeneration.getThreadData();
      const nonStickyThreadId = await ui.pages.postThread.discussion.create(
        threadData.title,
        threadData.message,
        false,
      );
      threadsToDelete.push(nonStickyThreadId);
      return threadData;
    });

  await test.step(`Go back to forum ${nodeInfo.title} to display created threads`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem(nodeInfo.title);
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the threads and forum node`, async () => {
    for (const threadId of threadsToDelete) {
      await api.threads.delete(threadId, true);
    }

    await api.nodes.delete(nodeInfo.id, true);
  });
});

test(`Check sticky thread is first and other is second`, async ({ ui }) => {
  await expect((await ui.pages.forumView.getThreadByIndex(1)).getTitle()).toHaveText(stickyThreadData.title);
  await expect((await ui.pages.forumView.getThreadByIndex(2)).getTitle()).toHaveText(nonStickyThreadData.title);
});
