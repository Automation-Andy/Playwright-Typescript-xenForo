import { Page } from '@playwright/test';
import { NavBar } from './components/navBar';
import { StaffBar } from './components/staffBar';

export class Components {
  constructor(private readonly page: Page) {}

  navBar = new NavBar(this.page);
  staffBar = new StaffBar(this.page);
}