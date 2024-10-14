import { expect, test } from '@fixtures/threads';
import { ThreadData } from '@ui/interfaces/threadData';
import { UserData } from '@interfaces/userData';

let threadData: ThreadData = null;
let testUser: UserData = null;

test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ api, ui }) => {
  testUser = await test.step(`Create a new user for the test`, async () => {
    return await api.users.createRandomUser();
  });

  await test.step(`Log in as user ${testUser.username}`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(testUser.username, testUser.password);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(testUser.username);
  });

  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.clickForum('Main category', 'Main forum');
    await expect(ui.pages.forumView.getHeading()).toHaveText('Main forum');
  });
});

test.afterEach(async ({ api }) => {
  await test.step(`Delete the thread with id ${threadData.id} and user ${testUser.username}`, async () => {
    await api.threads.delete(threadData.id, true);
    await api.users.delete(testUser.id);
  });
});

test(`Can post discussion thread`, async ({ ui, data }) => {
  threadData = await test.step(`Create a discussion type thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    return await ui.pages.postThread.discussion.create(data.getThreadData(false));
  });

  await test.step(`Check thread has been created`, async () => {
    expect(threadData.id, `Expected thread id to be > 0 but received ${threadData.id}`).toBeGreaterThan(0);
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
    const threadPost = await ui.pages.threadView.getPostByIndex(1);
    await expect(threadPost.getMessage()).toHaveText(threadData.message);
    await expect(threadPost.getPostedBy()).toHaveText(testUser.username);
    await expect(threadPost.getUserTitle()).toHaveText('New member');
  });
});
