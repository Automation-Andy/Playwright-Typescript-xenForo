import { test as base } from '@fixtures/base';
import { DataGeneration } from '@data/dataGeneration';

type ThreadFixture = {
  data: DataGeneration;
};

export const test = base.extend<ThreadFixture>({
  data: ({}, use) => {
    use(new DataGeneration());
  },
});

export { expect } from '@playwright/test';
