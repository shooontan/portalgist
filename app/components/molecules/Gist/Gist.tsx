import * as React from 'react';
import styled from 'styled-components';
import { GistGetResponseFilesFile } from '~/libs/octokit';
import Content from '~/components/atoms/Content';
import { Headline3 } from '~/components/atoms/Headline';

interface Props {
  file: GistGetResponseFilesFile;
}

const Gist = (props: Props) => {
  const {
    file: { filename, language, content },
  } = props;
  return (
    <Wrapper>
      <Header>
        <Headline>{filename}</Headline>
        {language && <Language>{language}</Language>}
      </Header>
      <Content value={content} />
    </Wrapper>
  );
};

export default Gist;

const Wrapper = styled.div`
  padding-bottom: 2em;
  border-bottom: 1px solid #ccc;

  &:last-of-type {
    border: none;
  }
`;

const Header = styled.div`
  margin: 0 24px;
  padding: 1em 0;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

const Language = styled.p`
  margin: 0;
  padding: 0 0 6px;
  color: #666;
  font-size: 12px;
`;

const Headline = styled(Headline3)`
  margin: 1em 0;
`;
