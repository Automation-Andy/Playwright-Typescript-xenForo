import { Page } from '@playwright/test';
import { NavigationBar } from '@ui/components/navigationBar';
import { StaffBar } from '@ui/components/staffBar';
import { ForumStatistics } from '@ui/components/forumStatistics';
import { Search } from '@ui/components/search';
import { AdvancedSearch } from '@ui/components/advancedSearch';
import { Editor } from '@ui/components/editor';
import { InlineModeratorBar } from '@ui/components/inlineModeratorBar';

export class Components {
  constructor(private readonly page: Page) {}

  navigationBar = new NavigationBar(this.page);
  staffBar = new StaffBar(this.page);
  forumStatistics = new ForumStatistics(this.page);
  search = new Search(this.page);
  advancedSearch = new AdvancedSearch(this.page);
  editor = new Editor(this.page);
  inlineModeratorBar = new InlineModeratorBar(this.page);
}
