import { Threads } from '@api/threads';
import { APIRequestContext } from '@playwright/test';

export class Api {
  constructor(private readonly _request: APIRequestContext) {}

  threads = new Threads(this._request);
}
