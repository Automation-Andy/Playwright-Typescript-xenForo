import { expect, test } from '@fixtures/threads';
import { NodeInfo, NodeType } from '@api/nodes';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';
import { ThreadData } from '@interfaces/threadData';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });

let categoryNode: NodeInfo = null;
const threadsToDelete: number[] = [];
let stickyThreadData: ThreadData = null;
let nonStickyThreadData: ThreadData = null;

test.beforeEach(async ({ api, ui, data }) => {
  categoryNode = await test.step(`Create a category as parent for forum node`, async () => {
    return await api.nodes.createCategory(data.getRandomNodeName('Category'));
  });

  const forumNode = await test.step(`Create a new discussion forum inside 'Main category'`, async () => {
    return await api.nodes.createForum(categoryNode.id, NodeType.Forum, data.getRandomNodeName('Forum'));
  });

  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.waitUntilForumIsPresent(categoryNode.title, forumNode.title);
  });

  stickyThreadData = await test.step(`Create the sticky thread`, async () => {
    await ui.pages.home.clickForum(categoryNode.title, forumNode.title);
    await ui.pages.forumView.clickPostThread();
    const threadData = data.getThreadData();
    const stickyThreadId = await ui.pages.postThread.discussion.create(threadData.title, threadData.message, true);
    threadsToDelete.push(stickyThreadId);
    return threadData;
  });

  nonStickyThreadData =
    await test.step(`Go back to forum ${forumNode.title} and create the non-sticky thread`, async () => {
      await ui.components.breadcrumb.clickBreadcrumbItem(forumNode.title);
      await ui.pages.forumView.clickPostThread();
      const threadData = data.getThreadData();
      const nonStickyThreadId = await ui.pages.postThread.discussion.create(
        threadData.title,
        threadData.message,
        false,
      );
      threadsToDelete.push(nonStickyThreadId);
      return threadData;
    });

  await test.step(`Go back to forum ${forumNode.title} to display created threads`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem(forumNode.title);
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the category (which also deletes the forum node and thread)`, async () => {
    await api.nodes.delete(categoryNode.id, true);
  });
});

test(`Check sticky thread is first and other is second`, async ({ ui }) => {
  await expect((await ui.pages.forumView.getThreadByIndex(1)).getTitle()).toHaveText(stickyThreadData.title);
  await expect((await ui.pages.forumView.getThreadByIndex(2)).getTitle()).toHaveText(nonStickyThreadData.title);
});
