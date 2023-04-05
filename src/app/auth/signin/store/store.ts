export interface SignInState {
  isLoading: boolean;
  error?: string;
}

export const initialState: SignInState = {
  isLoading: false,
};
