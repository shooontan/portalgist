import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchGistsAsyncAction,
  fetchGistAsyncAction,
  fetchPublicGistsAsyncAction,
} from '~/actions/gistsAction';
import {
  GistsGetAllResponseItem,
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
} from '~/libs/octokit';

export interface GistsState {
  gists: {
    [key: string]: GistsGetAllResponseItem;
  };
  gist: {
    files: GistGetResponseFiles;
    forks: GistGetResponseForks;
    history: GistGetResponseHistory;
  };
  timeline: string[];
  loading: boolean;
  fetched_at: number;
  error: {
    code: number;
    message: string;
  } | null;
}

export const gistsInitialState: GistsState = {
  gists: {},
  gist: {
    files: {},
    forks: [],
    history: [],
  },
  timeline: [],
  loading: false,
  fetched_at: 0,
  error: null,
};

const gistsReducer = reducerWithInitialState(gistsInitialState)
  .cases(
    [
      fetchGistsAsyncAction.started,
      fetchPublicGistsAsyncAction.started,
      fetchGistAsyncAction.started,
    ],
    state => ({
      ...state,
      loading: true,
    })
  )
  .cases(
    [fetchGistsAsyncAction.done, fetchPublicGistsAsyncAction.done],
    (state, { result }) => {
      const { data } = result;
      let gists = {};

      // normalize
      const timeline = data.map(gist => {
        const { id } = gist;
        gists = {
          ...gists,
          [id]: gist,
        };
        return id;
      });

      return {
        ...state,
        gists,
        timeline,
        loading: false,
        error: null,
      };
    }
  )
  .cases(
    [fetchGistsAsyncAction.failed, fetchPublicGistsAsyncAction.failed],
    (state, { error }) => ({
      ...state,
      loading: false,
      error: {
        code: error.code,
        message: error.message,
      },
    })
  )
  .case(fetchGistAsyncAction.done, (state, { result }) => {
    const { files, forks, history } = result;
    return {
      ...state,
      gist: {
        files,
        forks,
        history,
      },
    };
  });

export default gistsReducer;
