import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';
import Alert from '~/components/organisms/Alert';

injectGlobal`
  ${styledNormalize}

  * {
    box-sizing: border-box;
  }

  html {
    background: #eee;
  }

  body {
    overflow-y: scroll;
  }

  a {
    color: #089e92;
  }
`;

interface Props {
  header?: JSX.Element;
  main?: JSX.Element;
  footer?: JSX.Element;
}

export default class TemplateBase extends React.PureComponent<Props> {
  render() {
    const { header, main, footer } = this.props;
    return (
      <Layout>
        {header}
        <Alert />
        {main}
        {footer}
      </Layout>
    );
  }
}

const Layout = styled.div``;
