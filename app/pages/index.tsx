import * as React from 'react';
import Link from 'next/link';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { loginUserAction, logoutUserAction } from '~/actions/authAction';
import { AuthState } from '~/reducers/authReducer';
import { GistsState } from '~/reducers/gistsReducer';
import Layout from '~/components/Layout';
import { fetchPublicGistsAction } from '~/actions/gistsAction';
import GistItem from '~/components/molecules/GistItem';

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  auth: AuthState;
  gists: GistsState;
  isServer: boolean;
}

class IndexPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;

    if (req) {
      return {
        isServer: true,
      };
    }

    await dispatch(fetchPublicGistsAction());

    return {
      isServer: false,
    };
  }

  componentDidMount() {
    const { dispatch, isServer } = this.props;
    if (isServer) {
      dispatch(fetchPublicGistsAction());
    }
  }

  handleLogin = () => {
    const { dispatch } = this.props;
    dispatch(loginUserAction());
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUserAction());
  };

  fetch = () => {
    const { dispatch } = this.props;
    dispatch(fetchPublicGistsAction());
  };

  render() {
    const GistItems = this.props.gists.timeline.map(gistId => {
      const gist = this.props.gists.gists[gistId];
      return <GistItem gist={gist} key={gistId} />;
    });

    return (
      <Layout>
        <h1>Hello {this.props.auth.userName} 👋</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
        {!this.props.auth.login && (
          <button onClick={this.handleLogin}>login</button>
        )}
        {this.props.auth.login && (
          <button onClick={this.handleLogout}>logout</button>
        )}
        <button onClick={this.fetch}>fetch</button>
        {GistItems}
      </Layout>
    );
  }
}

export default connect(state => state)(IndexPage);
