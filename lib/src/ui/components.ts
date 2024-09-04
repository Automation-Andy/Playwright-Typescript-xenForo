import { Page } from '@playwright/test';
import { NavBar } from '@ui/components/navBar';
import { StaffBar } from '@ui/components/staffBar';
import { ForumStatistics } from '@ui/components/forumStatistics';

export class Components {
  constructor(private readonly page: Page) {}

  navBar = new NavBar(this.page);
  staffBar = new StaffBar(this.page);
  forumStatistics = new ForumStatistics(this.page);
}
