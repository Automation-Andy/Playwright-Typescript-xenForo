import { Threads } from '@api/threads';
import { APIRequestContext, Page } from '@playwright/test';
import { Nodes } from '@api/nodes';
import { Users } from '@api/users';

export class Api {
  constructor(
    private readonly _request: APIRequestContext,
    private readonly _page: Page,
  ) {}
  threads = new Threads(this._request, this._page);
  nodes = new Nodes(this._request, this._page);
  users = new Users(this._request, this._page);
}
