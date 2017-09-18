
exports.static_url = function (url) {
  const env = this.ctx.ctx.app.env
  if (env === 'prod') {
    return 'http://static.liylblog.com/' + url;
  }
  return '/public/static/' + url;
};