define(['src/utils/qs'], function(qs) {

  beforeAll(function () {
    spyOn(qs, 'parse').and.callThrough();
    spyOn(qs, 'stringify').and.callThrough();
  });

  describe('qs.parse() suite', function() {

    it('should throw TypeError', function() {
      expect(qs.parse).toThrowError(TypeError);
    });

    it('should parse to object', function () {
      var url = 'http://liylblog.com/?a=1&b=2&c=3';
      expect(qs.parse(url)).toEqual({
        a: '1',
        b: '2',
        c: '3'
      });
    });

    it('should parse to object array', function () {
      var url = 'http://liylblog.com/?a[]=1&a[]=2&a[]=3';
      expect(qs.parse(url)).toEqual({
        a: ['1', '2', '3']
      });
    });

    it('should be decodeURIComponent', function () {
      var aVal = window.encodeURIComponent('=1');
      var bVal = window.encodeURIComponent('?2');
      var url = 'http://liylblog.com/?a=' + aVal + '&b=' + bVal + '&c=3#';
      expect(qs.parse(url)).toEqual({
        a: '=1',
        b: '?2',
        c: '3'
      });
    });

  });

  describe('qs.stringify() suite', function () {
    var obj;

    beforeEach(function () {
      obj = {
        a: 1,
        b: ['你好', '世界'],
        c: ['2', null, '']
      };
    });
    
    afterEach(function () {
      obj = null;
    });

    it('should throw TypeError', function() {
      expect(qs.stringify).toThrowError(TypeError);
    });

    it('should stringify obj', function () {
      var querystring = qs.stringify(obj); 
      var containB = (function () {
        var str = ''
        for (var i = 0, len = obj['b'].length; i < len; i++) {
          str += i > 0 ? '&' : ''
          str += 'b[]=' + encodeURIComponent(obj['b'][i])
        }
        return str;
      })();
      var containC = 'c[]=null';

      expect(querystring).toContain('a=1')
      expect(querystring).toContain(containB);
      expect(querystring).toContain(containC);
    });

  });
});
