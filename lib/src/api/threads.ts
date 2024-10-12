import { ApiBase } from '@api/base';
import { ThreadData } from '@interfaces/threadData';
import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test';

export class Threads extends ApiBase {
  constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }

  async create(parentNodeId: number, threadData: ThreadData): Promise<ThreadData> {
    const params = {
      node_id: parentNodeId,
      title: threadData.title,
      message: threadData.message,
      discussion_type: threadData.type,
      sticky: threadData.sticky,
    };

    const response = await this.request('post', 'threads/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    threadData.id = parseInt(data.thread.thread_id);
    return threadData;
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
