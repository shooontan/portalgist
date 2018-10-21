import * as React from 'react';
import styled from 'styled-components';

const Loading = () => (
  <Wrapper>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </Wrapper>
);

export default Loading;

const Wrapper = styled.p`
  margin: 0;

  span {
    animation: loading-dots 1s infinite both;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }

  @keyframes loading-dots {
    0% {
      opacity: 0.2;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: 0.2;
    }
  }
`;
