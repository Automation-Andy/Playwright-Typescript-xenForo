import { Page } from '@playwright/test';
import { Pages } from './pages';
import { Components } from './components';

export class UI {
  constructor(private readonly page: Page) {}
  readonly pages = new Pages(this.page);
  readonly components = new Components(this.page);
}
