import * as React from 'react';
import styled from 'styled-components';
import { GistGetResponseFilesFile } from '~/libs/octokit';
import CodeArea from '~/components/atoms/CodeArea';

interface Props {
  fileId: string;
  file: GistGetResponseFilesFile;
  onChange: (fileId: string, fileName: string, content: string) => void;
}

class GistEditor extends React.PureComponent<Props> {
  handleChange = ({ target: { value } }) => {
    const {
      fileId,
      file: { filename },
    } = this.props;
    this.props.onChange(fileId, filename, value);
  };

  handleChanleFileName = ({ target: { value } }) => {
    const {
      fileId,
      file: { content },
    } = this.props;
    this.props.onChange(fileId, value, content);
  };

  render() {
    const {
      file: { filename, language, content },
      ...rest
    } = this.props;
    return (
      <Wrapper>
        <CodeArea content={filename} onChange={this.handleChanleFileName} />
        {language && <Language>{language}</Language>}
        <CodeArea content={content} {...rest} onChange={this.handleChange} />
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
