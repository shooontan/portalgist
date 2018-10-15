import * as React from 'react';
import pure from 'recompose/pure';
import styled from 'styled-components';

interface Props extends React.TimeHTMLAttributes<HTMLTimeElement> {}

const DateTime = (props: Props) => {
  const { children, ...rest } = props;
  return <Time {...rest}>{children}</Time>;
};

export default pure(DateTime);

const Time = styled.time`
  color: #666;
  font-size: 12px;
`;
