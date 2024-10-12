import { expect, test } from '@fixtures/threads';
import { NodeInfo, NodeType } from '@api/nodes';
import { ThreadData } from '@interfaces/threadData';
import { UserData } from '@interfaces/userData';

test.use({ storageState: { cookies: [], origins: [] } });

let testUser: UserData = null;
const threadsToDelete: number[] = [];
let categoryNode: NodeInfo = null;
let stickyThreadData: ThreadData = null;
let nonStickyThreadData: ThreadData = null;

test.beforeEach(async ({ api, ui, scripts, data }) => {
  testUser = await test.step(`Create a new user for the test and log in`, async () => {
    const testUser = await api.users.createAutomationGroupUser();
    await scripts.userScripts.loginAs(testUser.username, testUser.password);
    return testUser;
  });

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
    const threadData = await ui.pages.postThread.discussion.create(data.getThreadData(true));
    threadsToDelete.push(threadData.id);
    return threadData;
  });

  nonStickyThreadData = await test.step(`Go back to forum and create the non-sticky thread`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem(forumNode.title);
    await ui.pages.forumView.clickPostThread();
    const threadData = await ui.pages.postThread.discussion.create(data.getThreadData(false));
    threadsToDelete.push(threadData.id);
    return threadData;
  });

  await test.step(`Go back to forum ${forumNode.title} to display created threads`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem(forumNode.title);
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the category, node, thread, and user`, async () => {
    await api.nodes.delete(categoryNode.id, true);
    await api.users.delete(testUser.id);
  });
});

test(`Check sticky thread is top most`, async ({ ui }) => {
  await expect((await ui.pages.forumView.getThreadByIndex(1)).getTitle()).toHaveText(stickyThreadData.title);
  await expect((await ui.pages.forumView.getThreadByIndex(2)).getTitle()).toHaveText(nonStickyThreadData.title);
});
