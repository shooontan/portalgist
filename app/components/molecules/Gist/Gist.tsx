import * as React from 'react';
import styled from 'styled-components';
import { GistGetResponseFilesFile } from '~/libs/octokit';
import Content from '~/components/atoms/Content';

interface Props {
  file: GistGetResponseFilesFile;
}

const Gist = (props: Props) => {
  const {
    file: { filename, language, content },
  } = props;
  return (
    <Wrapper>
      <Filename>{filename}</Filename>
      {language && <Language>{language}</Language>}
      <Content>{content}</Content>
    </Wrapper>
  );
};

export default Gist;

const Wrapper = styled.div`
  padding: 0.5em;
`;

const Filename = styled.p`
  margin: 0;
  padding: 0;
`;

const Language = styled.p`
  color: #666;
  font-size: 12px;
`;
