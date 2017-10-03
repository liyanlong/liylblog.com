requirejs.config({
  baseUrl: '/public/js/lib',
  paths: {
    app: '../app',
  },
  deps: [ 'monitor/rollbar' ]
});

requirejs.onError = function(err) {
  throw err;
};

requirejs([ 'app/main' ], function(app) {
  app.start();
});
