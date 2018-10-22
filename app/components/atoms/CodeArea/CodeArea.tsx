import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  content: string;
}

const CodeArea = (props: Props) => {
  const { content } = props;
  return (
    <Wrapper>
      <TextArea value={content} {...props} />
    </Wrapper>
  );
};

export default CodeArea;

const Wrapper = styled.div`
  display: inline-block;
  width: 60%;
  max-width: 600px;
  border: 2px solid #eee;
  border-radius: 3px;
  overflow: hidden;
`;

const TextArea = styled.input`
  padding: 0.6em;
  width: 100%;
  border: none;
  resize: none;
`;
