import * as React from 'react';
import Router from 'next/router';
import { RootState } from '~/reducers';

interface WithAuthProps {
  auth: RootState['auth'];
}

interface ChildComponentClass extends React.ComponentClass {
  getInitialProps?: any;
}

const withAuth = <P extends {}>(
  ChildComponent: ChildComponentClass
): React.ComponentClass => {
  return class WithAuthHOC extends React.PureComponent<P & WithAuthProps> {
    static async getInitialProps(context) {
      if (typeof ChildComponent.getInitialProps === 'function') {
        return ChildComponent.getInitialProps(context);
      }
    }

    componentDidMount() {
      const { auth } = this.props;
      const { login, userName } = auth;
      if (!login || !userName) {
        return Router.replace('/');
      }
    }

    render() {
      return <ChildComponent {...this.props} />;
    }
  };
};

export default withAuth;
