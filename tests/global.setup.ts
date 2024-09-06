/* eslint-disable playwright/no-standalone-expect */
import { expect, test as setup } from '@fixtures/base';
import { NORMAL_USER_001_STORAGE_STATE } from '../playwright.config';
import { User } from '@enums/users';

setup('execute setup script', async ({ page, ui, users }) => {
    const user = await setup.step(`Get test user`, async () => {
        return users.getUser(User.NormalUser001);
    });

    await ui.components.navBar.clickLogIn();
    await ui.pages.login.loginAs(user.username, user.password);
    await expect(ui.components.navBar.locators.lblLoggedInUser).toHaveText(
        user.username,
    );
    await page.context().storageState({ path: NORMAL_USER_001_STORAGE_STATE });
});