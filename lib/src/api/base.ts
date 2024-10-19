/* eslint-disable @typescript-eslint/no-explicit-any */
import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class ApiBase {
  constructor(private readonly _request: APIRequestContext) {}

  async request(
    method: 'get' | 'post' | 'delete',
    endpoint: string,
    params?: RequestBody,
    body?: RequestBody,
  ): Promise<APIResponse> {
    let bodyData = null;
    if (body) bodyData = JSON.stringify(body);

    return await this._request[method](`api/${endpoint}`, {
      headers: { 'XF-Api-Key': process.env.ADMIN_API_KEY, 'content-type': 'application/json' },
      params: params,
      data: bodyData,
    });
  }
}

export type RequestBody = Record<string, any>;
