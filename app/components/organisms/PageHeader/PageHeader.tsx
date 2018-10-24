import * as React from 'react';
import Link from 'next/link';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '~/reducers';
import { loginUserAction, logoutUserAction } from '~/actions/authAction';
import TextLink from '~/components/atoms/TextLink';
import Icon from '~/components/atoms/Icon';
import Loading from '~/components/atoms/Loading';

interface Breadcrumb {
  item: string;
  href: string;
}

interface Props {
  breadcrumb: Breadcrumb[];
  auth: RootState['auth'];
  dispatch: ThunkDispatch<any, any, any>;
}

class PageHeader extends React.PureComponent<Props> {
  handleLogin = () => {
    const { dispatch } = this.props;
    dispatch(loginUserAction());
  };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUserAction());
  };

  getBreadcrumb = () => {
    const { breadcrumb } = this.props;

    // top page
    const fullBreadcrumb = [
      {
        item: 'PortalGist',
        href: '/',
      },
      ...breadcrumb,
    ];

    const BreadItems = fullBreadcrumb.map((item, index) => {
      return (
        <React.Fragment key={item.href}>
          <TextLink href={item.href}>{item.item}</TextLink>
          {index + 1 !== fullBreadcrumb.length && <Arrow>{'>'}</Arrow>}
        </React.Fragment>
      );
    });

    return <Navi>{BreadItems}</Navi>;
  };

  getUserIcon = () => {
    const {
      auth: { login, userName, photoUrl, loading },
    } = this.props;

    if (!login || !photoUrl) {
      return (
        <>
          {loading && <Loading />}
          <Link href="/" passHref>
            <Login onClick={this.handleLogin} data-loading={loading}>
              Log in with GitHub
            </Login>
          </Link>
          <UserIconWrapper>
            <Anonymous />
          </UserIconWrapper>
        </>
      );
    }

    return (
      <>
        <Link href="/" passHref>
          <Login onClick={this.handleLogout}>Log out</Login>
        </Link>
        <UserIconWrapper>
          <UserIcon
            src={photoUrl}
            href={`/user?name=${userName}`}
            width="36"
            height="36"
          />
        </UserIconWrapper>
      </>
    );
  };

  render() {
    return (
      <Wrapper>
        <Inner>
          {this.getBreadcrumb()}
          {this.getUserIcon()}
        </Inner>
      </Wrapper>
    );
  }
}

export default connect()(PageHeader);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  background: #10252d;
  color: #fafafa;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
    background: #10252d;
    z-index: -1;
  }
`;

const Login = styled.a`
  padding: 6px 8px;
  border-radius: 3px;
  color: #fafafa;
  text-decoration: none;
  transition: 0.3s;
  pointer-events: ${props => (props['data-loading'] ? 'none' : '')};

  &:hover {
    background: #09161b;
  }
`;

const Inner = styled.div`
  margin: 0 auto;
  max-width: 1000px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  white-space: nowrap;
`;

const Navi = styled.nav`
  flex: 1;

  a {
    padding: 6px 8px;
    border-radius: 3px;
    color: #929292;
    font-size: 20px;
    font-weight: bold;
    line-height: 32px;
    transition: 0.3s;

    &:last-of-type {
      color: #fafafa;
    }

    &:hover {
      background: #09161b;
    }
  }
`;

const Arrow = styled.span`
  padding: 0 0.6em;
  color: #929292;
  font-weight: bold;
`;

const UserIconWrapper = styled.div`
  padding: 1em 6px 1em 1em;
`;

const UserIcon = styled(Icon)`
  border-radius: 5px;
`;

const Anonymous = styled.div`
  width: 0;
  height: 36px;
  background: #333;
  border-radius: 5px;
`;
