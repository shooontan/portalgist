import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '~/reducers';
import isServer from '~/libs/isServer';
import { authInitialState } from '~/reducers/authReducer';

const RootState = {
  auth: authInitialState,
};

const __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ =
  '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

const composeEnhancers =
  isServer || process.env.NODE_ENV === 'production'
    ? compose
    : window[__REDUX_DEVTOOLS_EXTENSION_COMPOSE__];

export default function(initialState = RootState) {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
  return store;
}
