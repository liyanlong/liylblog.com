define(function () {

  var encodeURIComponent = window.encodeURIComponent;
  var decodeURIComponent = window.decodeURIComponent;

  function isArray (o) {
    return Object.prototype.toString.call(o) === '[object Array]';
  }
 
  function isObject (o) {
    return Object.prototype.toString.call(o) === '[object Object]';    
  }
  
  return {
    parse: function (url) {

      if (typeof url !== 'string') {
        throw new TypeError('qs.parse() Error, url should transmit a string param');
      }

      var result = {};
      url = url.substr(url.indexOf('?') + 1);
      var querystring = url.replace(/#.*/, '');
      var patterns = querystring.split('&');

      patterns.forEach(function(pattern) {
        if (!pattern) {
          return;
        }
        var matched = pattern.match(/([^=]+)=(.*)/);
        if (!matched) {
          return;
        }
        var key = matched[1],
          value = matched[2],
          isArr = false;

        if (key.slice(-2) === '[]') {
          key = key.slice(0, -2);
          isArr = true;
        }

        key = decodeURIComponent(key);
        value = decodeURIComponent(value);

        if (isArr) {
          if (!Array.isArray(result[key])) {
            result[key] = [];    
          }
          result[key].push(value);
        } else {
          result[key] = value;
        }
      }, this);

      return result;
    },

    stringify: function (obj) {

      if (!isObject(obj)) {
        throw new TypeError('qs.stringify() Error, Unexpected obj is not Object');
      }

      return Object.keys(obj).map(function (name, index) {
        if (isArray(obj[name])) {
          return obj[name].map(function (item) {
            return encodeURIComponent(name) + '[]=' + encodeURIComponent(item); 
          }).join('&');
        }
        return encodeURIComponent(name) + '=' + encodeURIComponent(obj[name]);
      }).join('&');
    }
  }
});