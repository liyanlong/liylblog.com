'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      yield this.ctx.render('home/index.njk', {
        title: '李彦龙的博客首页'
      });
    }
  }
  return HomeController;
};
