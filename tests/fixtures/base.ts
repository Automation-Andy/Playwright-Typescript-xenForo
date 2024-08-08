import { test as base } from '@playwright/test';
import { Users } from '@data/users';
import { UI } from '@ui/ui';

type MyFixtures = {
  ui: UI;
  users: Users;
};

export const test = base.extend<MyFixtures>({
  ui: async ({ page }, use) => {
    const ui = new UI(page);
    await ui.pages.home.navigateTo();
    await use(ui);
  },
  users: async ({}, use) => {
    const users = new Users();
    await use(users);
  },
});

export { expect } from '@playwright/test';
