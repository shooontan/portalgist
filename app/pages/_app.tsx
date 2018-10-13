import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import createStore from '~/stores/createStore';
import isServer from '~/libs/isServer';
import UserAuth from '~/components/organisms/UserAuth';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

function getOrCreateStore(initialState) {
  const store = createStore(initialState);
  if (isServer) {
    return store;
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = store;
  }
  return store;
}

class AppWithReduxStore extends App {
  static async getInitialProps(context) {
    const reduxStore = getOrCreateStore(undefined);
    // provide reduxStore
    context.ctx.reduxStore = reduxStore;
    let pageProps = {};
    if (typeof context.Component.getInitialProps === 'function') {
      pageProps = await context.Component.getInitialProps(context.ctx);
    }
    return {
      Component: context.Component,
      initialReduxState: reduxStore.getState(),
      pageProps,
    };
  }

  reduxStore: Store;

  constructor(props) {
    super(props);
    this.reduxStore = getOrCreateStore(props.initialReduxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.reduxStore}>
          <>
            <UserAuth />
            <Component {...pageProps} />
          </>
        </Provider>
      </Container>
    );
  }
}

export default AppWithReduxStore;
