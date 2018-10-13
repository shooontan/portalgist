import * as act from './authAction';

test('should create logout.started action', () => {
  const expectedStarted = {
    type: act.logoutUserAsyncAction.started.type,
    payload: {},
  };
  expect(act.logoutUserAsyncAction.started({})).toEqual(expectedStarted);
});

test('should create logout.done action', () => {
  const expectedDone = {
    type: act.logoutUserAsyncAction.done.type,
    payload: {
      params: {},
      result: {},
    },
  };
  expect(
    act.logoutUserAsyncAction.done({
      params: {},
      result: {},
    })
  ).toEqual(expectedDone);
});

test('should create login.started action', () => {
  const expectedStarted = {
    type: act.loginUserAsyncAction.started.type,
    payload: {},
  };
  expect(act.loginUserAsyncAction.started({})).toEqual(expectedStarted);
});

test('should create login.done action', () => {
  const userName = 'octocat';
  const expectedDone = {
    type: act.loginUserAsyncAction.done.type,
    payload: {
      params: {},
      result: {
        userName,
      },
    },
  };
  expect(
    act.loginUserAsyncAction.done({
      params: {},
      result: {
        userName,
      },
    })
  ).toEqual(expectedDone);
});

test('should create login.failed action', () => {
  const errorCode = 400;
  const expectedFailed = {
    type: act.loginUserAsyncAction.failed.type,
    payload: {
      params: {},
      error: {
        code: errorCode,
      },
    },
    error: true,
  };
  expect(
    act.loginUserAsyncAction.failed({
      params: {},
      error: {
        code: errorCode,
      },
    })
  ).toEqual(expectedFailed);
});
