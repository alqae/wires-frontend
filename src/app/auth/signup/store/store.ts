export interface SignUpState {
  isLoading: boolean;
  error?: string;
}

export const initialState: SignUpState = {
  isLoading: false,
};
