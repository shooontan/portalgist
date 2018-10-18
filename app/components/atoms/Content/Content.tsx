import * as React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLElement> {
  value: string;
}

const Content = (props: Props) => {
  const { value } = props;
  const splitedCode = value.split(/\r|\r\n|\n/);

  const Trs = splitedCode.map((code, index) => {
    return (
      <CodeLine key={index}>
        <LineIndex>{index + 1}</LineIndex>
        <Pre>
          <code>{code}</code>
        </Pre>
      </CodeLine>
    );
  });

  return <Wrapper>{Trs}</Wrapper>;
};

export default Content;

const Wrapper = styled.div`
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 3px;
  overflow-x: auto;
`;

const LineIndex = styled.span`
  min-width: 2em;
  color: #aaa;
  font-size: 0.9em;
  text-align: right;
`;

const CodeLine = styled.div`
  display: flex;
`;

const Pre = styled.pre`
  margin: 0;
  padding-left: 1em;
`;
