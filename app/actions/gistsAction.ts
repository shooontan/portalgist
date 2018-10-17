import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import octokit, {
  GistsGetAllResponse,
  GistGetResponseFiles,
  GistGetResponseHistory,
  GistGetResponseForks,
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
  },
  { code: number; message: string }
>('FETCH_GIST_ASYNC');

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
    const { files, forks, history } = data;
    dispatch(
      fetchGistAsyncAction.done({
        params: {
          gistId,
        },
        result: {
          files,
          forks,
          history,
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
