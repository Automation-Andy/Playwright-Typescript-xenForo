import { Page } from '@playwright/test';
import { Home } from '@ui/pages/home';
import { LogIn } from '@ui/pages/login';
import { SearchResults } from '@ui/pages/searchResults';
import { PostThread } from '@ui/pages/postThread';
import { ThreadView } from '@ui/pages/threadView';
import { ForumView } from '@ui/pages/forumView';

export class Pages {
  constructor(private readonly page: Page) {}
  login = new LogIn(this.page);
  home = new Home(this.page);
  searchResults = new SearchResults(this.page);
  postThread = new PostThread(this.page);
  forumView = new ForumView(this.page);
  threadView = new ThreadView(this.page);
}
