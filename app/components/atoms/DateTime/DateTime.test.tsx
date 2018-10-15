import { render } from 'react-testing-library';
import DateTime from './DateTime';

const datetime = '2018-10-15T12:09:50Z';

test('snapshot DateTime', () => {
  const { container } = render(<DateTime />);
  expect(container.firstChild).toMatchSnapshot();

  const { container: datetimeContainer } = render(
    <DateTime>{datetime}</DateTime>
  );
  expect(datetimeContainer.firstChild).toMatchSnapshot();

  const { container: attrComtainer } = render(
    <DateTime dateTime={datetime}>{datetime}</DateTime>
  );
  expect(attrComtainer.firstChild).toMatchSnapshot();
});
