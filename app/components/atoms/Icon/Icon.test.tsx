import { render } from 'react-testing-library';
import Icon from './Icon';

const src = 'https://example.com/icon.png';
const href = 'https://example.com/';
const hrefUser = {
  pathname: '/user',
  query: { name: 'username' },
};

test('snapshot Icon', () => {
  const { container } = render(<Icon src={src} />);
  expect(container.firstChild).toMatchSnapshot();

  const { container: hrefContainer } = render(<Icon src={src} href={href} />);
  expect(hrefContainer.firstChild).toMatchSnapshot();

  const { container: paramsHrefContainer } = render(
    <Icon src={src} href={hrefUser} />
  );
  expect(paramsHrefContainer.firstChild).toMatchSnapshot();

  const { container: attrComtainer } = render(
    <Icon src={src} width="400" height="400" alt="icon" />
  );
  expect(attrComtainer.firstChild).toMatchSnapshot();
});
