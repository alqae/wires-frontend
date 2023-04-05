import * as fromModels from '@app/models';

export interface MessagesState {
  isLoading: boolean;
  error?: string;
  allMessages?: fromModels.Message[];
  myMessages?: fromModels.Message[];
}

export const initialState: MessagesState = {
  isLoading: false,
};
