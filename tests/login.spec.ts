import { test, expect } from '@fixtures/base';
import { User } from '@enums/users';

test(`Log in with registered user by username and password`, async ({ users, ui }) => {
  const user = await test.step(`Get test user`, async () => {
    return users.getUser(User.NormalUser001);
  });

  await test.step(`Check we are logged in`, async () => {
    await expect(ui.components.navBar.locators.lblLoggedInUser).toHaveText(
      user.username,
    );
  });
});
