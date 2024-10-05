import { ApiBase } from '@api/base';
import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test';

export class Threads extends ApiBase {
  constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }

  async create(
    parentNodeId: number,
    title: string,
    message: string,
    type: DiscussionType,
    sticky: boolean,
  ): Promise<ThreadID> {
    const params = {
      node_id: parentNodeId,
      title: title,
      message: message,
      discussion_type: type,
      sticky: sticky,
    };

    const response = await this.request('post', 'threads/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    return parseInt(data.thread.thread_id);
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

export enum DiscussionType {
  Discussion = 'discussion',
  Poll = 'poll',
}

type ThreadID = number;
