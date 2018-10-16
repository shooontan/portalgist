import { Dispatch } from 'redux';
import actionCreatorFactory from 'typescript-fsa';
import octokit, { GistsGetAllResponse } from '~/libs/octokit';
import { rootState } from '~/stores/createStore';

const GIST_PREFIX = '@@GIST';
const actionCreator = actionCreatorFactory(GIST_PREFIX);

// get gist resouce async action
export const fetchGistsAsyncAction = actionCreator.async<
  {},
  { data: GistsGetAllResponse },
  { code: number; message: string }
>('FETCH_GISTS_ASYNC');

export const fetchGistsAction = () => async (
  dispatch: Dispatch,
  getState: () => typeof rootState
) => {
  dispatch(fetchGistsAsyncAction.started({}));

  const { auth } = getState();
  const { accessToken } = auth;
  if (accessToken) {
    // set access token from redux state
    octokit.authenticate({
      type: 'token',
      token: accessToken,
    });
  } else {
    // reflesh token
    octokit.authenticate(undefined);
  }

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
