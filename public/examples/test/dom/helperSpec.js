define(['src/dom/helper'], function (helper) {

  describe('dom rectangle suite', function () {
    var _oldHTML;
    var el;
    var rect;
    var compatibleRect;
    beforeAll(function () {
      _oldHTML = document.body.innerHTML;
      document.body.innerHTML = `
        <style>
          .container {border: 1px solid; width: 100px; height:100px; padding: 10px; margin: 10px;}
          .box {border: 1px solid; width: 50%; height: 50%; margin: 10px;}
        </style>
        <div id= "container" class="container">
          <div class="box" id="box">
            <div class="box" id="inner-box"></div>
          </div>
        </div>
      `;
      el = document.body.querySelector('#container');
    });
  
    afterAll(function () {
      // document.body.innerHTML = _oldHTML;
      el = null;
    });

    beforeEach(function () {
      rect = helper.getBoundingClientRect(el);
      compatibleRect = helper.getCompatibleBoundingClientRect(el);
    });

    afterEach(function () {
      rect = null;
      compatibleRect = null;
    });

    it('should return getBoundingClientRect()', function () {
      expect(rect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
      expect(rect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
    });
    
    it('should return getCompatibleBoundingClientRect()', function () {
      expect(compatibleRect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
    });
    
    it('should getBoundingClientRect() equal getCompatibleBoundingClientRect()', function () {
      expect(rect).toEqual(compatibleRect);
    });

    describe('nest box', function () {
      var elBox;
      var rect;
      var compatibleRect;
      beforeAll(function() {
        elBox = document.body.querySelector('#box');
      });

      afterAll(function () {
        elBox = null;
      });

      beforeEach(function () {
        rect = helper.getBoundingClientRect(elBox);
        compatibleRect = helper.getCompatibleBoundingClientRect(elBox);
      });

      afterEach(function () {
        compatibleRect = rect = null;
      });

      it('should return getBoundingClientRect()', function () {
        expect(rect.top).toEqual(elBox.offsetTop);
      });

      it('should return getCompatibleBoundingClientRect()', function () {
        expect(compatibleRect.top).toEqual(elBox.offsetTop);
      });

    });

  });
});