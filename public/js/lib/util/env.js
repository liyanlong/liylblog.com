/**
 * @module util/env
 */

define(function (require, exports, module) {
  
  /**
   * 
   * @param {constructor} Ctor 
   * @returns 
   */
  exports.isNative = function  isNative (Ctor) {
    return /native code/.test(Ctor.toString())
  };

  

});