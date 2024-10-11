import { simpleFaker } from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import { ThreadData, ThreadPollData } from '@interfaces/threadData';
import { UserData } from '@interfaces/userData';

export class DataGeneration {
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  getRandomWords(numberOfWords: number): string {
    return faker.word.adjective(numberOfWords);
  }

  getRandomNodeName(prefixWith: string): string {
    return `${prefixWith} ${this.getRandomWords(10)}-${this.getRandomInt(1000, 10000)}-${this.getRandomInt(1000, 10000)}`;
  }

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

  getRandomUsername(): UserData {
    const username = `${faker.internet.userName()}.${this.getRandomInt(1000, 10000)}.${this.getRandomInt(1000, 10000)}`;
    const email = `${username}@example.com`;
    const password = faker.internet.password();
    return { username: username, email: email, password: password, id: 0 };
  }
}
