import { combineReducers } from 'redux';
import auth from './authReducer';
import gists from './gistsReducer';

export default combineReducers({
  auth,
  gists,
});
