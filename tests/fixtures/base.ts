import { test as base } from '@playwright/test';
import { Users } from '@data/users';
import { UI } from '@ui/ui';
import { Api } from '@api/api';

type MyFixtures = {
  api: Api;
  ui: UI;
  users: Users;
};

export const test = base.extend<MyFixtures>({
  api: async ({ request, page }, use) => {
    const api = new Api(request, page);
    await use(api);
  },
  ui: async ({ page }, use) => {
    const ui = new UI(page);
    await ui.pages.home.goto();
    await use(ui);
  },
  users: async ({}, use) => {
    const users = new Users();
    await use(users);
  },
});

export { expect } from '@playwright/test';
