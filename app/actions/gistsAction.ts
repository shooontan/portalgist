import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import octokit, {
  GistsGetAllResponse,
  GistGetResponseFiles,
  GistGetResponseHistory,
  GistGetResponseForks,
  GistGetResponseOwner,
} from '~/libs/octokit';

const GIST_PREFIX = '@@GIST';
const actionCreator = actionCreatorFactory(GIST_PREFIX);

// get gists resouce async action
export const fetchGistsAsyncAction = actionCreator.async<
  {},
  { data: GistsGetAllResponse },
  { code: number; message: string }
>('FETCH_GISTS_ASYNC');

// get gist resouce async action
export const fetchGistAsyncAction = actionCreator.async<
  { gistId: string },
  {
    files: GistGetResponseFiles;
    forks: GistGetResponseForks;
    history: GistGetResponseHistory;
    owner: GistGetResponseOwner;
  },
  { code: number; message: string }
>('FETCH_GIST_ASYNC');

// get public gists resource async action
export const fetchPublicGistsAsyncAction = actionCreator.async<
  {},
  { data: GistsGetAllResponse },
  { code: number; message: string }
>('FETCH_PUBLIC_GISTS_ASYNC');

// get users gists resource async action
export const fetchUserGistsAsyncAction = actionCreator.async<
  { userName: string },
  { data: GistsGetAllResponse },
  { code: number; message: string }
>('FETCH_USER_GISTS_ASYNC');

export const fetchGistsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchGistsAsyncAction.started({}));

  // to-do fetch cache

  try {
    const { data } = await octokit.gists.getAll({});
    dispatch(
      fetchGistsAsyncAction.done({
        params: {},
        result: {
          data,
        },
      })
    );
  } catch (error) {
    const { code, message } = error;
    dispatch(
      fetchGistsAsyncAction.failed({
        params: {},
        error: {
          code,
          message,
        },
      })
    );
  }
};

export const fetchGistAction = (gistId: string) => async (
  dispatch: Dispatch
) => {
  dispatch(fetchGistAsyncAction.started({ gistId }));

  // to-do fetch cache

  try {
    const { data } = await octokit.gists.get({ gist_id: gistId });
    const { files, forks, history, owner } = data;
    dispatch(
      fetchGistAsyncAction.done({
        params: {
          gistId,
        },
        result: {
          files,
          forks,
          history,
          owner,
        },
      })
    );
  } catch (error) {
    const { code, message } = error;
    dispatch(
      fetchGistAsyncAction.failed({
        params: {
          gistId,
        },
        error: {
          code,
          message,
        },
      })
    );
  }
};

export const fetchPublicGistsAction = () => async (dispatch: Dispatch) => {
  dispatch(fetchPublicGistsAsyncAction.started({}));

  // to-do fetch cache

  try {
    const { data } = await octokit.gists.getPublic({});
    dispatch(
      fetchPublicGistsAsyncAction.done({
        params: {},
        result: {
          data,
        },
      })
    );
  } catch (error) {
    const { code, message } = error;
    dispatch(
      fetchPublicGistsAsyncAction.failed({
        params: {},
        error: {
          code,
          message,
        },
      })
    );
  }
};

export const fetchUserGistsAction = (userName: string) => async (
  dispatch: Dispatch
) => {
  dispatch(fetchUserGistsAsyncAction.started({ userName }));

  // to-do fetch cache

  try {
    const { data } = await octokit.gists.getForUser({ username: userName });
    dispatch(
      fetchUserGistsAsyncAction.done({
        params: {
          userName,
        },
        result: {
          data,
        },
      })
    );
  } catch (error) {
    const { code, message } = error;
    dispatch(
      fetchUserGistsAsyncAction.failed({
        params: {
          userName,
        },
        error: {
          code,
          message,
        },
      })
    );
  }
};
