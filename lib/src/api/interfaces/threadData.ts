/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThreadType } from '@api/threads';

export interface RequestBody {
  [key: string]: any;
}

export interface APIThreadData {
  node_id: number;
  title: string;
  message: string;
  type: ThreadType;
  sticky: boolean;
  discussion_open: boolean;
  id: number;
}

export interface ThreadPollData extends APIThreadData {
  question: string;
  possibleResponses: string[];
}
