import { ThreadData, ThreadPollData } from '@interfaces/threadData';
import { test as base } from '@fixtures/base';
import { simpleFaker } from '@faker-js/faker';

type ThreadFixture = {
  faker: typeof simpleFaker;
  threadData: ThreadData;
  threadPollData: ThreadPollData;
};

export const test = base.extend<ThreadFixture>({
  faker: async ({}, use) => {
    await use(simpleFaker);
  },
  threadData: {
    title: simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } }),
    message: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
  },
  threadPollData: {
    title: simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } }),
    message: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
    question: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
    possibleResponses: [
      (simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
      simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } })),
    ],
  },
});

export { expect } from '@playwright/test';
