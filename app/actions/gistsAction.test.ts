import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { GistsGetAllResponse } from '~/libs/octokit';
import * as act from './gistsAction';

const gistId = 'abcdefgist';
const userName = 'username';
const mockStore = configureStore([thunk]);

test('should create fetchGists.started action', () => {
  const store = mockStore({});
  store.dispatch(act.fetchGistsAsyncAction.started({}));
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistsAsyncAction.started.type,
    payload: {},
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchGists.done action', () => {
  const store = mockStore({});
  const data = [] as GistsGetAllResponse;
  store.dispatch(
    act.fetchGistsAsyncAction.done({
      params: {},
      result: {
        data,
      },
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistsAsyncAction.done.type,
    payload: {
      params: {},
      result: {
        data,
      },
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchGists.failed action', () => {
  const store = mockStore({});
  const error = {
    code: 400,
    message: 'error!!!',
  };
  store.dispatch(
    act.fetchGistsAsyncAction.failed({
      params: {},
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistsAsyncAction.failed.type,
    payload: {
      params: {},
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchGist.started action', () => {
  const store = mockStore({});
  store.dispatch(act.fetchGistAsyncAction.started({ gistId }));
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistAsyncAction.started.type,
    payload: {
      gistId,
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchGist.done action', () => {
  const result = {
    description: '',
    files: {},
    forks: [],
    history: [],
    owner: null,
  };
  const store = mockStore({});
  store.dispatch(
    act.fetchGistAsyncAction.done({
      params: {
        gistId,
      },
      result,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistAsyncAction.done.type,
    payload: {
      params: { gistId },
      result,
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchGist.failed action', () => {
  const store = mockStore({});
  const error = {
    code: 400,
    message: 'error!!!',
  };
  store.dispatch(
    act.fetchGistAsyncAction.failed({
      params: {
        gistId,
      },
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchGistAsyncAction.failed.type,
    payload: {
      params: { gistId },
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchPublicGists.started action', () => {
  const store = mockStore({});
  store.dispatch(act.fetchPublicGistsAsyncAction.started({}));
  const actions = store.getActions();
  const expected = {
    type: act.fetchPublicGistsAsyncAction.started.type,
    payload: {},
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchPublicGists.done action', () => {
  const store = mockStore({});
  const data = [] as GistsGetAllResponse;
  store.dispatch(
    act.fetchPublicGistsAsyncAction.done({
      params: {},
      result: {
        data,
      },
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchPublicGistsAsyncAction.done.type,
    payload: {
      params: {},
      result: {
        data,
      },
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchPublicGists.failed action', () => {
  const store = mockStore({});
  const error = {
    code: 400,
    message: 'error!!!',
  };
  store.dispatch(
    act.fetchPublicGistsAsyncAction.failed({
      params: {},
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchPublicGistsAsyncAction.failed.type,
    payload: {
      params: {},
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchUserGists.started action', () => {
  const store = mockStore({});
  store.dispatch(act.fetchUserGistsAsyncAction.started({ userName }));
  const actions = store.getActions();
  const expected = {
    type: act.fetchUserGistsAsyncAction.started.type,
    payload: {
      userName,
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchUserGists.done action', () => {
  const store = mockStore({});
  const data = [] as GistsGetAllResponse;
  store.dispatch(
    act.fetchUserGistsAsyncAction.done({
      params: {
        userName,
      },
      result: {
        data,
      },
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchUserGistsAsyncAction.done.type,
    payload: {
      params: {
        userName,
      },
      result: {
        data,
      },
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create fetchUserGists.failed action', () => {
  const store = mockStore({});
  const error = {
    code: 400,
    message: 'error!!!',
  };
  store.dispatch(
    act.fetchUserGistsAsyncAction.failed({
      params: {
        userName,
      },
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.fetchUserGistsAsyncAction.failed.type,
    payload: {
      params: {
        userName,
      },
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});

test('should create addGistAction action', () => {
  const store = mockStore({});
  store.dispatch(act.addGistAction({ gistId }));
  const actions = store.getActions();
  const expected = {
    type: act.addGistAction.type,
    payload: {
      gistId,
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create postGistAsyncAction.started action', () => {
  const files = {
    uid: {
      content: 'content',
      filename: 'filename',
    },
  };
  const store = mockStore({});
  store.dispatch(act.postGistAsyncAction.started({ files }));
  const actions = store.getActions();
  const expected = {
    type: act.postGistAsyncAction.started.type,
    payload: {
      files,
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create postGistAsyncAction.done action', () => {
  const files = {
    uid: {
      content: 'content',
      filename: 'filename',
    },
  };
  const store = mockStore({});
  const data = {} as any;
  store.dispatch(
    act.postGistAsyncAction.done({
      params: {
        files,
      },
      result: {
        data,
      },
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.postGistAsyncAction.done.type,
    payload: {
      params: {
        files,
      },
      result: {
        data,
      },
    },
  };
  expect(actions[0]).toEqual(expected);
});

test('should create postGistAsyncAction.failed action', () => {
  const files = {
    uid: {
      content: 'content',
      filename: 'filename',
    },
  };
  const store = mockStore({});
  const error = {
    code: 400,
    message: 'error!!!',
  };
  store.dispatch(
    act.postGistAsyncAction.failed({
      params: {
        files,
      },
      error,
    })
  );
  const actions = store.getActions();
  const expected = {
    type: act.postGistAsyncAction.failed.type,
    payload: {
      params: {
        files,
      },
      error,
    },
    error: true,
  };
  expect(actions[0]).toEqual(expected);
});

// test('success fetch gists async action', () => {
//   const store = mockStore({});
//   // @ts-ignore
//   store.dispatch(act.fetchGistsAction()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual(act.fetchGistsAsyncAction.started({}));
//     expect(actions[1]).toEqual(
//       act.fetchGistsAsyncAction.done({
//         params: {},
//         result: {
//           data: [],
//         },
//       })
//     );
//   });
// });

// test('failed fetch gists async action', () => {
//   const store = mockStore({});
//   // @ts-ignore
//   store.dispatch(act.fetchGistsAction()).then(() => {
//     const actions = store.getActions();
//     expect(actions[0]).toEqual(act.fetchGistsAsyncAction.started({}));
//     expect(actions[1]).toEqual(
//       act.fetchGistsAsyncAction.failed({
//         params: {},
//         error: {
//           code: 400,
//           message: 'error!!!',
//         },
//       })
//     );
//   });
// });
