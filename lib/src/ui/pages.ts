import { Page } from '@playwright/test';
import { Home } from './pages/home';
import { LogIn } from './pages/login';

export class Pages {
  constructor(private readonly page: Page) {}
  home = new Home(this.page);
  login = new LogIn(this.page);
}
