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
    maxAge: 0,
    buffer: false,
  };

  config.helper = {
    link: {
      version: '20170929',
      useCdn: false,
      cdnUrl: 'http://static.liylblog.com/',
    },
  };

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks',
    },
  };

  config.nunjucks = {
    autoescape: false,
  };

  config.vuessr = {
    root: path.join(appInfo.baseDir, '/resources'),
    templateFile: 'index.template.html',
    context: {
      title: '李彦龙的博客',
    },
  };

  return config;
};

