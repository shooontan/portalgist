import * as React from 'react';
import styled from 'styled-components';

interface Props {
  maxWidth: number;
}

export default class PageMain extends React.PureComponent<Props> {
  static defaultProps = {
    maxWidth: 1000,
  };

  render() {
    const { children } = this.props;
    return <Wrapper data-maxwidth={this.props.maxWidth}>{children}</Wrapper>;
  }
}

const Wrapper = styled.div`
  margin: 60px auto 0;
  width: 100%;
  max-width: ${props => `${props['data-maxwidth']}px`};
  background: #fafafa;
  border-radius: 8px;
  overflow: hidden;
`;
