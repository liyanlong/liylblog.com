'use strict';

module.exports = {

  linkFor(pathUrl, version) {
    const request = this.ctx.request;
    const config = (this.config.helper || {}).link || {};
    const useCdn = config.useCdn || false;
    let originUrl = useCdn ? '' : config.originUrl || request.origin;
    const prefix = useCdn ? '' : this.config.static.prefix || '';
    const exp = /^https?:\/\/.+/;
    let arr = [];

    originUrl = originUrl.substr(-1) !== '/' ? originUrl + '/' : originUrl;
    version = version ? version : config.version || '';

    function _link(url) {
      if (!exp.test(url)) {
        url = (originUrl + '/' + prefix + '/' + url).replace(/([^:])\/+/g, '$1/');
      }
      return `<link rel="stylesheet" type="text/css" href="${url + (version ? '?v=' + version : '')}" />`;
    }

    if (!Array.isArray(pathUrl)) {
      pathUrl = [ pathUrl ];
    }
    arr = pathUrl.map(_link);
    return arr.join('');

  },
};
