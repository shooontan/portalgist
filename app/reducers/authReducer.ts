import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  logoutUserAsyncAction,
  loginUserAsyncAction,
} from '~/actions/authAction';

export interface AuthState {
  login: boolean;
  loading: boolean;
  userName: string;
  error: {
    code: number;
    message: string;
  } | null;
}

export const authInitialState: AuthState = {
  login: false,
  loading: false,
  userName: '',
  error: null,
};

const authReducer = reducerWithInitialState(authInitialState)
  .case(logoutUserAsyncAction.done, state => ({
    ...state,
    login: false,
    userName: '',
    error: null,
  }))
  .case(loginUserAsyncAction.started, state => ({
    ...state,
    loading: true,
    error: null,
  }))
  .case(loginUserAsyncAction.done, (state, payload) => ({
    ...state,
    loading: false,
    login: true,
    userName: payload.result.userName,
    error: null,
  }))
  .case(loginUserAsyncAction.failed, (state, { error }) => ({
    ...state,
    login: false,
    error: {
      code: error.code,
      message: error.message,
    },
  }));

export default authReducer;
