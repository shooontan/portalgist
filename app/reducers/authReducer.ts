import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  logoutUserAsyncAction,
  loginUserAsyncAction,
  setAccessTokenAction,
} from '~/actions/authAction';

export interface AuthState {
  login: boolean;
  loading: boolean;
  userName: string;
  userId: string;
  photoUrl: string;
  accessToken: string;
  error: {
    code: number;
    message: string;
  } | null;
}

export const authInitialState: AuthState = {
  login: false,
  loading: false,
  userName: '',
  userId: '',
  photoUrl: '',
  accessToken: '',
  error: null,
};

const authReducer = reducerWithInitialState(authInitialState)
  .case(logoutUserAsyncAction.done, state => ({
    ...state,
    ...authInitialState,
  }))
  .case(loginUserAsyncAction.started, state => ({
    ...state,
    loading: true,
    error: null,
  }))
  .case(loginUserAsyncAction.done, (state, { result }) => ({
    ...state,
    loading: false,
    login: true,
    userName: result.userName,
    userId: result.userId,
    photoUrl: result.photoUrl,
    error: null,
  }))
  .case(loginUserAsyncAction.failed, (state, { error }) => ({
    ...state,
    login: false,
    error: {
      code: error.code,
      message: error.message,
    },
  }))
  .case(setAccessTokenAction, (state, payload) => ({
    ...state,
    accessToken: payload.accessToken,
  }));

export default authReducer;
