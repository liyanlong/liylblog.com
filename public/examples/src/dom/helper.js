define([], function () {

  /**
   * 返回元素的大小及其相对于视口的位置
   * 
   * @param {HTMLElement} element 
   * @return {object}
   */
  function getBoundingClientRect (element) {
    var rect;
    if (element.getBoundingClientRect) {
      rect = element.getBoundingClientRect();
      var clientTop = document.documentElement.clientTop; 
      var clientLeft = document.documentElement.clientLeft; 
      return {
        top : rect.top - clientTop,
        bottom : rect.bottom - clientTop,
        left : rect.left - clientLeft,
        right : rect.right - clientLeft,
        width: rect.width,
        height: rect.height
      };
    }
    return getCompatibleBoundingClientRect(element);
  }

  function getCompatibleBoundingClientRect (element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('[dom/helper.js] getCompatibleBoundingClientRect() typeError, required HTMLElement');
    }
    var top = 0,
      right = 0, 
      bottom = 0,
      left = 0,
      width = element.offsetWidth,
      height = element.offsetHeight,
      el = element;

    while(el) {
      left += el.offsetLeft || 0;
      top += el.offsetTop || 0;
      el = el.offsetParent;
    }

    return {
      left: left,
      top: top,
      right: left + width,
      bottom: top + height,
      width: width,
      height: height
    };
  }

  return {
    getBoundingClientRect: getBoundingClientRect,
    getCompatibleBoundingClientRect: getCompatibleBoundingClientRect
  }

});