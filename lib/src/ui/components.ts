import { Page } from '@playwright/test';
import { NavBar } from '@ui/components/navBar';
import { StaffBar } from '@ui/components/staffBar';
import { ForumStatistics } from '@ui/components/forumStatistics';
import { Search } from '@ui/components/search';
import { AdvancedSearch } from '@ui/components/advancedSearch';

export class Components {
  constructor(private readonly page: Page) {}

  navBar = new NavBar(this.page);
  staffBar = new StaffBar(this.page);
  forumStatistics = new ForumStatistics(this.page);
  search = new Search(this.page);
  advancedSearch = new AdvancedSearch(this.page);
}
