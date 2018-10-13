import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import firebase from '~/libs/firebase';
import { loginUserAsyncAction, logoutUserAction } from '~/actions/authAction';

interface Props {
  dispatch: Dispatch;
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
        // return dispatch(logoutUserAction);
        return logoutUserAction(dispatch);
      }
      // login user
      const { providerData } = user;
      const userData = providerData[0];
      return dispatch(
        loginUserAsyncAction.done({
          params: {},
          result: {
            userName: userData.displayName,
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
      if (!result.credential) {
        return;
      }
      // login user
      const { providerData } = result.user;
      const userData = providerData[0];
      dispatch(
        loginUserAsyncAction.done({
          params: {},
          result: { userName: userData.displayName },
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

export default connect()(UserAuth);
