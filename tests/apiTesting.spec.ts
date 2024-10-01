import { NodeType } from '@api/nodes';
import { test } from '@fixtures/base';

test.use({ storageState: { cookies: [], origins: [] } });
test('Can get node using api only', async ({ api }) => {
  await test.step(`Get node by id`, async () => {
    const node = await api.nodes.get(1);
    console.log(`node url: ${node.url}`);
  });
});

test.use({ storageState: { cookies: [], origins: [] } });
test('Can create forum using api only', async ({ api }) => {
  const category = await test.step(`Create a new forum category`, async () => {
    return await api.nodes.create(0, NodeType.Category, 'New forum category');
  });

  await test.step(`Create a new discussion forum inside the category`, async () => {
    return await api.nodes.create(category.id, NodeType.Forum, 'Yet another new discussion forum', true);
  });
});

test.use({ storageState: { cookies: [], origins: [] } });
test('Can delete forum using api only', async ({ api }) => {
  await test.step(`Delete the category and all children`, async () => {
    await api.nodes.delete(22, true);
  });
});
