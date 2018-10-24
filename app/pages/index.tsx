import * as React from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AuthState } from '~/reducers/authReducer';
import { GistsState } from '~/reducers/gistsReducer';
import TemplateBase from '~/components/templates/TemplateBase';
import PageHeader from '~/components/organisms/PageHeader';
import PageMain from '~/components/organisms/PageMain';
import PageFooter from '~/components/organisms/PageFooter';
import { fetchPublicGistsAction } from '~/actions/gistsAction';
import GistItem from '~/components/molecules/GistItem';
import GistItemLoading from '~/components/molecules/GistItemLoading';

interface Props {
  dispatch: ThunkDispatch<any, any, any>;
  auth: AuthState;
  gists: GistsState;
  isServer: boolean;
}

class IndexPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;

    if (req) {
      return {
        isServer: true,
      };
    }

    await dispatch(fetchPublicGistsAction());

    return {
      isServer: false,
    };
  }

  componentDidMount() {
    const { dispatch, isServer } = this.props;
    if (isServer) {
      dispatch(fetchPublicGistsAction());
    }
  }

  getHeader = () => {
    const { auth } = this.props;
    const breadcrumb = [];
    return <PageHeader breadcrumb={breadcrumb} auth={auth} />;
  };

  getMain = () => {
    const {
      gists: { loading },
    } = this.props;

    let GistItems = null;

    if (loading) {
      GistItems = <GistItemLoading items={6} />;
    } else {
      GistItems = this.props.gists.timeline.map(gistId => {
        const gist = this.props.gists.gists[gistId];
        return <GistItem gist={gist} key={gistId} />;
      });
    }

    return <PageMain title="All Gists">{GistItems}</PageMain>;
  };

  render() {
    return (
      <TemplateBase
        header={this.getHeader()}
        main={this.getMain()}
        footer={<PageFooter />}
      />
    );
  }
}

export default connect(state => state)(IndexPage);
