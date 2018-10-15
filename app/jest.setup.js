require('jest-dom/extend-expect');
require('react-testing-library/cleanup-after-each');
require('jest-styled-components');

/**
 * if no this config, warn error following.
 *
 * TypeError: Cannot read property 'publicRuntimeConfig' of undefined
 *
 * https://github.com/zeit/next.js/issues/4024
 */
const { setConfig } = require('next/config');
const { publicRuntimeConfig } = require('./next.config');
setConfig({ publicRuntimeConfig });
