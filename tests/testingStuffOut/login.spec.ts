import { test, expect } from '@fixtures/base';

test(`Log in as admin`, async ({ ui }) => {
  await test.step(`Check we are logged in`, async () => {
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(process.env.ADMIN_USER);
  });
});
