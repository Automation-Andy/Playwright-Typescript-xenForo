import { Locator, Page } from '@playwright/test';
import { Editor } from '@ui/components/editor';

abstract class PostThreadBase {
  protected locators: { [key: string]: Locator };
  private readonly _threadOptions = new ThreadOptions(this.page);
  private readonly _threadStatus = new ThreadStatus(this.page);
  private readonly _editor = new Editor(this.page);

  constructor(protected readonly page: Page) {
    this.locators = {
      txtThreadTitle: this.page.getByPlaceholder('Thread title'),
      btnAttachFiles: this.page.getByRole('link', { name: 'Attach files' }),
      btnPostThread: this.page.getByRole('button', { name: 'Post thread' }),
    };
  }

  async setThreadTitle(title: string) {
    await this.locators.txtThreadTitle.fill(title);
  }

  protected async clickPostThread() {
    await this.locators.btnPostThread.click();
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
  constructor(page: Page) {
    super(page);
    this.locators = {
      ...this.locators,
      tabDiscussion: page.getByText('Discussion'),
    };
  }

  async create(title: string, content: string) {
    await this.clickDiscussionTab();
    await this.setThreadTitle(title);
    await this.editor.setContent(content);
    await this.clickPostThread();
  }

  async clickDiscussionTab() {
    await this.locators.tabDiscussion.click();
  }
}

class ThreadOptions {
  readonly locators = {
    chkWatchThisThread: this.page.getByText('Watch this thread'),
    chkAndReceiveEmailNotifications: this.page.getByText('and receive email notifications'),
  };
  constructor(private readonly page: Page) {}

  async clickWatchThisThread() {
    await this.locators.chkWatchThisThread.click();
  }

  async clickAndReceiveEmailNotifications() {
    await this.locators.chkAndReceiveEmailNotifications.click();
  }
}

class ThreadStatus {
  readonly locators = {
    chkUnlocked: this.page.getByText('Unlocked'),
    chkSticky: this.page.getByText('Sticky', { exact: true }),
  };
  constructor(private readonly page: Page) {}

  async clickUnlocked() {
    await this.locators.chkUnlocked.click();
  }

  async clickSticky() {
    await this.locators.chkSticky.click();
  }
}

export class PostPollThread extends PostThreadBase {
  constructor(readonly page: Page) {
    super(page);

    this.locators = {
      ...this.locators,
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
    content: string,
    question: string,
    possibleResponses: string[],
    selectableResponseType: PollMaximumResponses,
    maximumSelectableResponses: number = 1,
  ): Promise<void> {
    await this.clickPollTab();
    await this.setThreadTitle(title);
    await this.editor.setContent(content);
    await this.setQuestion(question);
    await this.setPossibleResponses(possibleResponses);
    await this.setMaximumSelectableResponses(selectableResponseType, maximumSelectableResponses);
    await this.clickPostThread();
  }

  async clickPollTab() {
    await this.locators.tabPoll.click();
  }

  async setQuestion(question: string) {
    await this.locators.txtQuestion.fill(question);
  }

  async setPossibleResponses(possibleResponses: string[]) {
    let i = 0;
    for (const response of possibleResponses) {
      await this.locators.txtPossibleResponses.nth(i).pressSequentially(response);
      i++;
    }
  }

  async setMaximumSelectableResponses(type: PollMaximumResponses, numberOfResponses: number = 1) {
    switch (numberOfResponses) {
      case 0:
        await this.locators.chkMaxResponsesSingle.click();
        break;
      case 1:
        await this.locators.chkMaxResponsesUnlimited.click();
        break;
      default:
        await this.locators.chkMaxResponsesMultiple.click();
        break;
    }
  }
}

type PollMaximumResponses = 'single' | 'unlimited' | 'multiple';
