import { StringHelpers } from '@helpers/string';
import { Locator, Page } from '@playwright/test';
import { Editor } from '@ui/components/editor';

abstract class PostThreadBase {
  protected _locators: { [key: string]: Locator };
  private readonly _threadOptions = new ThreadOptions(this._page);
  private readonly _threadStatus = new ThreadStatus(this._page);
  private readonly _editor = new Editor(this._page);

  constructor(protected readonly _page: Page) {
    this._locators = {
      txtThreadTitle: this._page.getByPlaceholder('Thread title'),
      btnAttachFiles: this._page.getByRole('link', { name: 'Attach files' }),
      btnPostThread: this._page.getByRole('button', { name: 'Post thread' }),
    };
  }

  async enterThreadTitle(title: string) {
    await this._locators.txtThreadTitle.fill(title);
  }

  protected async clickPostThread() {
    await this._locators.btnPostThread.click();
  }

  protected get editor(): Editor {
    return this._editor;
  }

  get threadOptions(): ThreadOptions {
    return this._threadOptions;
  }

  get threadStatus(): ThreadStatus {
    return this._threadStatus;
  }
}

export class PostDiscussionThread extends PostThreadBase {
  constructor(_page: Page) {
    super(_page);
    this._locators = {
      ...this._locators,
      tabDiscussion: _page.getByText('Discussion'),
    };
  }

  async create(title: string, message: string): Promise<ThreadID> {
    await this.clickDiscussionTab();
    await this.enterThreadTitle(title);
    await this.editor.enterMessage(message);
    await this.clickPostThread();
    await this._page.waitForURL('**/index.php?threads/**');
    return this.getThreadID();
  }

  async getThreadID(): Promise<ThreadID> {
    return StringHelpers.getIdFromUrl(this._page.url());
  }

  async clickDiscussionTab() {
    await this._locators.tabDiscussion.click();
  }
}

class ThreadOptions {
  private readonly _locators = {
    chkWatchThisThread: this._page.getByText('Watch this thread'),
    chkAndReceiveEmailNotifications: this._page.getByText('and receive email notifications'),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async clickWatchThisThread() {
    await this._locators.chkWatchThisThread.click();
  }

  async clickAndReceiveEmailNotifications() {
    await this._locators.chkAndReceiveEmailNotifications.click();
  }
}

class ThreadStatus {
  private readonly _locators = {
    chkUnlocked: this._page.getByText('Unlocked'),
    chkSticky: this._page.getByText('Sticky', { exact: true }),
  };
  constructor(private readonly _page: Page) {}

  get locators() {
    return this._locators;
  }

  async clickUnlocked() {
    await this._locators.chkUnlocked.click();
  }

  async clickSticky() {
    await this._locators.chkSticky.click();
  }
}

export class PostPollThread extends PostThreadBase {
  constructor(readonly page: Page) {
    super(page);

    this._locators = {
      ...this._locators,
      tabPoll: this.page.getByText('Poll', { exact: true }),
      txtQuestion: this.page.getByLabel('Question'),
      txtPossibleResponses: this.page.locator(`[name="poll[new_responses][]"]`),
      chkMaxResponsesSingle: this.page.getByText('Single choice'),
      chkMaxResponsesUnlimited: this.page.getByText('Unlimited'),
      chkMaxResponsesMultiple: this.page
        .locator('dd')
        .filter({ hasText: 'Single choice Unlimited' })
        .locator('i')
        .nth(2),
      btnMaxResponsesMultipleIncrease: this.page
        .locator('dd')
        .filter({ hasText: 'Single choice Unlimited' })
        .getByLabel('Increase'),
      btnMaxResponsesMultipleDecrease: this.page
        .locator('dd')
        .filter({ hasText: 'Single choice Unlimited' })
        .getByLabel('Decrease'),
      chkAllowVotersToChange: this.page.getByText('Allow voters to change their'),
      chkDisplayVotesPublicly: this.page.getByText('Display votes publicly'),
      chkAllowResultsToBeViewed: this.page.getByText('Allow the results to be'),
      chkClosePollAfter: this.page.getByText('Close this poll after:'),
      txtClosePollAfter: this.page.locator(`poll[close_length]`),
      btnClosePollAfterIncrease: this.page
        .locator('dl')
        .filter({ hasText: 'Options Allow voters to' })
        .getByLabel('Increase'),
      btnClosePollAfterDecrease: this.page
        .locator('dl')
        .filter({ hasText: 'Options Allow voters to' })
        .getByLabel('Decrease'),
      cmbPollCloses: this.page.locator(`poll[close_units]`),
    };
  }

  async create(
    title: string,
    message: string,
    question: string,
    possibleResponses: string[],
    selectableResponseType: PollMaximumResponses,
    maximumSelectableResponses: number = 1,
  ): Promise<void> {
    await this.clickPollTab();
    await this.enterThreadTitle(title);
    await this.editor.enterMessage(message);
    await this.setQuestion(question);
    await this.setPossibleResponses(possibleResponses);
    await this.setMaximumSelectableResponses(selectableResponseType, maximumSelectableResponses);
    await this.clickPostThread();
  }

  async clickPollTab() {
    await this._locators.tabPoll.click();
  }

  async setQuestion(question: string) {
    await this._locators.txtQuestion.fill(question);
  }

  async setPossibleResponses(possibleResponses: string[]) {
    let i = 0;
    for (const response of possibleResponses) {
      await this._locators.txtPossibleResponses.nth(i).pressSequentially(response);
      i++;
    }
  }

  async setMaximumSelectableResponses(type: PollMaximumResponses, numberOfResponses: number = 1) {
    switch (numberOfResponses) {
      case 0:
        await this._locators.chkMaxResponsesSingle.click();
        break;
      case 1:
        await this._locators.chkMaxResponsesUnlimited.click();
        break;
      default:
        await this._locators.chkMaxResponsesMultiple.click();
        break;
    }
  }
}

type PollMaximumResponses = 'single' | 'unlimited' | 'multiple';
type ThreadID = number;
