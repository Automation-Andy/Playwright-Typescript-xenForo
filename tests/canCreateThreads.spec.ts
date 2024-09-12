import { expect, test } from '@fixtures/base';

test(`Can create thread from home page`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');
  await expect(page.getByPlaceholder('Thread title')).toBeVisible();
});
