import * as React from 'react';
import pure from 'recompose/pure';
import styled from 'styled-components';
import { GistsGetAllResponseItem } from '~/libs/octokit';
import Icon from '~/components/atoms/Icon';
import DateTime from '~/components/atoms/DateTime';
import TextLink from '~/components/atoms/TextLink';

interface Props {
  gist: GistsGetAllResponseItem;
}

const GistItem = (props: Props) => {
  const {
    gist: {
      id,
      created_at,
      description,
      files,
      owner: { avatar_url, login },
    },
  } = props;

  const hrefUser = {
    pathname: '/user',
    query: { name: login },
  };

  const hrefFile = {
    pathname: '/gists',
    query: { id },
  };

  const fileName = Object.keys(files)[0];

  return (
    <Wrapper>
      <IconWrapper>
        <Icon src={avatar_url} href={hrefUser} alt={`${login}-icon`} />
      </IconWrapper>
      <Detail>
        <TextLink href={hrefUser}>{login}</TextLink>
        {' / '}
        <TextLink href={hrefFile}>{fileName}</TextLink>
        <div>
          <DateTime dateTime={created_at}>{`Created ${created_at}`}</DateTime>
        </div>
        <Description>{description}</Description>
      </Detail>
    </Wrapper>
  );
};

export default pure(GistItem);

const Wrapper = styled.div`
  margin: 0 0 1em;
  padding: 0;
  display: flex;
`;

const IconWrapper = styled.div`
  padding-right: 0.8em;
`;

const Detail = styled.div``;

const Description = styled.p`
  margin: 0;
  padding: 0;
`;
