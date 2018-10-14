import * as React from 'react';
import Link from 'next/link';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { loginUserAction, logoutUserAction } from '~/actions/authAction';
import { AuthState } from '~/reducers/authReducer';
import { GistsState } from '~/reducers/gistsReducer';
import Layout from '~/components/Layout';
import styled from 'styled-components';
import { fetchGistsAction } from '~/actions/gistsAction';
import { AnyAction } from 'redux';

interface Props {
  dispatch: ThunkDispatch<void, void, AnyAction>;
  auth: AuthState;
  gists: GistsState;
}

class IndexPage extends React.PureComponent<Props> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGistsAction());
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
    dispatch(fetchGistsAction());
  };

  render() {
    const GistItems = this.props.gists.timeline.map(gistId => {
      const gist = this.props.gists.gists[gistId];
      return (
        <StyledItem href={gist.html_url} key={gist.id}>
          <div>
            <p>{gist.owner.login}</p>
            <img src={gist.owner.avatar_url} alt="" width="50" height="50" />
            <p>{gist.description}</p>
          </div>
        </StyledItem>
      );
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

const StyledItem = styled.a`
  margin: 1em;
  display: block;
  border: 1px solid #333;
`;
