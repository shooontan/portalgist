import reducer, { authInitialState } from './authReducer';
import {
  logoutUserAsyncAction,
  loginUserAsyncAction,
  setAccessTokenAction,
} from '~/actions/authAction';

const userName = 'testuser';
const userId = '123456789';
const photoUrl = 'https://example.com/photo.jpg';
const accessToken = '123456789';
const error = {
  code: 400,
  message: 'error!!!',
};

test('default state', () => {
  const state = reducer(undefined, {
    type: 'UNKNOWN',
  });
  expect(state).toBe(authInitialState);
});

test('success logout', () => {
  const state = reducer(
    {
      ...authInitialState,
      login: true,
      userName,
      error,
    },
    logoutUserAsyncAction.done({
      params: {},
      result: {},
    })
  );
  expect(state.login).toBe(false);
  expect(state.userName).toBe('');
  expect(state.error).toBeNull();
});

test('loading true', () => {
  const state = reducer(
    {
      ...authInitialState,
      loading: false,
    },
    loginUserAsyncAction.started({})
  );
  expect(state.loading).toBe(true);
});

test('success login', () => {
  const state = reducer(
    {
      ...authInitialState,
      login: false,
    },
    loginUserAsyncAction.done({
      params: {},
      result: {
        userName,
        userId,
        photoUrl,
      },
    })
  );
  expect(state.login).toBe(true);
  expect(state.userName).toBe(userName);
  expect(state.error).toBeNull();
});

test('failed login', () => {
  const state = reducer(
    authInitialState,
    loginUserAsyncAction.failed({
      params: {},
      error,
    })
  );
  expect(state.login).toBe(false);
  expect(state.error).toEqual(error);
});

test('set access token', () => {
  const state = reducer(
    authInitialState,
    setAccessTokenAction({
      accessToken,
    })
  );
  expect(state.accessToken).toBe(accessToken);
});
