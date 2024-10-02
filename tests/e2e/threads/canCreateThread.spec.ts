import { expect, test } from '@fixtures/base';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });

test.beforeEach(async ({ ui }) => {
  await test.step(`Navigate to forum where thread should be created`, async () => {
    await ui.pages.home.clickForum('Main category', 'Main forum');
    await expect(ui.pages.forumView.getHeading()).toHaveText('Main forum');
  });
});

test(`Can create a thread`, async ({ page, ui, faker }) => {
  const threadData = await test.step(`Get thread data`, async () => {
    const title = faker.string.alphanumeric({ length: { min: 5, max: 30 } });
    return {
      title: title,
      content: faker.string.alphanumeric({ length: { min: 5, max: 100 } }),
      slug: title.replace(/ /g, '-').toLowerCase(),
    };
  });

  await test.step(`Create a thread`, async () => {
    await ui.pages.forumView.clickPostThread();
    await ui.pages.postDiscussionThread.create(threadData.title, threadData.content);
  });

  await test.step(`Check thread has been created and the url is as expected`, async () => {
    await expect(ui.pages.threadView.getHeading()).toHaveText(threadData.title);
    await expect(page).toHaveURL(new RegExp(`/index\\.php\\?threads\\/${threadData.slug}\\.\\d+\\/`));
  });
});
