import Octokit from '@octokit/rest';

const octokit = new Octokit({
  timeout: 5000,
});

export default octokit;
