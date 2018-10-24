import * as React from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '~/reducers';
import {
  fetchGistAction,
  editGistContent,
  editGistDescription,
  patchEditGistAction,
} from '~/actions/gistsAction';
import {
  GistGetResponseFiles,
  GistGetResponseForks,
  GistGetResponseHistory,
  GistGetResponseOwner,
} from '~/libs/octokit';
import TemplateBase from '~/components/templates/TemplateBase';
import PageHeader from '~/components/organisms/PageHeader';
import PageMain from '~/components/organisms/PageMain';
import PageFooter from '~/components/organisms/PageFooter';
import getQuery from '~/helpers/getQuery';
import GistEditor from '~/components/organisms/GistEditor';
import ButtonLink from '~/components/atoms/ButtonLink';
import CodeArea from '~/components/atoms/CodeArea';
import withAuth from '~/components/organisms/withAuth';

interface Props {
  isServer: boolean;
  description: string;
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  history: GistGetResponseHistory;
  owner: GistGetResponseOwner;
  auth: RootState['auth'];
  error: Error | null;
  dispatch: ThunkDispatch<any, any, any>;
}

class EditPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, query, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;
    const { id }: { id: string } = query;

    if (req) {
      return {
        isServer: true,
      };
    }

    await dispatch(fetchGistAction(id));

    return {
      isServer: false,
    };
  }

  componentDidMount() {
    const { isServer, dispatch } = this.props;
    const { id } = getQuery();
    if (isServer && typeof id === 'string') {
      dispatch(fetchGistAction(id));
    }
  }

  handleChenge = (fileId: string, fileName: string, content: string) => {
    const { dispatch } = this.props;
    dispatch(
      editGistContent({
        fileId,
        fileName,
        content,
      })
    );
  };

  handleChangeDescription = ({ target: { value } }) => {
    const { dispatch } = this.props;
    dispatch(
      editGistDescription({
        description: value,
      })
    );
  };

  onClick = () => {
    const { description, files, dispatch } = this.props;
    const { id } = getQuery();
    const newFiles = {};

    Object.keys(files).forEach(fileId => {
      const item = files[fileId];
      newFiles[fileId] = {
        content: item.content,
        filename: item.filename,
      };
    });

    dispatch(
      patchEditGistAction({
        gistId: id.toString(),
        files: newFiles,
        description,
      })
    );
  };

  onClickAdd = () => {
    const { dispatch } = this.props;

    dispatch(
      editGistContent({
        fileId: new Date().getTime().toString(), // uid???
        fileName: '',
        content: '',
      })
    );
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
      {
        item: 'edit',
        href: `/gists/edit?id=${id}`,
      },
    ];
    return <PageHeader breadcrumb={breadcrumb} auth={auth} />;
  };

  getMain = () => {
    const { description, files } = this.props;
    const Gists = Object.keys(files).map(fileName => {
      const file = files[fileName];
      return (
        <GistEditor
          fileId={fileName}
          file={file}
          key={fileName}
          onChange={this.handleChenge}
        />
      );
    });

    const Buttons = <ButtonLink onClick={this.onClick}>Update</ButtonLink>;
    const bottomButtons = (
      <ButtonLink onClick={this.onClickAdd}>Add</ButtonLink>
    );

    const DescriptionEditor = (
      <CodeArea
        content={description}
        dataWidth="100%"
        dataMaxWidth="100%"
        onChange={this.handleChangeDescription}
      />
    );

    return (
      <PageMain
        title="Edit"
        maxWidth={1200}
        topButtons={Buttons}
        bottomButtons={bottomButtons}
        descriptionEditor={DescriptionEditor}
      >
        {Gists}
      </PageMain>
    );
  };

  isOwnGist = () => {
    const { auth, owner } = this.props;
    if (!auth || !owner) {
      return true;
    }
    const { id } = owner;
    const { userId } = auth;
    if (id && userId) {
      if (id.toString() !== userId) {
        return false;
      }
    }
    return true;
  };

  render() {
    const { files, error } = this.props;
    if (error || !files) {
      return <div>no gists data</div>;
    }

    // others gist
    if (!this.isOwnGist()) {
      Router.replace('/');
      return null;
    }

    return (
      <TemplateBase
        header={this.getHeader()}
        main={this.getMain()}
        footer={<PageFooter />}
      />
    );
  }
}

const EditPageWithAuth = withAuth(EditPage);

export default connect((state: RootState) => ({
  auth: state.auth,
  description: state.gists.gist.description,
  files: state.gists.gist.files,
  forks: state.gists.gist.forks,
  history: state.gists.gist.history,
  owner: state.gists.gist.owner,
}))(EditPageWithAuth);
