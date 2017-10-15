require.config({
  baseUrl: '/public/js/lib',
  paths: {
    vue: 'https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.min'
  }
});

require(['vue', 'util/env'], function (Vue, env) {
  var data = {
    isSupport: env.isNative(window.MutationObserver),
    text: 'Hello World',
    count: 0
  };
  var vm = new Vue({
    el: '#app',
    template: '#template',
    data: data,
    created: function () {
      this._textNode =  document.createTextNode(this.text);
    },
    mounted: function () {
      if (this.isSupport) {
        this.init();
      }
    },
    methods: {
      init: function () {
        this.initObserve();
      },
      initObserve: function () {
        var self = this;
        var target = this.$refs.node.querySelector('span');
        var config = { attributes: true, childList: true, characterData: true };
        var observer = new MutationObserver(function(mutations) {
          if (self.count >=  10) {
            observer.disconnect();
          } else {
            self.count++;
          }
        });
        target.appendChild(this._textNode);
        observer.observe(this._textNode, config);
      }
    },
    watch: {
      text: function (val, oldVal) {
        if (this.count < 110) {
          this._textNode.data = String(val);          
        }
      }
    }
  });
});