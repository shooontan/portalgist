import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '~/reducers';
import Gist from '~/components/molecules/Gist';
import { fetchGistAction } from '~/actions/gistsAction';
import {
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
} from '~/libs/octokit';

interface Props {
  isServer: boolean;
  query: {
    id: string;
  };
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  error: Error | null;
  history: GistGetResponseHistory;
  dispatch: ThunkDispatch<any, any, any>;
}

class GistPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, query, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;
    const { id }: { id: string } = query;

    if (req) {
      return {
        isServer: true,
        query,
      };
    }

    await dispatch(fetchGistAction(id));

    return {
      isServer: false,
      query,
    };
  }

  componentDidMount() {
    const { isServer, query, dispatch } = this.props;
    if (isServer) {
      dispatch(fetchGistAction(query.id));
    }
  }

  render() {
    const { files, error } = this.props;
    if (error || !files) {
      return <div>no gists data</div>;
    }

    const Gists = Object.keys(files).map(fileName => {
      const file = files[fileName];
      return <Gist file={file} key={fileName} />;
    });

    return <div>{Gists}</div>;
  }
}

export default connect((state: RootState) => ({
  files: state.gists.gist.files,
  forks: state.gists.gist.forks,
  history: state.gists.gist.history,
}))(GistPage);