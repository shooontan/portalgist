import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import createStore from '~/stores/createStore';
import UserAuth from '~/components/organisms/UserAuth';

const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

class AppWithReduxStore extends App {
  reduxStore: Store;
  persistor: Persistor;

  constructor(props) {
    super(props);
    const { store, persistor } = createStore(undefined);
    if (typeof window !== 'undefined' && !window[__NEXT_REDUX_STORE__]) {
      window[__NEXT_REDUX_STORE__] = store;
    }
    this.reduxStore = store;
    this.persistor = persistor;
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider store={this.reduxStore}>
          <PersistGate persistor={this.persistor}>
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
