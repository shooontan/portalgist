import styled from 'styled-components';
import Link, { LinkProps } from 'next/link';
import { Overwrite } from 'typelevel-ts';

type Props = Overwrite<
  React.LinkHTMLAttributes<HTMLLinkElement>,
  {
    href: LinkProps['href'];
    color?: 'default' | 'secondary';
  }
>;

const ButtonLink = (props: Props) => {
  const { color, children, ...rest } = props;

  if (color === 'secondary') {
    return (
      <Link passHref {...rest}>
        <SecondaryAnker>{children}</SecondaryAnker>
      </Link>
    );
  }

  return (
    <Link passHref {...rest}>
      <DefaultAnker>{children}</DefaultAnker>
    </Link>
  );
};

ButtonLink.defaultProps = {
  color: 'default',
};

export default ButtonLink;

const DefaultAnker = styled.a`
  padding: 8px 1.8em;
  background: #089e92;
  border-radius: 2em;
  color: #fafafa;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  transition: 0.3s;

  &:hover {
    background: #0c8e83;
  }
`;

const SecondaryAnker = styled(DefaultAnker)`
  background: #e53935;

  &:hover {
    background: #ce3633;
  }
`;
