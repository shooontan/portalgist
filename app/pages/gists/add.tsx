import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '~/reducers';
import {
  addGistAction,
  editGistContent,
  editGistDescription,
  postGistAction,
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
import GistEditor from '~/components/organisms/GistEditor';
import ButtonLink from '~/components/atoms/ButtonLink';
import CodeArea from '~/components/atoms/CodeArea';
import withAuth from '~/components/organisms/withAuth';
import uid from '~/helpers/uid';

interface Props {
  isServer: boolean;
  query: {
    id: string;
  };
  description: string;
  files: GistGetResponseFiles;
  forks: GistGetResponseForks;
  history: GistGetResponseHistory;
  owner: GistGetResponseOwner;
  auth: RootState['auth'];
  error: Error | null;
  dispatch: ThunkDispatch<any, any, any>;
}

class AddPage extends React.PureComponent<Props> {
  static async getInitialProps(Context) {
    const { req, store } = Context;
    const { dispatch }: { dispatch: ThunkDispatch<any, any, any> } = store;

    if (req) {
      return {
        isServer: true,
      };
    }

    dispatch(
      addGistAction({
        gistId: uid(),
      })
    );

    return {
      isServer: false,
    };
  }

  componentDidMount() {
    const { isServer, dispatch } = this.props;
    if (isServer) {
      dispatch(
        addGistAction({
          gistId: uid(),
        })
      );
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

  handlePistPublicGist = () => {
    this.handlePostGist(true);
  };

  handlePistPrivateGist = () => {
    this.handlePostGist(false);
  };

  handlePostGist = async (publicGist: boolean) => {
    const { description, files, dispatch } = this.props;

    const newFiles = {};

    Object.keys(files).forEach(fileId => {
      const item = files[fileId];
      newFiles[fileId] = {
        content: item.content,
        filename: item.filename,
      };
    });

    await dispatch(
      postGistAction({
        files,
        description,
        publicGist,
      })
    );
  };

  onClickAdd = () => {
    const { dispatch } = this.props;

    dispatch(
      editGistContent({
        fileId: uid(),
        fileName: '',
        content: '',
      })
    );
  };

  getHeader = () => {
    const { auth } = this.props;

    if (!auth || !auth.userName) {
      return null;
    }

    const breadcrumb = [
      {
        item: auth.userName,
        href: `/user?name=${auth.userName}`,
      },
      {
        item: 'add',
        href: `/gists/add`,
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

    const Buttons = (
      <>
        <ButtonLink onClick={this.handlePistPublicGist}>Public</ButtonLink>
        <ButtonLink onClick={this.handlePistPrivateGist}>Private</ButtonLink>
      </>
    );

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
        title="Add"
        maxWidth={1200}
        topButtons={Buttons}
        bottomButtons={bottomButtons}
        descriptionEditor={DescriptionEditor}
      >
        {Gists}
      </PageMain>
    );
  };

  render() {
    const { files, error } = this.props;
    if (error || !files) {
      return <div>no gists data</div>;
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

const AddPageWithAuth = withAuth(AddPage);

export default connect((state: RootState) => ({
  auth: state.auth,
  description: state.gists.gist.description,
  files: state.gists.gist.files,
  forks: state.gists.gist.forks,
  history: state.gists.gist.history,
  owner: state.gists.gist.owner,
}))(AddPageWithAuth);
