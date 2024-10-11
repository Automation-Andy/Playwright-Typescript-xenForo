import { test } from '@fixtures/base';

test.use({ storageState: { cookies: [], origins: [] } });
test('Can create user using api only', async ({ api }) => {
  await test.step(`Create a new user`, async () => {
    await api.users.createRandomUser();
  });
});
