export interface ThreadData {
  title: string;
  message: string;
  id: number;
}

export interface ThreadPollData extends ThreadData {
  question: string;
  possibleResponses: string[];
}
