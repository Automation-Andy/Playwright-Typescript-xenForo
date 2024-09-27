import { expect, Page } from '@playwright/test';

export class InlineModerationBar {
  private readonly _container = this._page.locator('.inlineModBar');
  private readonly _locators = {
    lblTitle: this._container.locator('li').first(),
    chkSelectAll: this._container.getByText('Select all', { exact: true }),
    cmbChooseActon: this._container.locator('select'),
    btnGo: this._page.getByRole('button', { name: 'Go' }),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async moderateThreads(selectAll: boolean, action: ModerateThreadsActions) {
    await expect(this._locators.lblTitle).toHaveText('Threads (0)');
    await this.setSelectAll(selectAll);
    await expect(this._locators.lblTitle).toHaveText(/Threads \([1-9]\d*\)/);
    await this.selectAction(action);
    await this.clickGo();
  }

  async moderatePosts(selectAll: boolean, action: ModeratePostsActions) {
    await expect(this._locators.lblTitle).toHaveText('Posts (0)');
    await this.setSelectAll(selectAll);
    await expect(this._locators.lblTitle).toHaveText(/Posts \([1-9]\d*\)/);
    await this.selectAction(action);
    await this.clickGo();
  }

  async setSelectAll(checked: boolean) {
    await this._locators.chkSelectAll.setChecked(checked);
  }

  async selectAction(action: ModerateThreadsActions | ModeratePostsActions) {
    await this._locators.cmbChooseActon.selectOption(action.valueOf());
  }

  async clickGo() {
    await this._locators.btnGo.click();
  }
}

export enum ModerateThreadsActions {
  DeleteThreads = 'delete',
  UndeleteThreads = 'undelete',
  ApproveThreads = 'approve',
  UnapproveThreads = 'unapprove',
  StickThreads = 'stick',
  UnstickThreads = 'unstick',
  LockThreads = 'lock',
  UnlockThreads = 'unlock',
  MoveThreads = 'move',
  ApplyPrefix = 'apply_prefix',
  ChangeThreadType = 'change_type',
}

export enum ModeratePostsActions {
  DeletePosts = 'delete',
  UndeletePosts = 'undelete',
  ApprovePosts = 'approve',
  UnapprovePosts = 'unapprove',
  MovePosts = 'move',
  CopyPosts = 'copy',
  MergePosts = 'merge',
}
