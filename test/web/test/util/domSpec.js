define([ 'util/dom' ], function(dom) {

  describe('dom rectangle suite', function() {
    let _oldHTML;
    let el;
    let rect;
    let compatibleRect;
    beforeAll(function() {
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

    afterAll(function() {
      el = null;
      document.body.innerHTML = _oldHTML;
    });

    beforeEach(function() {
      rect = dom.getBoundingClientRect(el);
      compatibleRect = dom.getCompatibleBoundingClientRect(el);
    });

    afterEach(function() {
      rect = null;
      compatibleRect = null;
    });

    it('should return getBoundingClientRect()', function() {
      expect(rect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
      expect(rect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
    });

    it('should return getCompatibleBoundingClientRect()', function() {
      expect(compatibleRect.width).toBeGreaterThanOrEqual(100 + 10 * 2);
    });

    it('should getBoundingClientRect() equal getCompatibleBoundingClientRect()', function() {
      expect(rect).toEqual(compatibleRect);
    });

    describe('nest box', function() {
      let elBox;
      let rect;
      let compatibleRect;
      beforeAll(function() {
        elBox = document.body.querySelector('#box');
      });

      afterAll(function() {
        elBox = null;
      });

      beforeEach(function() {
        rect = dom.getBoundingClientRect(elBox);
        compatibleRect = dom.getCompatibleBoundingClientRect(elBox);
      });

      afterEach(function() {
        compatibleRect = rect = null;
      });

      it('should return getBoundingClientRect()', function() {
        expect(rect.top).toEqual(elBox.offsetTop);
      });

      it('should return getCompatibleBoundingClientRect()', function() {
        expect(compatibleRect.top).toEqual(elBox.offsetTop);
      });

    });

  });

  describe('dom scroll suite', function () {
    let elContainer;
    let elBox;

    beforeAll(function() {
      document.body.innerHTML = `
        <div id="container" style="width:100px;height:900px;overflow:scroll;">
          <div id="box" style="width:200px; height:1800px; padding: 100px; border:1px solid;"> box </div>
        </div>
      `;
      elContainer = document.querySelector('#container');
      elBox = document.querySelector('#box');
    });
    beforeEach(function () {
      elContainer.offsetTop = 0;
      window.scrollBy(0, 100);
    });
    it('box width ', function () {
      elContainer.scrollTop = 10;
      console.log(dom.getScrollOffsets(elContainer));
    });
  });
});
