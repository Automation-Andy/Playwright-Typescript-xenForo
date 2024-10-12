import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export const ADMIN_USER_STORAGE_STATE = path.join(__dirname, '/.auth/admin.json');

export default defineConfig({
  fullyParallel: true,
  timeout: 30000,
  expect: { timeout: 5000 },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    screenshot: 'only-on-failure',
    headless: false,
    actionTimeout: 5000,
    navigationTimeout: 5000,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
      teardown: 'teardown',
    },
    {
      name: 'chromium',
      testDir: './tests',
      use: {
        ...devices['Desktop Chrome'],
        storageState: ADMIN_USER_STORAGE_STATE,
      },
      dependencies: ['setup'],
    },
    {
      name: 'teardown',
      testMatch: /teardown\.ts/,
    },
  ],
});
