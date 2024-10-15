import { APIThreadData } from '@api/interfaces/threadData';
import { test } from '@fixtures/threads';

test.use({ storageState: { cookies: [], origins: [] } });

let threadData: APIThreadData = null;

test.beforeEach(async ({ api }) => {
  threadData = await test.step(`As admin, use api to create a locked thread in existing forum`, async () => {
    return await api.threads.create(api.data.randomThreadData(2, false, true));
  });
});

test.afterEach(async ({ api }) => {
  if (threadData) await api.threads.delete(threadData.id, true);
});

test(`Can unlock a locked thread`, { tag: ['@e2e', '@thread'] }, async ({}) => {
  console.log('do something');
});
