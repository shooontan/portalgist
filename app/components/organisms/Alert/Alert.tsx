import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '~/reducers';

interface AppError {
  code: number;
  message: string;
}

interface Props {
  gistError: AppError | null;
}

class Alert extends React.PureComponent<Props> {
  existError = () => {
    const { gistError } = this.props;

    if (!gistError) {
      return false;
    }

    if (typeof gistError === 'object') {
      return !!Object.keys(gistError).length;
    }

    return false;
  };

  render() {
    if (!this.existError()) {
      return null;
    }

    const {
      gistError: { code, message },
    } = this.props;

    return (
      <Wrapper>
        <Code>{code} 😇</Code>
        <Message>{message}</Message>
      </Wrapper>
    );
  }
}

export default connect((state: RootState) => ({
  gistError: state.gists.error,
}))(Alert);

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
  width: 100%;
  max-width: 600px;
  background: #089e92;
  border-radius: 6px;
  box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.4);
  color: #fafafa;
`;

const Code = styled.p``;

const Message = styled.p``;
