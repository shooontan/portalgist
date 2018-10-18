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
  GistGetResponseOwner,
} from '~/libs/octokit';
import Layout from '~/components/Layout';
import getQuery from '~/helpers/getQuery';

interface Props {
  isServer: boolean;
  query: {
    id: string;
  };
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  history: GistGetResponseHistory;
  owner: GistGetResponseOwner;
  auth: RootState['auth'];
  error: Error | null;
  dispatch: ThunkDispatch<any, any, any>;
}

class EditPage extends React.PureComponent<Props> {
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
    const { isServer, dispatch } = this.props;
    const { id } = getQuery();
    if (isServer && typeof id === 'string') {
      dispatch(fetchGistAction(id));
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

    return (
      <Layout>
        <div>{Gists}</div>
      </Layout>
    );
  }
}

export default connect((state: RootState) => ({
  auth: state.auth,
  files: state.gists.gist.files,
  forks: state.gists.gist.forks,
  history: state.gists.gist.history,
  owner: state.gists.gist.owner,
}))(EditPage);