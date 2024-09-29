import { expect, test } from '@fixtures/base';
import { ModerateThreadsActions } from '@ui/components/inlineModerationBar';
import { StringHelpers } from '@helpers/string';

test.use({ storageState: { cookies: [], origins: [] } });
test('Create a new thread using ui and delete using api', async ({ page, api, ui }) => {
  await test.step(`Log in`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  });

  await test.step(`Navigate to post thread in main forum`, async () => {
    await ui.pages.home.clickPostThread();
    await expect(page.getByText('Post thread in...')).toBeVisible();
    await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');
  });

  await test.step(`Post a thread`, async () => {
    await ui.pages.postDiscussionThread.create('Thread title', 'Thread content');
    await expect(ui.pages.threadView.getHeading()).toHaveText('Thread title');
    await expect(ui.pages.threadView.getPosts()).toHaveCount(1);
  });

  await test.step(`Delete thread using api`, async () => {
    await api.threads.delete(StringHelpers.getIdFromUrl(page.url()), true);
  });
});

test.use({ storageState: { cookies: [], origins: [] } });
test('Create a new thread using api', async ({ api, ui }) => {
  await test.step(`Log in`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  });

  await test.step(`Create thread using api`, async () => {
    await api.threads.create(2, 'Thread created via api', 'Thread content is goooood');
  });
});

test.use({ storageState: { cookies: [], origins: [] } });
test('Can delete thread using api', async ({ api }) => {
  await test.step(`Create thread using api`, async () => {
    const response = await api.threads.delete(63, true);
    expect(response.status()).toBe(200);
  });
});

test.use({ storageState: { cookies: [], origins: [] } });
test(`Testing creating a thread and deleting it`, async ({ page, ui }) => {
  await test.step(`Log in`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  });

  await test.step(`Navigate to post thread in main forum`, async () => {
    await ui.pages.home.clickPostThread();
    await expect(page.getByText('Post thread in...')).toBeVisible();
    await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');
  });

  await test.step(`Post a thread`, async () => {
    await ui.pages.postDiscussionThread.create('Thread title', 'Thread content');
    await expect(ui.pages.threadView.getHeading()).toHaveText('Thread title');
    await expect(ui.pages.threadView.getPosts()).toHaveCount(1);
  });

  await test.step(`Go back to Main forum and use mod tools to permanently delete the thread`, async () => {
    await ui.components.breadcrumb.clickBreadcrumbItem('Main forum');
    await expect(page.getByRole('heading', { name: 'Main forum' })).toBeVisible();

    await ui.components.inlineModerationTop.clickModeration();
    await ui.components.inlineModerationBar.moderateThreads(true, ModerateThreadsActions.DeleteThreads);

    await ui.popups.inlineModerationDeleteThreads.clickPermanentlyDelete();
    await ui.popups.inlineModerationDeleteThreads.clickDelete();
  });

  await test.step(`Verify new threads exist in main forum`, async () => {
    await expect(page.getByText('There are no threads in this forum.')).toBeVisible();
  });
});

test(`Testing creating a thread discussion`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');

  await ui.pages.postDiscussionThread.create('Thread title', 'Thread content');
  await expect(ui.pages.threadView.getHeading()).toHaveText('Thread title');
  await expect(ui.pages.threadView.getPosts()).toHaveCount(1);
});

test(`creating a thread with a poll`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');

  await ui.pages.postPollThread.create(
    'another thread',
    'hello world',
    'how long is a piece of string',
    ['short', 'long'],
    'single',
  );

  await expect(ui.pages.threadView.getHeading()).toHaveText('another thread');
  await expect(ui.pages.threadView.getPosts()).toHaveCount(1);

  await ui.pages.threadView.poll.clickPollOption('short');
  await ui.pages.threadView.poll.clickPollOption('long');
  await ui.pages.threadView.poll.clickCastVote();
});

test(`check using navigation component`, async ({ ui }) => {
  await ui.components.navigationBar.clickNavigationLink('Home');
  await expect(ui.components.navigationBar.selectedNavigationLink).toHaveText('Forums');

  await ui.components.navigationBar.clickNavigationLink('Forums');
  await expect(ui.components.navigationBar.selectedNavigationLink).toHaveText('Forums');

  await ui.components.navigationBar.clickNavigationLink("What's new");
  await expect(ui.components.navigationBar.selectedNavigationLink).toHaveText(`What's new`);

  await ui.components.navigationBar.clickNavigationLink('Members');
  await expect(ui.components.navigationBar.selectedNavigationLink).toHaveText('Members');
});
