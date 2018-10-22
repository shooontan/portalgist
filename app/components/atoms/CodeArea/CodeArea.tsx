import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  content: string;
  dataWidth?: string;
  dataMaxWidth?: string;
}

const CodeArea = (props: Props) => {
  const { dataWidth, dataMaxWidth, content } = props;
  return (
    <Wrapper data-width={dataWidth} data-maxwidth={dataMaxWidth}>
      <TextArea value={content} {...props} />
    </Wrapper>
  );
};

export default CodeArea;

const Wrapper = styled.div`
  display: inline-block;
  width: ${props => props['data-width'] || '60%'};
  max-width: ${props => props['data-maxwidth'] || '600px'};
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
