define(function(require) {
  const location = window.location;
  function getRoute() {
    let route = location.pathname.split('/').filter(function(path) {
      return path !== '';
    }).join('/');

    if (!route) {
      route = 'home';
    }
    return 'app/' + route;
  }
  return {
    start() {
      const route = getRoute();
      if (route) {
        requirejs([ route ]);
      }
    },
  };
});
