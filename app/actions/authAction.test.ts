import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as act from './authAction';

const mockStore = configureStore([thunk]);

test('should create logout.done action', () => {
  const store = mockStore({});
  store.dispatch(act.logoutUserAsyncAction.done({ params: {}, result: {} }));
  const actions = store.getActions();
  const expected = {
    type: act.logoutUserAsyncAction.done.type,
    payload: {
      params: {},
      result: {},
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create login.started action', () => {
  const store = mockStore({});
  store.dispatch(act.loginUserAsyncAction.started({}));
  const actions = store.getActions();
  const expected = {
    type: act.loginUserAsyncAction.started.type,
    payload: {},
  };
  expect(actions[0]).toEqual(expected);
});

test('should create login.done action', () => {
  const userName = 'username';
  const userId = 'userid';
  const photoUrl = 'https://example.com/photo.jpg';
  const store = mockStore({});
  store.dispatch(
    act.loginUserAsyncAction.done({
      params: {},
      result: {
        userName,
        userId,
        photoUrl,
      },
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.loginUserAsyncAction.done.type,
    payload: {
      params: {},
      result: {
        userName,
        userId,
        photoUrl,
      },
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create login.failed action', () => {
  const error = {
    code: 400,
    message: 'error',
  };
  const store = mockStore({});
  store.dispatch(
    act.loginUserAsyncAction.failed({
      params: {},
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.loginUserAsyncAction.failed.type,
    payload: {
      params: {},
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});
