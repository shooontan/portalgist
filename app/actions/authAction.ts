import actionCreatorFactory from 'typescript-fsa';

const AUTH_PREFIX = '@@AUTH';
const actionCreator = actionCreatorFactory(AUTH_PREFIX);

// logout action
export const logoutUser = actionCreator<{ login: boolean }>('LOGOUT_USER');
export const logoutUserAction = logoutUser({
  login: false,
});

// login async action
export const loginUserAsyncAction = actionCreator.async<
  {},
  { userName: string },
  { code: number }
>('LOGIN_USER_ASYNC');
