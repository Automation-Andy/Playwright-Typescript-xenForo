import { Page } from '@playwright/test';
import { Home } from '@ui/pages/home';
import { LogIn } from '@ui/pages/login';
import { SearchResults } from '@ui/pages/searchResults';

export class Pages {
  constructor(private readonly page: Page) {}
  login = new LogIn(this.page);
  home = new Home(this.page);
  searchResults = new SearchResults(this.page);
}
