'use strict';

class VueSSRView {

  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
  }

  /**
   * 
   * @param {any} name file
   * @param {any} locals 
   * @returns 
   * @memberof VueSSRView
   */
  render(name, locals) {
    return new Promise((resolve, reject) => {
      this.app.vuessr.renderString(name, locals, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
  }

  renderString(tpl, locals) {
    return new Promise((resolve, reject) => {
      this.app.vuessr.renderToString(tpl, locals, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = VueSSRView;
