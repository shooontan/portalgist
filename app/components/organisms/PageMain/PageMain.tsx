import * as React from 'react';
import styled from 'styled-components';
import { Headline2 } from '~/components/atoms/Headline';

interface Props {
  maxWidth: number;
  title: string;
  description?: string;
  descriptionEditor?: JSX.Element;
  topButtons?: JSX.Element;
  bottomButtons?: JSX.Element;
}

export default class PageMain extends React.PureComponent<Props> {
  static defaultProps = {
    maxWidth: 1000,
  };

  render() {
    const {
      children,
      title,
      description,
      descriptionEditor,
      topButtons,
      bottomButtons,
    } = this.props;
    return (
      <Wrapper>
        <Inner data-maxwidth={this.props.maxWidth}>
          <Header>
            <Headline>{title}</Headline>
            {topButtons && topButtons}
          </Header>
          {descriptionEditor && (
            <DescriptionEditor>{descriptionEditor}</DescriptionEditor>
          )}
          {description && <Description>{description}</Description>}
          {children}
          {bottomButtons && (
            <BottomButtonsWrapper>{bottomButtons}</BottomButtonsWrapper>
          )}
        </Inner>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  flex: 1;
`;

const Inner = styled.div`
  margin: 40px auto 30px;
  width: 100%;
  max-width: ${props => `${props['data-maxwidth']}px`};
  background: #fafafa;
  border-radius: 8px;
  box-shadow: 0 0 5px 0px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  @media (max-width: 600px) {
    margin: 20px auto 30px;
  }
`;

const Headline = styled(Headline2)`
  display: flex;
  flex: 1;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  margin: 18px 24px 0 24px;
  padding: 0 0 0.5em;
  border-bottom: 1px solid #ccc;

  @media (max-width: 600px) {
    margin: 16px 16px 0;
  }
`;

const DescriptionEditor = styled.div`
  margin: 0 24px;
  padding: 1em 0;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

const Description = styled.p`
  margin: 0 24px;
  padding: 1em 0 0;
  color: #333;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`;

const BottomButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 24px;
  padding-bottom: 2em;
`;
