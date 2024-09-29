import { Threads } from '@api/threads';
import { APIRequestContext } from '@playwright/test';
import { Nodes } from '@api/nodes';

export class Api {
  constructor(private readonly _request: APIRequestContext) {}
  threads = new Threads(this._request);
  nodes = new Nodes(this._request);
}
