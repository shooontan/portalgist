import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import firebase from '~/libs/firebase';

const AUTH_PREFIX = '@@AUTH';
const actionCreator = actionCreatorFactory(AUTH_PREFIX);

// logout async action
export const logoutUserAsyncAction = actionCreator.async<{}, {}>(
  'LOGOUT_USER_ASYNC'
);

// logout action
export const logoutUserAction = async (dispatch: Dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch(logoutUserAsyncAction.done({ params: {}, result: {} }));
  } catch (__) {
    // to-do: logout error handle
  }
};

// login async action
export const loginUserAsyncAction = actionCreator.async<
  {},
  { userName: string },
  { code: number }
>('LOGIN_USER_ASYNC');

// login action
export const loginUserAction = (dispatch: Dispatch) => {
  // login start
  dispatch(loginUserAsyncAction.started({}));
  const provider = new firebase.auth.GithubAuthProvider();
  // access scope for gist
  provider.addScope('gist');
  // go to login page on firebase
  firebase.auth().signInWithRedirect(provider);
};
