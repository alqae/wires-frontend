import * as fromModels from '../models';

export interface SignUpInput {
  fullname: string;
  username: string;
  password: string;
  email: string;
}

export interface SignUpResponse extends fromModels.User {}

export interface SignInInput {
  username: string;
  password: string;
}

export interface SignInResponse {
  access_token: string;
  expire_in: string;
  message: string;
  status: boolean;
}
