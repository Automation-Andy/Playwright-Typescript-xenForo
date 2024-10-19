import { APIRequestContext, APIResponse, expect } from '@playwright/test';
import { ApiBase } from '@api/base';

export class Nodes extends ApiBase {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async createCategory(title: string): Promise<NodeInfo> {
    const params = {
      node_type_id: NodeType.Category.valueOf(),
      'node[title]': title,
      'node[parent_node_id]': 0,
    };

    const response = await this.request('post', 'nodes/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    return { id: data.node.node_id, title: title, url: data.node.view_url };
  }

  async createForum(parentNodeId: number | null, type: NodeType, title: string): Promise<NodeInfo> {
    const params = {
      node_type_id: type.valueOf(),
      'node[title]': title,
      'node[parent_node_id]': parentNodeId,
    };

    const response = await this.request('post', 'nodes/', params);
    expect(response.status()).toBe(200);

    const data = await response.json();
    return { id: data.node.node_id, title: title, url: data.node.view_url };
  }

  async delete(nodeId: number, deleteChildren: boolean): Promise<APIResponse> {
    const params = {
      delete_children: deleteChildren,
    };

    const response = await this.request('delete', `nodes/${nodeId}`, params);

    expect(response.status()).toBe(200);
    return response;
  }

  async get(nodeId: number): Promise<NodeInfo> {
    const response = await this.request('get', `nodes/${nodeId}`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    return { id: data.node.node_id, title: data.node.title, url: data.node.view_url };
  }
}

export enum NodeType {
  Category = 'Category',
  Forum = 'Forum',
  Link = 'LinkForum',
}

export interface NodeInfo {
  id: number;
  title: string;
  url: string;
}
