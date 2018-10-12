module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupTestFrameworkScriptFile: require.resolve('./jest.setup.js'),
  testMatch: ['**/*.test.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
};
