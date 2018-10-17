import * as React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import firebase from '~/libs/firebase';
import { authenticate } from '~/libs/octokit';
import {
  loginUserAsyncAction,
  logoutUserAction,
  setAccessTokenAction,
} from '~/actions/authAction';
import { RootState } from '~/reducers';

interface Props {
  dispatch: ThunkDispatch<void, void, AnyAction>;
  accessToken: string;
}

class UserAuth extends React.PureComponent<Props> {
  componentDidMount() {
    this.onAuthStateChanged();
    this.getRedirectResult();
  }

  onAuthStateChanged = async () => {
    const { dispatch } = this.props;

    firebase.auth().onAuthStateChanged(user => {
      // no login user
      if (!user) {
        // reset octokit authentication
        authenticate(null);
        // logout action
        return dispatch(logoutUserAction());
      }

      // set token to octokit client
      const { accessToken } = this.props;
      if (accessToken) {
        authenticate(accessToken);
      }

      // login user
      const { providerData } = user;
      const userData = providerData[0];
      const userName = userData.displayName;
      const userId = userData.uid;
      const photoUrl = userData.photoURL;
      return dispatch(
        loginUserAsyncAction.done({
          params: {},
          result: {
            userName,
            userId,
            photoUrl,
          },
        })
      );
    });
  };

  getRedirectResult = async () => {
    const { dispatch } = this.props;

    try {
      const result = await firebase.auth().getRedirectResult();

      // no login
      if (!result || !result.credential) {
        return;
      }

      // @ts-ignore
      const accessToken: string = result.credential.accessToken;
      dispatch(setAccessTokenAction({ accessToken }));

      // set token to octokit client
      authenticate(accessToken);

      // login user
      const { providerData } = result.user;
      const userData = providerData[0];
      const userName = userData.displayName;
      const userId = userData.uid;
      const photoUrl = result.user.photoURL;
      dispatch(
        loginUserAsyncAction.done({
          params: {},
          result: { userName, userId, photoUrl },
        })
      );
    } catch (error) {
      // login error
      dispatch(
        loginUserAsyncAction.failed({
          params: {},
          error: {
            code: 400,
            message: error.toString(),
          },
        })
      );
    }
  };

  render() {
    return null;
  }
}

export default connect((state: RootState) => ({
  accessToken: state.auth.accessToken,
}))(UserAuth);
