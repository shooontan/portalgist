const withTypescript = require('@zeit/next-typescript');
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = withTypescript(
  withBundleAnalyzer({
    // browser env
    publicRuntimeConfig: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    },
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../analyze/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../analyze/client.html',
      },
    },
    webpack(config) {
      if (
        config.optimization.splitChunks &&
        config.optimization.splitChunks.cacheGroups
      ) {
        config.optimization.splitChunks.cacheGroups = {
          ...config.optimization.splitChunks.cacheGroups,
          firebase: {
            name: 'firebase',
            chunks: 'all',
            test: /\/node_modules\/@firebase/,
          },
          'monaco-editor': {
            name: 'monaco-editor',
            chunks: 'all',
            test: /\/node_modules\/monaco-editor/,
          },
        };
      }

      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });

      config.plugins.push(
        new MonacoWebpackPlugin({
          output: 'static', // next.js static dir for monaco-editor
          languages: ['javascript', 'typescript'],
        })
      );

      config.output = {
        ...config.output,
        publicPath: '/_next', // next.js base url for monaco-editor
      };

      return config;
    },
  })
);
