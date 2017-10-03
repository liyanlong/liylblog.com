'use strict';

const fs = require('fs');
const path = require('path');
module.exports = app => {
  if (app.config.vuessr) {
    const ssrConfig = app.config.vuessr;
    ssrConfig.template = fs.readFileSync(
      path.resolve(
        ssrConfig.root,
        ssrConfig.templateFile || 'index.template.html'
      ),
      ssrConfig.charset || 'utf-8');
  }
};
