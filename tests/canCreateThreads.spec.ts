import { expect, test } from '@fixtures/base';

test(`Testing creating a thread discussion`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');

  await ui.pages.postDiscussionThread.create('Thread title', 'Thread content');
  await expect(ui.pages.thread.getHeading()).toHaveText('Thread title');
  await expect(ui.pages.thread.getPosts()).toHaveCount(1);
});

test(`creating a thread with a poll`, async ({ page, ui }) => {
  await ui.pages.home.clickPostThread();
  await expect(page.getByText('Post thread in...')).toBeVisible();
  await ui.popups.postThreadIn.clickThreadDestination('Main category', 'Main forum');

  await ui.pages.postPollThread.create(
    'another thread',
    'hello world',
    'how long is a piece of string',
    ['short', 'long'],
    'single',
  );

  await expect(ui.pages.thread.getHeading()).toHaveText('another thread');
  await expect(ui.pages.thread.getPosts()).toHaveCount(1);

  await ui.pages.thread.poll.clickPollOption('short');
  await ui.pages.thread.poll.clickPollOption('long');
  await ui.pages.thread.poll.clickCastVote();
});
