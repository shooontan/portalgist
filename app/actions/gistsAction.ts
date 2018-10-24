import { Dispatch } from 'redux';
import Router from 'next/router';
import actionCreatorFactory from 'typescript-fsa';
import octokit, {
  GistsGetAllResponse,
  GistGetResponseFiles,
  GistGetResponseHistory,
  GistGetResponseForks,
  GistGetResponseOwner,
  GistPatchEditResponse,
  GistPostResponse,
} from '~/libs/octokit';
import { RootState } from '~/reducers';

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
    description: string;
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

// edit gist content
export const editGistContent = actionCreator<{
  fileId: string;
  fileName: string;
  content: string;
}>('EDIT_GIST_CONTENT');

// edit gist description
export const editGistDescription = actionCreator<{
  description: string;
}>('EDIT_GIST_DESCRIPTION');

// add new local gist
export const addGistAction = actionCreator<{
  gistId: string;
}>('ADD_GIST');

// post gist
export const postGistAsyncAction = actionCreator.async<
  {
    files: {
      [key: string]: {
        content: string;
        filename: string;
      };
    };
    description?: string;
    publicGist?: boolean;
  },
  {
    data: GistPostResponse;
  },
  {
    code: number;
    message: string;
  }
>('POST_GIST_ASYNC');

// patch edit gist
export const patchEditGistAsyncAction = actionCreator.async<
  {
    gistId: string;
    description?: string;
    files?: {
      [key: string]: {
        content: string;
        fileName: string;
      };
    };
  },
  { data: GistPatchEditResponse },
  { code: number; message: string }
>('PATCH_EDIT_GIST_ASYNC');

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
    const { description, files, forks, history, owner } = data;
    dispatch(
      fetchGistAsyncAction.done({
        params: {
          gistId,
        },
        result: {
          description: description || '',
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

export const patchEditGistAction = ({
  gistId,
  description,
  files,
}: {
  gistId: string;
  description?: string;
  files?: {
    [key: string]: {
      content: string;
      fileName: string;
    };
  };
}) => async (dispatch: Dispatch) => {
  dispatch(
    patchEditGistAsyncAction.started({
      gistId,
      description,
      files,
    })
  );

  // to-do fetch cache

  try {
    await octokit.gists.edit({
      gist_id: gistId,
      description,
      files,
    });

    // redirect
    Router.push({
      pathname: '/gists',
      query: { id: gistId },
    });
  } catch (error) {
    const { code, message } = error;
    dispatch(
      patchEditGistAsyncAction.failed({
        params: {
          gistId,
          description,
          files,
        },
        error: {
          code,
          message,
        },
      })
    );
  }
};

export const postGistAction = ({
  files,
  description,
  publicGist,
}: {
  files?: {
    [key: string]: {
      content: string;
      filename: string;
    };
  };
  description?: string;
  publicGist?: boolean;
}) => async (dispatch: Dispatch, getState: () => RootState) => {
  dispatch(
    postGistAsyncAction.started({
      files,
      description,
      publicGist,
    })
  );

  // to-do fetch cache

  try {
    const { data } = await octokit.gists.create({
      files,
      description,
      public: publicGist,
    });

    await dispatch(
      postGistAsyncAction.done({
        params: {
          files,
          description,
          publicGist,
        },
        result: {
          data,
        },
      })
    );

    const { auth } = getState();

    Router.push({
      pathname: '/user',
      query: {
        name: auth.userName,
      },
    });
  } catch (error) {
    const { code, message } = error;
    dispatch(
      postGistAsyncAction.failed({
        params: {
          files,
          description,
          publicGist,
        },
        error: {
          code,
          message,
        },
      })
    );
  }
};
