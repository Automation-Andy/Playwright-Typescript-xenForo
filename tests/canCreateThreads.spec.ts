import { expect, test } from '@fixtures/base';

test(`Testing basic thread posting pom`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');
  await expect(page.getByPlaceholder('Thread title')).toBeVisible();

  await ui.pages.postThread.createThread('Thread title', 'Thread content');
  await expect(ui.pages.thread.getHeading()).toHaveText('Thread title');
  await expect(ui.pages.thread.getPosts()).toHaveCount(1);
});
