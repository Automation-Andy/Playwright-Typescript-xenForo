/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThreadType } from '@api/threads';

export interface APIThreadData {
  node_id: number;
  title: string;
  message: string;
  type: ThreadType;
  id: number;
}

export interface ThreadPollData extends APIThreadData {
  question: string;
  possibleResponses: string[];
}
