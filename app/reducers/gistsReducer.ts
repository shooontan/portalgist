import { reducerWithInitialState } from 'typescript-fsa-reducers';
import {
  fetchGistsAsyncAction,
  fetchGistAsyncAction,
  fetchPublicGistsAsyncAction,
  fetchUserGistsAsyncAction,
  editGistContent,
  editGistDescription,
  patchEditGistAsyncAction,
  addGistAction,
} from '~/actions/gistsAction';
import {
  GistsGetAllResponseItem,
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
  GistGetResponseOwner,
} from '~/libs/octokit';

export interface GistsState {
  gists: {
    [key: string]: GistsGetAllResponseItem;
  };
  gist: {
    description: string;
    files: GistGetResponseFiles;
    forks: GistGetResponseForks;
    history: GistGetResponseHistory;
    owner: GistGetResponseOwner | null;
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
    description: '',
    files: {},
    forks: [],
    history: [],
    owner: null,
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
      fetchUserGistsAsyncAction.started,
      patchEditGistAsyncAction.started,
    ],
    state => ({
      ...state,
      loading: true,
      error: null,
    })
  )
  .cases(
    [
      fetchGistsAsyncAction.done,
      fetchPublicGistsAsyncAction.done,
      fetchUserGistsAsyncAction.done,
    ],
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
    [
      fetchGistsAsyncAction.failed,
      fetchPublicGistsAsyncAction.failed,
      fetchUserGistsAsyncAction.failed,
      patchEditGistAsyncAction.failed,
    ],
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
    const { description, files, forks, history, owner } = result;
    return {
      ...state,
      gist: {
        description,
        files,
        forks,
        history,
        owner,
      },
    };
  })
  .case(editGistContent, (state, { fileId, fileName, content }) => {
    const editFile = {
      ...state.gist.files[fileId],
      filename: fileName,
      content,
    };

    const editFiles = {
      ...state.gist.files,
      [fileId]: editFile,
    };

    const gist = {
      ...state.gist,
      files: editFiles,
    };

    return {
      ...state,
      gist,
    };
  })
  .case(editGistDescription, (state, { description }) => {
    const gist = {
      ...state.gist,
      description,
    };

    return {
      ...state,
      gist,
    };
  })
  .case(addGistAction, (state, { gistId }) => {
    const addFiles = {
      [gistId]: {
        filename: '',
        type: 'text/plain',
        language: 'Text',
        raw_url: '',
        size: 0,
        truncated: false,
        content: '',
      },
    };

    const addGist = {
      ...gistsInitialState.gist,
      files: addFiles,
    };

    return {
      ...state,
      gist: addGist,
    };
  });

export default gistsReducer;
