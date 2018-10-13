import * as React from 'react';
import Link from 'next/link';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loginUserAction, logoutUserAction } from '~/actions/authAction';
import { AuthState } from '~/reducers/authReducer';
import Layout from '~/components/Layout';

interface Props {
  dispatch: Dispatch;
  auth: AuthState;
}

class Index extends React.PureComponent<Props> {
  handleLogin = () => {
    const { dispatch } = this.props;
    loginUserAction(dispatch);
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    logoutUserAction(dispatch);
  };

  render() {
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
      </Layout>
    );
  }
}

export default connect(state => state)(Index);
