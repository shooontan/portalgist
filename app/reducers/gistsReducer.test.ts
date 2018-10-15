import reducer, { gistsInitialState } from './gistsReducer';
import { fetchGistsAsyncAction } from '~/actions/gistsAction';

const gistsResponse = [
  {
    url: 'https://api.github.com/gists/dc9db743055754d0e9076826d79d4f8f',
    forks_url:
      'https://api.github.com/gists/dc9db743055754d0e9076826d79d4f8f/forks',
    commits_url:
      'https://api.github.com/gists/dc9db743055754d0e9076826d79d4f8f/commits',
    id: 'dc9db743055754d0e9076826d79d4f8f',
    node_id: 'MDQ6R2lzdGRjOWRiNzQzMDU1NzU0ZDBlOTA3NjgyNmQ3OWQ0Zjhm',
    git_pull_url:
      'https://gist.github.com/dc9db743055754d0e9076826d79d4f8f.git',
    git_push_url:
      'https://gist.github.com/dc9db743055754d0e9076826d79d4f8f.git',
    html_url: 'https://gist.github.com/dc9db743055754d0e9076826d79d4f8f',
    files: {
      private: {
        filename: 'private',
        type: 'text/plain',
        language: null,
        raw_url:
          'https://gist.githubusercontent.com/shooontan/dc9db743055754d0e9076826d79d4f8f/raw/315559ed5b1196bc7cb44c17f416a215242edb63/private',
        size: 10,
      },
    },
    public: false,
    created_at: '2018-10-14T17:50:45Z',
    updated_at: '2018-10-14T17:50:45Z',
    description: '',
    comments: 0,
    user: null,
    comments_url:
      'https://api.github.com/gists/dc9db743055754d0e9076826d79d4f8f/comments',
    owner: {
      login: 'shooontan',
      id: 26014062,
      node_id: 'MDQ6VXNlcjI2MDE0MDYy',
      avatar_url: 'https://avatars0.githubusercontent.com/u/26014062?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/shooontan',
      html_url: 'https://github.com/shooontan',
      followers_url: 'https://api.github.com/users/shooontan/followers',
      following_url:
        'https://api.github.com/users/shooontan/following{/other_user}',
      gists_url: 'https://api.github.com/users/shooontan/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/shooontan/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/shooontan/subscriptions',
      organizations_url: 'https://api.github.com/users/shooontan/orgs',
      repos_url: 'https://api.github.com/users/shooontan/repos',
      events_url: 'https://api.github.com/users/shooontan/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/shooontan/received_events',
      type: 'User',
      site_admin: false,
    },
    truncated: false,
  },
];

const error = {
  code: 400,
  message: 'error!!!',
};

test('default state', () => {
  const state = reducer(undefined, {
    type: 'UNKNOWN',
  });
  expect(state).toBe(gistsInitialState);
});

test('start fetch gists', () => {
  const state = reducer(
    {
      ...gistsInitialState,
      loading: false,
    },
    fetchGistsAsyncAction.started({})
  );
  expect(state.loading).toBe(true);
  expect(state.fetched_at).not.toBeLessThan(0);
  expect(state.error).toBeNull();
});

test('success fetch gists', () => {
  const state = reducer(
    {
      ...gistsInitialState,
      loading: true,
    },
    fetchGistsAsyncAction.done({
      params: {},
      result: {
        data: gistsResponse,
      },
    })
  );
  const gistId = gistsResponse[0].id;
  const expected = {
    [gistId]: gistsResponse[0],
  };
  expect(state.loading).toBe(false);
  expect(state.gists).toEqual(expected);
  expect(state.error).toBeNull();
});

test('failed fetch gists', () => {
  const state = reducer(
    {
      ...gistsInitialState,
      loading: true,
      error: null,
    },
    fetchGistsAsyncAction.failed({
      params: {},
      error,
    })
  );
  expect(state.loading).toBe(false);
  expect(state.error).toEqual(error);
});
