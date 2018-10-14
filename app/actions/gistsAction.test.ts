import { GistsGetPublicResponse } from '@octokit/rest';
import * as act from './gistsAction';

test('should create fetchGists.started action', () => {
  const expected = {
    type: act.fetchGistsAsyncAction.started.type,
    payload: {},
  };
  expect(act.fetchGistsAsyncAction.started({})).toEqual(expected);
});

test('should create fetchGists.done action', () => {
  const data = [] as GistsGetPublicResponse;
  const expected = {
    type: act.fetchGistsAsyncAction.done.type,
    payload: {
      params: {},
      result: {
        data,
      },
    },
  };
  expect(
    act.fetchGistsAsyncAction.done({
      params: {},
      result: {
        data,
      },
    })
  ).toEqual(expected);
});

test('should create fetchGists.failed action', () => {
  const error = {
    code: 400,
    message: 'error!!!',
  };
  const expected = {
    type: act.fetchGistsAsyncAction.failed.type,
    payload: {
      params: {},
      error,
    },
    error: true,
  };
  expect(
    act.fetchGistsAsyncAction.started({
      params: {},
      error,
    })
  ).toEqual(expected);
});
