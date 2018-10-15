import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { fetchGistsAsyncAction } from '~/actions/gistsAction';
import { GistsGetAllResponseItem } from '~/libs/octokit';

export interface GistsState {
  gists: {
    [key: string]: GistsGetAllResponseItem;
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
  timeline: [],
  loading: false,
  fetched_at: 0,
  error: null,
};

const gistsReducer = reducerWithInitialState(gistsInitialState)
  .case(fetchGistsAsyncAction.started, state => ({
    ...state,
    loading: true,
    fetched_at: new Date().getTime(),
  }))
  .case(fetchGistsAsyncAction.done, (state, { result }) => {
    const { data } = result;
    const gists = {};
    const timeline = [];

    // normalize
    data.forEach(item => {
      const { id } = item;
      gists[id] = item;
      timeline.push(id);
    });

    return {
      ...state,
      gists,
      timeline,
      loading: false,
      error: null,
    };
  })
  .case(fetchGistsAsyncAction.failed, (state, { error }) => ({
    ...state,
    loading: false,
    error: {
      code: error.code,
      message: error.message,
    },
  }));

export default gistsReducer;
