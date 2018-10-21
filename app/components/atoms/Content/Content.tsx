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
  margin-bottom: 2em;
  padding: 10px 0 10px 6px;
  background: #13262d;
  border-top: 1px solid #aaa;
  border-bottom: 1px solid #aaa;
  color: #eee;
  font-size: 15px;
  line-height: 1.3;
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
