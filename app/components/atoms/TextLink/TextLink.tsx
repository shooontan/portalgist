import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import pure from 'recompose/pure';
import styled from 'styled-components';
import { Overwrite } from 'typelevel-ts';

type Props = Overwrite<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  {
    href: LinkProps['href'];
  }
>;

const TextLink = (props: Props) => {
  const { children, href, ...rest } = props;
  return (
    <Link href={href} passHref {...rest}>
      <Anker>{children}</Anker>
    </Link>
  );
};

export default pure(TextLink);

const Anker = styled.a`
  text-decoration: none;
`;
