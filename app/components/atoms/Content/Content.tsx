import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLElement> {}

const Content = (props: Props) => {
  const { children } = props;
  return (
    <Pre>
      <Code>{children}</Code>
    </Pre>
  );
};

export default Content;

const Pre = styled.pre`
  margin: 0;
  padding: 1em;
  border: 1px solid #aaa;
  border-radius: 3px;
  overflow-x: auto;
`;

const Code = styled.code`
  /* box-shadow: 1px 1px; */
`;
