'use strict';

const Vue_SSR_Engine = require('../../lib/vuessr/engine');
const VUE_SSR_ENGINE = Symbol('Application#vuessr');

module.exports = {

  get vuessr() {
    if (!this[VUE_SSR_ENGINE]) {
      this[VUE_SSR_ENGINE] = new Vue_SSR_Engine(this);
    }
    return this[VUE_SSR_ENGINE];
  },
};
