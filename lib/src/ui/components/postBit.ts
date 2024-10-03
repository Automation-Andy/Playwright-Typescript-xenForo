import { Locator, Page } from '@playwright/test';

export class PostBit {
  private _actionBar: PostBitActionBar | null = null;
  readonly locators = {
    lnkPostedBy: this._postBitContainer.locator('.message-name'),
    lnkUserTitle: this._postBitContainer.locator('.message-userTitle'),
    message: this._postBitContainer.locator('.bbWrapper'),
    actionBar: this._postBitContainer.locator('.actionBar'),
  };
  constructor(
    private readonly _page: Page,
    private readonly _postBitContainer: Locator,
  ) {}

  getMessage(): Locator {
    return this.locators.message;
  }

  getPostedBy(): Locator {
    return this.locators.lnkPostedBy;
  }

  getUserTitle(): Locator {
    return this.locators.lnkUserTitle;
  }

  get actionBar(): PostBitActionBar {
    if (this._actionBar === null) {
      this._actionBar = new PostBitActionBar(this.locators.actionBar);
    }
    return this._actionBar;
  }
}

class PostBitActionBar {
  readonly locators = {
    chkModerate: this._container.locator('span').filter({ hasText: 'Select for moderation' }),
    lnkReport: this._container.getByRole('link', { name: 'Report' }),
    lnkEdit: this._container.getByRole('link', { name: 'Edit' }),
    lnkDelete: this._container.getByRole('link', { name: 'Delete' }),
    lnkIP: this._container.getByRole('link', { name: 'IP' }),
    lnkReply: this._container.getByRole('link', { name: 'Reply' }),
  };
  constructor(private readonly _container: Locator) {}
}
