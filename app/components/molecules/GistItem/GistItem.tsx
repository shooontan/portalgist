import * as React from 'react';
import pure from 'recompose/pure';
import styled from 'styled-components';
import { GistsGetAllResponseItem } from '~/libs/octokit';
import dayjs from '~/libs/dayjs';
import Icon from '~/components/atoms/Icon';
import DateTime from '~/components/atoms/DateTime';
import TextLink from '~/components/atoms/TextLink';
import count from '~/helpers/count';

interface Props {
  gist: GistsGetAllResponseItem;
}

const GistItem = (props: Props) => {
  const {
    gist: {
      id,
      created_at,
      updated_at,
      description,
      files,
      owner: { avatar_url, login },
      comments,
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
  const fileCount = Object.keys(files).length;

  const datetime =
    created_at === updated_at
      ? `Created ${dayjs(created_at).fromNow()}`
      : `Updated ${dayjs(updated_at).fromNow()}`;

  return (
    <Wrapper>
      <GistUserLinkWrapper>
        <StyledIcon
          src={avatar_url}
          href={hrefUser}
          alt={`${login}-icon`}
          width="20"
          height="20"
        />
        <TextLink href={hrefUser}>{login}</TextLink>
        <Slash>{'/'}</Slash>
        <TextLink href={hrefFile}>{fileName}</TextLink>
      </GistUserLinkWrapper>
      <Detail>
        <StyledDateTime dateTime={created_at}>{datetime}</StyledDateTime>
        <DetailText>{count('file', fileCount)}</DetailText>
        <DetailText>{count('comment', comments)}</DetailText>
      </Detail>
      <Description>{description}</Description>
    </Wrapper>
  );
};

export default pure(GistItem);

export const Wrapper = styled.article`
  padding: 1.6em;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;

  &:first-of-type {
    padding-top: 1.8em;
  }

  &:last-of-type {
    border: none;
  }
`;

const StyledIcon = styled(Icon)`
  margin-right: 4px;
  vertical-align: top;
`;

const StyledDateTime = styled(DateTime)`
  padding-right: 2em;
`;

const GistUserLinkWrapper = styled.p`
  margin: 0;
  line-height: 24px;
  font-weight: bold;
  word-break: break-all;
`;

const Description = styled.p`
  margin: 0;
  padding: 6px 0 0;
  font-size: 0.9em;
  word-break: break-all;
`;

const Detail = styled.p`
  margin: 0;
  padding: 6px 0 0 0;
`;

const DetailText = styled.span`
  padding-right: 2em;
  color: #666;
  font-size: 12px;

  &:last-of-type {
    padding-right: 0;
  }
`;

const Slash = styled.span`
  margin: 0 6px;
  font-weight: normal;
`;
