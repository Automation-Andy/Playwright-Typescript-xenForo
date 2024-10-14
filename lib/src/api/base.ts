import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test';
import { RequestBody } from './interfaces/threadData';

export abstract class ApiBase {
  constructor(
    private readonly _request: APIRequestContext,
    private readonly _page: Page,
  ) {}

  async request(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    endpoint: string,
    params = null,
    body?: RequestBody,
  ): Promise<APIResponse> {
    let bodyData = null;
    if (params) bodyData = JSON.stringify(body);

    return await this._request[method](`api/${endpoint}`, {
      headers: { 'XF-Api-Key': process.env.ADMIN_API_KEY, 'content-type': 'application/json' },
      params: params,
      data: bodyData,
    });
  }

  async waitForUrlStatus(url: string, status: number): Promise<void> {
    await expect(async () => {
      console.log(`wait for url: ${url}`);
      const response = await this._request.get(url);
      expect(response.status()).toBe(status);
    }).toPass({
      intervals: [100, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 5000, 10000],
      timeout: 10_000,
    });
  }
}
