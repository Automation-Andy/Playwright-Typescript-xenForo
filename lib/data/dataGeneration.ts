import { simpleFaker } from '@faker-js/faker';
import { ThreadData, ThreadPollData } from '@interfaces/threadData';

export class DataGeneration {
  getThreadData(): ThreadData {
    return {
      title: simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } }),
      message: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
    };
  }

  getThreadPollData(): ThreadPollData {
    return {
      title: simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } }),
      message: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
      question: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
      possibleResponses: [
        (simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
        simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } })),
      ],
    };
  }
}
