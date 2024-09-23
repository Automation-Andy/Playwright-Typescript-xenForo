import { Page } from '@playwright/test';
import { PostThreadIn } from '@ui/popups/PostThreadIn';
import { InlineModerationDeleteThreads } from '@ui/popups/inlineModerationDeleteThreads';

export class Popups {
  constructor(private readonly page: Page) {}
  postThreadIn = new PostThreadIn(this.page);
  inlineModerationDeleteThreads = new InlineModerationDeleteThreads(this.page);
}
