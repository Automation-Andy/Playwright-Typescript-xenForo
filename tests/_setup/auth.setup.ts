import { User } from '@data/users';
import { expect, test as setup } from '@fixtures/base';
import { ADMIN_USER_STORAGE_STATE } from 'playwright.config';
import { NORMAL_USER_001_STORAGE_STATE } from 'playwright.config';

setup('authenticate as admin user', async ({ page, ui }) => {
  await ui.components.navigationBar.clickLogIn();
  await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
  await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  await page.context().storageState({ path: ADMIN_USER_STORAGE_STATE });
});

setup('authenticate as a normal user', async ({ page, ui, users }) => {
  const user = users.getUser(User.NormalUser001);
  await ui.components.navigationBar.clickLogIn();
  await ui.pages.login.loginAs(user.username, user.password);
  await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(user.username);
  await page.context().storageState({ path: NORMAL_USER_001_STORAGE_STATE });
});
