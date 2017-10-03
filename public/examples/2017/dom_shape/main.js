requirejs.config({
  baseUrl: '/public/js/lib',
  paths: {
    app: '../app',
  }
});

// Start the main app logic.
requirejs(['util/dom'], function(helper) {
  const box1 = document.querySelector('#box-1');
  const box2 = document.querySelector('#box-2');
  console.log(helper.getBoundingClientRect(box1));
  console.log(helper.getBoundingClientRect(box2));
});
