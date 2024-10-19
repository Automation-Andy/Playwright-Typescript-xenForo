import { ApiBase } from '@api/base';
import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { APIThreadData } from './interfaces/threadData';
import { RequestOptions } from 'https';

export class Threads extends ApiBase {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async create(params: APIThreadData, body?: RequestOptions): Promise<APIThreadData> {
    const response = await this.request('post', 'threads/', params, body);
    expect(response.status()).toBe(200);

    const data = await response.json();
    params.id = parseInt(data.thread.thread_id);
    return params;
  }

  async delete(threadId: number, permanentlyDelete = false): Promise<APIResponse> {
    const params = {
      hard_delete: permanentlyDelete,
      reason: 'Test',
      starter_alert: false,
      starter_alert_reason: 'no reason',
    };

    const response = await this.request('delete', `threads/${threadId}`, params);
    expect(response.status()).toBe(200);
    return response;
  }
}

export enum ThreadType {
  Discussion = 'discussion',
  Poll = 'poll',
}
