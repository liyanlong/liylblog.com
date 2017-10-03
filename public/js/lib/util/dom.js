define([], function () {

  /**
   * 返回元素的大小及其相对于视口的位置
   * 
   * @param {HTMLElement} element 
   * @return {object}
   */
  function getBoundingClientRect(element) {
    let rect;
    if (element.getBoundingClientRect) {
      rect = element.getBoundingClientRect();
      const clientTop = document.documentElement.clientTop;
      const clientLeft = document.documentElement.clientLeft;
      return {
        top: rect.top - clientTop,
        bottom: rect.bottom - clientTop,
        left: rect.left - clientLeft,
        right: rect.right - clientLeft,
        width: rect.width,
        height: rect.height,
      };
    }
    return getCompatibleBoundingClientRect(element);
  }

  function getCompatibleBoundingClientRect(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('[dom/helper.js] getCompatibleBoundingClientRect() typeError, required HTMLElement');
    }
    let top = 0,
      right = 0,
      bottom = 0,
      left = 0,
      width = element.offsetWidth,
      height = element.offsetHeight,
      el = element;

    while (el) {
      left += el.offsetLeft || 0;
      top += el.offsetTop || 0;
      el = el.parentNode;
    }

    return {
      left,
      top,
      right: left + width,
      bottom: top + height,
      width,
      height,
    };
  }

  function getWindowScrollOffsets() {
    var w = window;
    var sLeft, sTop;
    if (w.pageXOffset != null) {
      sLeft = w.pageXOffset;
      sTop = w.pageYOffset;
      return { x: sLeft, y: sTop };
    }
    if (document.compatMode == "CSS1Compat") {
      sLeft = document.documentElement.scrollLeft === 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
      sTop = document.documentElement.scrollTop === 0 ? document.body.scrollTop : document.documentElement.scrollTop;
      return { x: sLeft, y: sTop };
    } else if (document.compatMode == "BackCompat") {
      sLeft = document.body.scrollLeft;
      sTop = document.body.scrollTop;
      return { x: sLeft, y: sTop };
    }
  }

  // 
  function getScrollOffsets (el) {
    if (el === window) {
      return getWindowScrollOffsets();
    }
    var element = el;
    var result = {
      x: 0,
      y: 0
    };
    var parent = document.body.parentNode;
    while (element && element != parent) {
      result.x = result.x + element.scrollLeft;
      result.y = result.y + element.scrollTop;
      element = element.parentNode;
    }
    return result;
  }

  function getPageOffset (el) {
    var scrollOffset = getWindowScrollOffsets();
    var rect = getBoundingClientRect(el);
    var element = el;

    return {
      x: scrollOffset.x + rect.left,
      y: scrollOffset.y + rect.top
    }
  }

  return {
    getBoundingClientRect: getBoundingClientRect,
    getCompatibleBoundingClientRect: getCompatibleBoundingClientRect,
    getWindowScrollOffsets: getWindowScrollOffsets,
    getScrollOffsets: getScrollOffsets,
    getPageOffset: getPageOffset
  };

});
