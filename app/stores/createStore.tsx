import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore } from 'redux-persist';
import isServer from '~/libs/isServer';
import reducer, { RootState } from '~/reducers';
import { authInitialState } from '~/reducers/authReducer';
import { gistsInitialState } from '~/reducers/gistsReducer';

const rootState: RootState = {
  auth: authInitialState,
  gists: gistsInitialState,
};

const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
  '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

const composeEnhancers =
  isServer || process.env.NODE_ENV === 'production'
    ? compose
    : window[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__] || compose;

export default function(initialState = rootState) {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
