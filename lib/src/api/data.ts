import { simpleFaker } from '@faker-js/faker';
import { ThreadType } from './threads';
import { APIThreadData } from './interfaces/threadData';

export class Data {
  randomThreadData(nodeId: number, sticky: boolean, locked: boolean): APIThreadData {
    return {
      node_id: nodeId,
      title: simpleFaker.string.alphanumeric({ length: { min: 5, max: 30 } }),
      message: simpleFaker.string.alphanumeric({ length: { min: 5, max: 100 } }),
      type: ThreadType.Discussion,
      sticky: sticky,
      discussion_open: !locked,
      id: 0,
    };
  }
}
