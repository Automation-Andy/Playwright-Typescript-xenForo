import { Page } from '@playwright/test';
import { NavigationBar } from '@ui/components/navigationBar';
import { StaffBar } from '@ui/components/staffBar';
import { ForumStatistics } from '@ui/components/forumStatistics';
import { Search } from '@ui/components/search';
import { AdvancedSearch } from '@ui/components/advancedSearch';
import { Editor } from '@ui/components/editor';
import { InlineModerationBar } from '@ui/components/inlineModerationBar';
import { Breadcrumb } from '@ui/components/breadcrumb';
import { InlineModerationTop } from '@ui/components/inlineModerationTop';
import { FlashMessage } from '@ui/components/flashMessage';

export class Components {
  constructor(private readonly page: Page) {}

  navigationBar = new NavigationBar(this.page);
  staffBar = new StaffBar(this.page);
  forumStatistics = new ForumStatistics(this.page);
  search = new Search(this.page);
  advancedSearch = new AdvancedSearch(this.page);
  editor = new Editor(this.page);
  inlineModerationTop = new InlineModerationTop(this.page);
  inlineModerationBar = new InlineModerationBar(this.page);
  breadcrumb = new Breadcrumb(this.page);
  flashMessage = new FlashMessage(this.page);
}
