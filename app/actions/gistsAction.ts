import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import octokit, { GistsGetAllResponse } from '~/libs/octokit';

const GIST_PREFIX = '@@GIST';
const actionCreator = actionCreatorFactory(GIST_PREFIX);

// get gist resouce async action
export const fetchGistsAsyncAction = actionCreator.async<
  {},
  { data: GistsGetAllResponse },
  { code: number; message: string }
>('FETCH_GISTS_ASYNC');

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
    dispatch(
      fetchGistsAsyncAction.failed({
        params: {},
        error: {
          code: 400,
          message: error.toString(),
        },
      })
    );
  }
};
