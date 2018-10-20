import * as React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { GistGetResponseFilesFile } from '~/libs/octokit';
import CodeArea from '~/components/atoms/CodeArea';
import getLineCount from '~/helpers/getLineCount';

const MonacoEditor = dynamic(
  // @ts-ignore
  () => import('react-monaco-editor'),
  {
    ssr: false,
  }
);

interface Props {
  fileId: string;
  file: GistGetResponseFilesFile;
  onChange: (fileId: string, fileName: string, content: string) => void;
}

interface State {
  content: string;
}

class GistEditor extends React.PureComponent<Props, State> {
  lineHeight = 18;

  handleChangeFileName = ({ target: { value } }) => {
    const {
      fileId,
      file: { content },
    } = this.props;
    this.props.onChange(fileId, value, content);
  };

  handleChangeContent = newContent => {
    const {
      fileId,
      file: { filename },
    } = this.props;
    this.props.onChange(fileId, filename, newContent);
  };

  render() {
    const {
      file: { filename, language, content },
    } = this.props;

    const height = getLineCount(content);

    return (
      <Wrapper>
        <CodeArea content={filename} onChange={this.handleChangeFileName} />
        {language && <Language>{language}</Language>}
        <MonacoEditor
          width="100%"
          height={`${height * this.lineHeight}`}
          value={content}
          language={language}
          options={{
            automaticLayout: true,
            scrollBeyondLastLine: false,
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
              horizontalScrollbarSize: 0,
              verticalScrollbarSize: 0,
              verticalSliderSize: 0,
            },
          }}
          onChange={this.handleChangeContent}
        />
      </Wrapper>
    );
  }
}

export default GistEditor;

const Wrapper = styled.div`
  padding: 0.5em;
`;

const Language = styled.p`
  color: #666;
  font-size: 12px;
`;
