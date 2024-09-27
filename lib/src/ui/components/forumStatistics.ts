import { expect, Page } from '@playwright/test';

export class ForumStatistics {
  private readonly _locators = {
    list: this._page.locator(`[data-widget-key=forum_overview_forum_statistics] dl`),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async verifyThreadsCountIs(expectedCount: number): Promise<void> {
    await expect(this._locators.list.filter({ hasText: 'Threads' }).locator(`dd`)).toHaveText(expectedCount.toString());
  }

  async verifyMessagesCountIs(expectedCount: number): Promise<void> {
    await expect(this._locators.list.filter({ hasText: 'Messages' }).locator(`dd`)).toHaveText(
      expectedCount.toString(),
    );
  }

  async verifyMembersCountIs(expectedCount: number): Promise<void> {
    await expect(this._locators.list.filter({ hasText: 'Members' }).locator(`dd`)).toHaveText(expectedCount.toString());
  }

  async verifyLatestMemberIs(expectedMemberName: string): Promise<void> {
    await expect(this._locators.list.filter({ hasText: 'Latest member' }).locator(`dd`)).toHaveText(expectedMemberName);
  }
}
