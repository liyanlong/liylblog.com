
'use strict';

const Vue = require('vue');
const LRU = require('lru-cache');
const vueServerRenderer = require('vue-server-renderer');

function createRenderer(bundle, options) {
  // https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
  return vueServerRenderer.createBundleRenderer(bundle, Object.assign(options, {
    template,
    // for component caching
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15,
    }),
    // this is only needed when vue-server-renderer is npm-linked
    basedir: resolve('./dist'),
    // recommended for performance
    runInNewContext: false,
  }));
}

class Engine {

  constructor(app) {
    this.app = app;
    this.config = app.config.vuessr || {};

    this.renderer = vueServerRenderer.createRenderer({
      template: this.config.template,
    });


    this.renderOptions = this.config.renderOptions;

    if (this.config.cache === true) {
      this.bundleCache = LRU({
        max: 1000,
        maxAge: 1000 * 3600 * 24 * 7,
      });
    } else if (typeof this.config.cache === 'object') {
      if (this.config.cache.set && this.config.cache.get) {
        this.bundleCache = this.config.cache;
      } else {
        this.bundleCache = LRU(this.config.cache);
      }
    }
  }

  createVue(vConfig) {
    return new Vue(vConfig);
  }

  createRenderer(options) {
    return vueServerRenderer.createRenderer(options);
  }


  createBundleRenderer(name, renderOptions) {
    if (this.bundleCache) {
      const bundleRenderer = this.bundleCache.get(name);
      if (bundleRenderer) {
        return bundleRenderer;
      }
    }
    const bundleRenderer = this.vueServerRenderer.createBundleRenderer(name, Object.assign({}, this.renderOptions, renderOptions));
    if (this.bundleCache) {
      this.bundleCache.set(name, bundleRenderer);
    }
    return bundleRenderer;
  }

  renderBundle(name, context, options) {
    context = context || /* istanbul ignore next */ {};
    options = options || /* istanbul ignore next */ {};

    return new Promise((resolve, reject) => {
      this.createBundleRenderer(name, options.renderOptions).renderToString(context, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  // renderString => renderToString
  renderString(tpl, locals, options) {
    const vConfig = Object.assign({ template: tpl, data: locals }, options);
    const vm = new Vue(vConfig);
    return new Promise((resolve, reject) => {
      this.renderer.renderToString(vm, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }

  // 渲染后返回 html 模板
  renderToString(vm, context = {}) {
    return new Promise((resolve, reject) => {
      this.renderer.renderToString(vm, Object.assign(context, this.config.context), (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}

module.exports = Engine;
