import Octokit from '@octokit/rest';

const octokit = new Octokit({
  timeout: 5000,
});

export default octokit;

export const authenticate = (accessToken: string | null) => {
  if (accessToken) {
    octokit.authenticate({
      type: 'token',
      token: accessToken,
    });
  } else {
    octokit.authenticate(null);
  }
};
