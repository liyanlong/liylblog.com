requirejs.config({
  baseUrl: '',
  paths: {
    src: '../../src',
    lib: '../../../static/lib',
    app: '../../../js'
  },
  deps: ['app/monitor/rollbar'], 

});

// Start the main app logic.
requirejs(['src/dom/helper'], function (helper) {
  var box1 = document.querySelector('#box-1');
  var box2 = document.querySelector('#box-2');
  console.log(helper.getBoundingClientRect(box1));
  console.log(helper.getBoundingClientRect(box2));
});