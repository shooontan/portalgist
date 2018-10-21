import * as React from 'react';
import Link from 'next/link';

interface Breadcrumb {
  item: string;
  href: string;
}

interface Props {
  userName?: string;
  title?: string;
  breadcrumb: Breadcrumb[];
}

class PageHeader extends React.PureComponent<Props> {
  getBreadcrumb = () => {
    const { breadcrumb } = this.props;

    // top page
    const fullBreadcrumb = [
      {
        item: 'Top',
        href: '/',
      },
      ...breadcrumb,
    ];

    const BreadItems = fullBreadcrumb.map((item, index) => {
      let text = item.item;
      if (index + 1 !== fullBreadcrumb.length) {
        text += ' > ';
      }
      return (
        <React.Fragment key={item.href}>
          <Link href={item.href}>
            <a>{text}</a>
          </Link>
        </React.Fragment>
      );
    });

    return <nav>{BreadItems}</nav>;
  };

  render() {
    const { userName } = this.props;

    return (
      <>
        {this.getBreadcrumb()}
        <h1>Hello {userName || ''} 👋</h1>
      </>
    );
  }
}

export default PageHeader;
