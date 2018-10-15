import { format } from 'url';
import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import styled from 'styled-components';
import pure from 'recompose/pure';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  href?: LinkProps['href'];
}

const Icon = (props: Props) => {
  const { src, href, ...rest } = props;
  if (!href) {
    return <Image src={src} {...rest} />;
  }
  return (
    <Link href={href}>
      <Anker href={format(href)}>
        <Image src={src} {...rest} />
      </Anker>
    </Link>
  );
};

export default pure(Icon);

Icon.defaultProps = {
  width: 50,
  height: 50,
};

const Image = styled.img`
  border-radius: 3px;
  vertical-align: bottom;
`;

const Anker = styled.a`
  display: inline-block;
  cursor: pointer;
`;
