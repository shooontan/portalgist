import { render } from 'react-testing-library';
import TextLink from './TextLink';

const href = 'https://example.com/';
const hrefUser = {
  pathname: '/user',
  query: { name: 'username' },
};

test('snapshot Icon', () => {
  const { container } = render(<TextLink href={href} />);
  expect(container.firstChild).toMatchSnapshot();

  const { container: textContainer } = render(
    <TextLink href={href}>TextLink Component</TextLink>
  );
  expect(textContainer.firstChild).toMatchSnapshot();

  const { container: paramsHrefContainer } = render(
    <TextLink href={hrefUser}>user name</TextLink>
  );
  expect(paramsHrefContainer.firstChild).toMatchSnapshot();
});
