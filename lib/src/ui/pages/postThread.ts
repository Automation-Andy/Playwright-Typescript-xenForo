import { Page } from '@playwright/test';
import { Editor } from '@ui/components/editor';

export class PostThread {
  private readonly _threadOptions = new ThreadOptions(this.page);
  private readonly _threadStatus = new ThreadStatus(this.page);
  private readonly _editor = new Editor(this.page);

  readonly locators = {
    txtThreadTitle: this.page.getByPlaceholder('Thread title'),
    btnAttachFiles: this.page.getByRole('link', { name: 'Attach files' }),
    btnPostThread: this.page.getByRole('button', { name: 'Post thread' }),
  };
  constructor(private readonly page: Page) {}

  async setThreadTitle(title: string) {
    await this.locators.txtThreadTitle.fill(title);
  }

  get editor() {
    return this._editor;
  }

  get threadOptions() {
    return this._threadOptions;
  }

  get threadStatus() {
    return this._threadStatus;
  }
}

class ThreadOptions {
  readonly locators = {
    chkWatchThisThread: this.page.getByText('Watch this thread'),
    chkAndReceiveEmailNotifications: this.page.getByText('and receive email notifications'),
  };
  constructor(private readonly page: Page) {}
}

class ThreadStatus {
  readonly locators = {
    chkUnlocked: this.page.getByText('Unlocked'),
    chkSticky: this.page.getByText('Sticky', { exact: true }),
  };
  constructor(private readonly page: Page) {}
}
