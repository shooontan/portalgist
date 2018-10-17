import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '~/reducers';
import GistItem from '~/components/molecules/GistItem';
import { fetchUserGistsAction } from '~/actions/gistsAction';
import {
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
} from '~/libs/octokit';
import Layout from '~/components/Layout';

type Dispatch = ThunkDispatch<any, any, any>;

interface Props {
  isServer: boolean;
  query: {
    name: string;
  };
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  error: Error | null;
  history: GistGetResponseHistory;
  gists: RootState['gists'];
  dispatch: Dispatch;
}

class UserPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, query, store } = Context;
    const { dispatch }: { dispatch: Dispatch } = store;
    const { name }: { name: string } = query;

    if (req) {
      return {
        isServer: true,
        query,
      };
    }

    await dispatch(fetchUserGistsAction(name));

    return {
      isServer: false,
      query,
    };
  }

  componentDidMount() {
    const {
      isServer,
      query: { name },
      dispatch,
    } = this.props;

    if (isServer) {
      dispatch(fetchUserGistsAction(name));
    }
  }

  render() {
    const GistItems = this.props.gists.timeline.map(gistId => {
      const gist = this.props.gists.gists[gistId];
      return <GistItem gist={gist} key={gistId} />;
    });

    return (
      <Layout>
        <div>{GistItems}</div>
      </Layout>
    );
  }
}

export default connect((state: RootState) => ({
  gists: state.gists,
}))(UserPage);
