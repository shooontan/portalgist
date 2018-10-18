import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from '~/stores/createStore';
import UserAuth from '~/components/organisms/UserAuth';
import { authenticate } from '~/libs/octokit';

interface Props {
  store: Store;
  persistor: Persistor;
}

const { store, persistor } = createStore(undefined);

const onBeforeLift = () => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    authenticate(auth.accessToken);
  }
};

class AppWithReduxStore extends App<Props> {
  static async getInitialProps(appContext) {
    appContext.ctx.store = store;

    let appProps = {};
    if (typeof appContext.Component.getInitialProps === 'function') {
      appProps = await appContext.Component.getInitialProps(appContext.ctx);
    }

    return {
      pageProps: {
        ...appProps,
      },
    };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
            <>
              <UserAuth />
              <Component {...pageProps} />
            </>
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default AppWithReduxStore;
