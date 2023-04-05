import * as fromModels from '@app/models';

export interface AuthState {
  isLoading: boolean;
  error?: string;
  token?: string;
  user?: fromModels.User;
}

export const initialState: AuthState = {
  isLoading: false,
};
