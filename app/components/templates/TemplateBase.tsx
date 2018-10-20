import * as React from 'react';
import styled, { injectGlobal } from 'styled-components';
import styledNormalize from 'styled-normalize';

injectGlobal`
  ${styledNormalize}
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
        {main}
        {footer}
      </Layout>
    );
  }
}

const Layout = styled.div``;
