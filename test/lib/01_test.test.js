const router = require('@novice1/routing')(),
      { FrameworkApp } = require('../../lib/index');

describe('Starting server', function() {

  let app, server;
  const { logger: Log } = this.ctx.kaukau;

  router.get('/', (req, res) => {
    res.status.json('ok');
  }).put('/', (req, res) => {
    res.status.json('ok');
  });

  it('should init app with config', function() {
    app = new FrameworkApp({
      framework: {
        auth: [
          (req, res, next) => {
            next();
          },
          (req, res, next) => {
            next();
          }
        ],
        validators: []
      }
    })
  });

  it('should add more config (app.addOptions, app.set, app.)', function() {
    app.addOptions({
      routers: router
    });
  });

  it('should set (set, disable, enable)', function() {
    app.disable('x-powered-by');
    app.set('env', 'test');
    Log.info('env:', app.get('env'));
    Log.info('x-powered-by disabled:', app.disabled('x-powered-by'));
  });

  it('shoud start server on localhost:8080 (app.listen)', function(done) {
    var port = 8080, ip = '0.0.0.0'
    server = app.listen(port, ip, function() {
      Log.info(`Application worker ${process.pid} started...`);
      expect(app.meta)
      .to.be.an('array', '\'.meta\' is not an array')
      .that.has.lengthOf(2, '\'.meta\' has not a length of 2');
      done();
    });
  });

  it('shoud stop server (server.close)', function(done) {
    server.close(() => {
      Log.info('Application stopped');
      done();
    });
  });
});
