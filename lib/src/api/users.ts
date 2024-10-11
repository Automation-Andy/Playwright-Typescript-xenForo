import { APIRequestContext, expect, Page } from '@playwright/test';
import { ApiBase } from '@api/base';
import { DataGeneration } from '@data/dataGeneration';
import { UserData } from '@interfaces/userData';

export class Users extends ApiBase {
  private readonly _data = new DataGeneration();
  constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }

  async createRandomUser(): Promise<UserData> {
    const params = this._data.getRandomUsername();
    const response = await this.request('post', 'users/', params);
    expect(response.status()).toBe(200);
    return params;
  }
}
