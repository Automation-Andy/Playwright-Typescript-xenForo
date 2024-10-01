import { expect, test } from '@fixtures/base';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';

test.use({ storageState: ADMIN_USER_STORAGE_STATE });
test('Testing multi user auth', async ({ ui }) => {
  await test.step(`Log in`, async () => {
    // await ui.components.navigationBar.clickLogIn();
    // await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  });
});
