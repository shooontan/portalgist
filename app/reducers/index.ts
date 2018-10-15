import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth from './authReducer';
import gists from './gistsReducer';

const persistedAuth = persistReducer(
  {
    key: 'auth',
    storage,
  },
  auth
);

export default combineReducers({
  auth: persistedAuth,
  gists,
});
