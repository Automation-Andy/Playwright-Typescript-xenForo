import { APIRequestContext, APIResponse, expect, Page } from '@playwright/test';
import { ApiBase } from '@api/base';

export class Nodes extends ApiBase {
  constructor(request: APIRequestContext, page: Page) {
    super(request, page);
  }

  async create(parentNodeId: number | null, type: NodeType, title: string, wait = false): Promise<Node> {
    const params = {
      node_type_id: type.valueOf(),
      'node[title]': title,
      'node[parent_node_id]': parentNodeId,
    };

    const response = await this.request('post', 'nodes/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    if (wait) await this.waitForUrlStatus(data.node.view_url, 200);
    return { id: data.node.node_id, url: data.node.view_url };
  }

  async delete(nodeId: number, deleteChildren: boolean): Promise<APIResponse> {
    const params = {
      delete_children: deleteChildren,
    };

    const response = await this.request('delete', `nodes/${nodeId}`, params);

    expect(response.status()).toBe(200);
    return response;
  }

  async get(nodeId: number): Promise<Node> {
    const response = await this.request('get', `nodes/${nodeId}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    return { id: data.node.node_id, url: data.node.view_url };
  }
}

export enum NodeType {
  Category = 'Category',
  Forum = 'Forum',
  Link = 'LinkForum',
}

export interface Node {
  id: number;
  url: string;
}
