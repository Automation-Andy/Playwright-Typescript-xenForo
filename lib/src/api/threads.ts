import { ApiBase } from '@api/base';
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Threads extends ApiBase {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async create(forumNodeId: number, title: string, message: string): Promise<APIResponse> {
    const params = {
      node_id: forumNodeId,
      title: title,
      message: message,
      discussion_type: DiscussionType.Discussion,
    };

    const response = await this.request('post', 'threads/', params);
    expect(response.status()).toBe(200);
    return response;
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
