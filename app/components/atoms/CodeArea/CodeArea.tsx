import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  content: string;
}

const CodeArea = (props: Props) => {
  const { content } = props;
  const rows = content.split(/\r|\r\n|\n/).length;
  return <TextArea value={content} rows={rows} {...props} />;
};

export default CodeArea;

const TextArea = styled.textarea`
  width: 100%;
  font-size: 12px;
  outline: 0;
  resize: none;
`;
