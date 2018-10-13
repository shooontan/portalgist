import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  logoutUserAsyncAction,
  loginUserAsyncAction,
} from '~/actions/authAction';

export interface AuthState {
  login: boolean;
  loading: boolean;
  userName: string;
}

export const authInitialState: AuthState = {
  login: false,
  loading: false,
  userName: '',
};

const authReducer = reducerWithInitialState(authInitialState)
  .case(logoutUserAsyncAction.done, state => ({
    ...state,
    login: false,
    userName: '',
  }))
  .case(loginUserAsyncAction.started, state => ({
    ...state,
    loading: true,
  }))
  .case(loginUserAsyncAction.done, (state, payload) => ({
    ...state,
    loading: false,
    login: true,
    userName: payload.result.userName,
  }));

export default authReducer;
