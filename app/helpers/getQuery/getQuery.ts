import url from 'url';
import querystring from 'querystring';

const getQuery = () => {
  const { href } = window.location;
  const parsedUrl = url.parse(href);
  const query = querystring.parse(parsedUrl.query);
  return query;
};

export default getQuery;
