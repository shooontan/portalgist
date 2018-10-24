import * as React from 'react';
import styled from 'styled-components';

export default class PageFooter extends React.PureComponent {
  render() {
    return <Wrapper />;
  }
}

const Wrapper = styled.div`
  width: 100%;
  height: 40px;
  background: #10252d;
  color: #fafafa;
`;
