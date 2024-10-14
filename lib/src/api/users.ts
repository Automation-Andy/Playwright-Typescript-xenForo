import { APIRequestContext, expect, Page } from '@playwright/test';
import { ApiBase } from '@api/base';
import { DataGeneration } from '@data/dataGeneration';
import { UserData } from '@interfaces/userData';
import { UserGroups } from '@globals/*';

export class Users extends ApiBase {
  private readonly _data = new DataGeneration();
  constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }

  async createRandomUser(): Promise<UserData> {
    const user = this._data.getRandomUsername();
    const params = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    const response = await this.request('post', 'users/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    user.id = parseInt(data.user.user_id);
    return user;
  }

  async createAutomationGroupUser(): Promise<UserData> {
    const user = this._data.getRandomUsername();
    const params = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    const body = {
      secondary_group_ids: [UserGroups.AutomationUsers],
    };

    const response = await this.request('post', 'users/', params, body);
    expect(response.status()).toBe(200);

    const data = await response.json();
    user.id = parseInt(data.user.user_id);
    return user;
  }

  async delete(id: number) {
    const response = await this.request('delete', `users/${id}`);
    expect(response.status()).toBe(200);
  }
}
