'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      yield this.ctx.render('home/index.njk', {
      });
    }

    * vuessr() {
      const vm = this.app.vuessr.createVue({
        data: {
          url: this.ctx.req.url,
        },
        template: '<div>访问的 URL 是： {{ url }}</div>',
      });
      this.ctx.body = yield this.app.vuessr.renderToString(vm);
    }
  }
  return HomeController;
};
