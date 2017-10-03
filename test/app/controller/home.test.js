'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/home.test.js', () => {

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect(200);
  });

  it('should GET /vuessr', function* () {
    return app.httpRequest()
      .get('/')
      .expect(200);
  });
});
