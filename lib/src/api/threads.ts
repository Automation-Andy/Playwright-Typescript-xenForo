import { ApiBase } from '@api/base';
import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class Threads extends ApiBase {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async deleteThread(threadId: number, permanentlyDelete = false): Promise<APIResponse> {
    interface body {
      hard_delete: boolean;
      reason: string;
      starter_alert: boolean;
      starter_alert_reason: string;
    }

    const bodyData: body = {
      hard_delete: permanentlyDelete,
      reason: 'Test',
      starter_alert: false,
      starter_alert_reason: '',
    };

    const response = await this.request('delete', `threads/${threadId}`, bodyData);
    expect(response.status()).toBe(200);
    return response;
  }
}
