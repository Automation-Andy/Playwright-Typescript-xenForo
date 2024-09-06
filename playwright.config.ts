import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();
export const NORMAL_USER_001_STORAGE_STATE = path.join(__dirname, '/.auth/normalUser001.json');

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    headless: false,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],
        storageState: NORMAL_USER_001_STORAGE_STATE,
       },
      dependencies: ['setup'],
    },
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/,
    },
  ],
});
