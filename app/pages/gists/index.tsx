import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '~/reducers';
import Gist from '~/components/molecules/Gist';
import { fetchGistAction } from '~/actions/gistsAction';
import {
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
  GistGetResponseOwner,
} from '~/libs/octokit';
import TemplateBase from '~/components/templates/TemplateBase';
import PageHeader from '~/components/organisms/PageHeader';
import PageMain from '~/components/organisms/PageMain';
import ButtonLink from '~/components/atoms/ButtonLink';
import getQuery from '~/helpers/getQuery';

interface Props {
  isServer: boolean;
  query: {
    id: string;
  };
  auth: RootState['auth'];
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  history: GistGetResponseHistory;
  owner: GistGetResponseOwner;
  error: Error | null;
  dispatch: ThunkDispatch<any, any, any>;
}

class GistPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, query, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;
    const { id }: { id: string } = query;

    if (req) {
      return {
        isServer: true,
        query,
      };
    }

    await dispatch(fetchGistAction(id));

    return {
      isServer: false,
      query,
    };
  }

  componentDidMount() {
    const { isServer, dispatch } = this.props;
    const { id } = getQuery();
    if (isServer && typeof id === 'string') {
      dispatch(fetchGistAction(id));
    }
  }

  editLink = () => {
    const {
      auth: { login, userId },
      owner,
    } = this.props;
    const { id } = getQuery();

    if (!login) {
      return null;
    }
    if (!owner || userId !== owner.id.toString()) {
      return null;
    }

    const editHref = {
      pathname: '/gists/edit',
      query: { id },
    };

    return <ButtonLink href={editHref}>Edit</ButtonLink>;
  };

  getHeader = () => {
    const { auth, owner } = this.props;
    const { id } = getQuery();

    if (!owner || !owner.login) {
      return null;
    }

    const breadcrumb = [
      {
        item: owner.login,
        href: `/user?name=${owner.login}`,
      },
      {
        item: 'gist',
        href: `/gists?id=${id}`,
      },
    ];
    return <PageHeader breadcrumb={breadcrumb} auth={auth} />;
  };

  getMain = () => {
    const { files } = this.props;
    const Gists = Object.keys(files).map(fileName => {
      const file = files[fileName];
      return <Gist file={file} key={fileName} />;
    });

    const buttons = this.editLink();

    return (
      <PageMain title="Gist" topButtons={buttons}>
        {Gists}
      </PageMain>
    );
  };

  render() {
    const { files, error } = this.props;
    if (error || !files) {
      return (
        <div>
          <p>no gists data</p>
        </div>
      );
    }

    return <TemplateBase header={this.getHeader()} main={this.getMain()} />;
  }
}

export default connect((state: RootState) => ({
  auth: state.auth,
  files: state.gists.gist.files,
  forks: state.gists.gist.forks,
  history: state.gists.gist.history,
  owner: state.gists.gist.owner,
}))(GistPage);
