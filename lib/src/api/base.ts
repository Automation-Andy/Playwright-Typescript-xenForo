import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class ApiBase {
  constructor(private readonly _request: APIRequestContext) {}

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
}
