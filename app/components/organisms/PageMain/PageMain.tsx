import * as React from 'react';
import styled from 'styled-components';
import { Headline2 } from '~/components/atoms/Headline';

interface Props {
  maxWidth: number;
  title: string;
}

export default class PageMain extends React.PureComponent<Props> {
  static defaultProps = {
    maxWidth: 1000,
  };

  render() {
    const { children, title } = this.props;
    return (
      <Wrapper data-maxwidth={this.props.maxWidth}>
        <Headline>{title}</Headline>
        {children}
      </Wrapper>
    );
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

const Headline = styled(Headline2)`
  margin: 18px 24px 0;
  padding: 0 0 0.5em;
  border-bottom: 1px solid #ccc;
`;
