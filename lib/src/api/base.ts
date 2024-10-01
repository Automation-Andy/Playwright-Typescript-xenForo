import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test';

export abstract class ApiBase {
  constructor(
    private readonly _request: APIRequestContext,
    private readonly _page: Page,
  ) {}

  async request(
    method: 'get' | 'post' | 'patch' | 'put' | 'delete',
    endpoint: string,
    body = null,
  ): Promise<APIResponse> {
    return await this._request[method](`api/${endpoint}`, {
      headers: { 'XF-Api-Key': process.env.ADMIN_API_KEY },
      params: body,
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
