import { Page } from '@playwright/test';
import { Pages } from '@ui/pages';
import { Components } from '@ui/components';
import { Popups } from '@ui/popups';

export class UI {
  constructor(private readonly page: Page) {}
  readonly pages = new Pages(this.page);
  readonly components = new Components(this.page);
  readonly popups = new Popups(this.page);
}
