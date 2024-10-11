import { test, expect } from '@fixtures/base';
import { UserData } from '@interfaces/userData';

test.use({ storageState: { cookies: [], origins: [] } });

let newUser: UserData = null;

test.afterEach(async ({ api }) => {
  if (newUser) {
    await api.users.delete(newUser.id);
  }
});

test(`Log in as user created using api`, async ({ api, ui }) => {
  newUser = await test.step(`Create user using api`, async () => {
    return await api.users.createRandomUser();
  });

  await test.step(`Log in as new user ${newUser.username}`, async () => {
    console.log(`Logging in as ${newUser.username}`);
    await ui.components.navigationBar.clickLogIn();
    await ui.pages.login.loginAs(newUser.username, newUser.password);
    await expect(ui.components.navigationBar.locators.lblLoggedInUser).toHaveText(newUser.username);
  });
});
