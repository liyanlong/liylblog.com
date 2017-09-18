'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_1503458409524_3029';

  // add your config here
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, '/public'),
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks'
    }
  };

  return config;
};
