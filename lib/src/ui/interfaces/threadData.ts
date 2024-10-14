import { ThreadType } from '@api/threads';

export interface ThreadData {
  title: string;
  message: string;
  type: ThreadType;
  sticky: boolean;
  id: number;
}

export interface ThreadPollData extends ThreadData {
  question: string;
  possibleResponses: string[];
}
