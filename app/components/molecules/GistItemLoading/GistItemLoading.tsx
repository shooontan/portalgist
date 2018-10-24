import * as React from 'react';
import styled from 'styled-components';
import pure from 'recompose/pure';
import { Wrapper } from '~/components/molecules/GistItem';

const Loading = () => {
  return (
    <Wrapper>
      <LoadingBar data-height={18} data-width={300} />
      <LoadingBar data-height={14} data-delay={0.7} data-width={200} />
      <LoadingBar data-height={16} data-delay={0.3} data-width={400} />
    </Wrapper>
  );
};

interface Props {
  items?: number;
}

const GistItemLoading = (props: Props) => {
  const { items } = props;
  const Loaings = [...Array(items)].map((__, index) => <Loading key={index} />);
  return <>{Loaings}</>;
};

GistItemLoading.defaulProps = {
  items: 1,
};

export default pure(GistItemLoading);

const LoadingBar = styled.span`
  display: block;
  margin: 4px 0;
  width: ${props =>
    props['data-width'] ? `${props['data-width']}px` : '200px'};
  height: ${props =>
    props['data-height'] ? `${props['data-height']}px` : '24px'};
  background: rgba(0, 0, 0, 0.1);

  animation: loading-bar 1s ease infinite;
  animation-delay: ${props =>
    props['data-delay'] ? `${props['data-delay']}s` : '0s'};

  @keyframes loading-bar {
    0% {
      opacity: 0.8;
    }

    50% {
      opacity: 0.6;
    }

    100% {
      opacity: 1;
    }
  }
`;
