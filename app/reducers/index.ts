import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import auth, { AuthState } from './authReducer';
import gists, { GistsState } from './gistsReducer';

export interface RootState {
  auth: AuthState;
  gists: GistsState;
}

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
