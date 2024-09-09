import { Page } from '@playwright/test';
import { PostThreadIn } from '@ui/popups/PostThreadIn';

export class Popups {
  constructor(private readonly page: Page) {}
  postThreadIn = new PostThreadIn(this.page);
}
