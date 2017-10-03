require.config({
  baseUrl: '/public/js/lib'
});

requirejs(['util/dom'], function (dom) {
  var last_known_scroll_position = 0;
  var ticking = false;
  var boxList = document.querySelectorAll('.box');
  var scroll = document.querySelector('.scroll');

  window.addEventListener('scroll', function(e) {
    last_known_scroll_position = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function() {
        caculatePosition(last_known_scroll_position);
        ticking = false;
      });
    }
    ticking = true;
  });
  scroll.scrollIntoView(false);
  scroll.addEventListener('mousewheel', function (event) {
    var el = scroll;
    var scrollTop = el.scrollTop;
    var scrollHeight = el.scrollHeight;
    var clientHeight = el.clientHeight;
    if (event.deltaY > 0 && el.scrollTop + clientHeight >= scrollHeight) {
      event.preventDefault();      
    }
    el = null;
  });

  function caculatePosition (scroll_pos) {
    var output = document.querySelector('.output');
    var content = '';
    boxList.forEach(function (box) {
      var offset = dom.getPageOffset(box);
      content += '<p>' +  box.getAttribute('name') + JSON.stringify(offset) + '</p>';
    });
    output.innerHTML = content;
  }

  caculatePosition();

});