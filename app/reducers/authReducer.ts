import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { logoutUser, loginUserAsyncAction } from '~/actions/authAction';

interface AuthInitialState {
  login: boolean;
  loading: boolean;
  userName: string;
}

export const authInitialState: AuthInitialState = {
  login: false,
  loading: false,
  userName: '',
};

const authReducer = reducerWithInitialState(authInitialState)
  .case(logoutUser, (state, payload) => ({ ...state, login: payload.login }))
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
