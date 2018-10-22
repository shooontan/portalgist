import styled, { css } from 'styled-components';
import Link, { LinkProps } from 'next/link';
import { Overwrite } from 'typelevel-ts';

type Props = Overwrite<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  {
    href?: LinkProps['href'];
    color?: 'default' | 'secondary';
  }
>;

const ButtonLink = (props: Props) => {
  const { color, children, href, onClick, ...rest } = props;

  let isEmptyHref = true;
  if (typeof href === 'object') {
    isEmptyHref = !Object.keys(href).length;
  } else if (typeof href === 'string') {
    isEmptyHref = !href;
  }

  if (color === 'secondary') {
    if (isEmptyHref) {
      return (
        <SecondaryButton onClick={onClick} {...rest}>
          {children}
        </SecondaryButton>
      );
    } else {
      // secondary Link element
      return (
        <Link passHref href={href} {...rest}>
          <SecondaryAnker>{children}</SecondaryAnker>
        </Link>
      );
    }
  }

  if (isEmptyHref) {
    // default Button element
    return (
      <DefaultButton onClick={onClick} {...rest}>
        {children}
      </DefaultButton>
    );
  }

  return (
    // default Link element
    <Link passHref href={href} {...rest}>
      <DefaultAnker>{children}</DefaultAnker>
    </Link>
  );
};

ButtonLink.defaultProps = {
  color: 'default',
};

export default ButtonLink;

const baseCss = css`
  padding: 8px 1.8em;
  background: #089e92;
  border-radius: 2em;
  color: #fafafa;
  font-weight: bold;
  text-decoration: none;
  box-shadow: 0px 0px 6px 2px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
`;

const hoverBaseCss = css`
  &:hover {
    background: #0c8e83;
  }
`;

const secondaryBaseCss = css`
  background: #e53935;

  &:hover {
    background: #ce3633;
  }
`;

const DefaultAnker = styled.a`
  ${baseCss};
  ${hoverBaseCss};
`;

const SecondaryAnker = styled(DefaultAnker)`
  ${secondaryBaseCss};
`;

const DefaultButton = styled.button`
  ${baseCss};
  cursor: pointer;
  ${hoverBaseCss};
`;

const SecondaryButton = styled(DefaultButton)`
  ${secondaryBaseCss};
`;
