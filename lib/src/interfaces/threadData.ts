export interface ThreadData {
  title: string;
  message: string;
}

export interface ThreadPollData extends ThreadData {
  question: string;
  possibleResponses: string[];
}
