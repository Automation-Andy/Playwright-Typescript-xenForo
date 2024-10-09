import { expect, test as setup } from '@fixtures/base';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';

setup('global setup', async ({ page, ui }) => {
  await setup.step(`authenticate as admin user and store state`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
    await page.context().storageState({ path: ADMIN_USER_STORAGE_STATE });
  });
});
