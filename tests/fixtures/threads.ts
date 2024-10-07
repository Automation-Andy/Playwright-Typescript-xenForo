import { test as base } from '@fixtures/base';
import { DataGeneration } from '@data/dataGeneration';

type ThreadFixture = {
  dataGeneration: DataGeneration;
};

export const test = base.extend<ThreadFixture>({
  dataGeneration: ({}, use) => {
    use(new DataGeneration());
  },
});

export { expect } from '@playwright/test';
