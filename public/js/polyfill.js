if (!Function.prototype.bind) {
  Function.prototype.bind = function(context) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5
      // internal IsCallable function
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
    }

    var aArgs = Array.prototype.slice.call(arguments, 1),
      fToBind = this,
      fNOP = function() {},
      fBound = function() {
        fBound.prototype = this instanceof fNOP ? new fNOP() : fBound.prototype;
        return fToBind.apply(this instanceof fNOP
          ? this
          : context || this,
        aArgs);
      };
    // aArgs.concat(Array.prototype.slice.call(arguments));why use concat method instead of aArgs here
    if (this.prototype) {
      // Function.prototype doesn't have a prototype property
      fNOP.prototype = this.prototype;
    }

    return fBound;
  };
}
