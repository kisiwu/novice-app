const Log = require('@novice1/logger').debugger('@novice1/app:test'),
      router = require('@novice1/routing')(),
      Frmwrk = require('../../index');

describe("Starting server", () => {

  var app, server;

  router.get('/', (req, res) => {
    res.status.json('ok');
  }).put('/', (req, res) => {
    res.status.json('ok');
  });

  it("should init app with config", function() {
    app = Frmwrk({
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

  it("should add more config (app.addConfig, app.set, app.)", function() {
    app.addConfig({
      routers: router
    });
  });

  it("should set (set, disable, enable)", function() {
    app.disable('x-powered-by');
    app.set('env', 'test');
    Log.info(`env: %s`, app.get('env'));
    Log.info(`x-powered-by disabled: %o`, app.disabled('x-powered-by'));
  });

  it("shoud start server on localhost:8080 (app.listen)", function(done) {
    var port = 8080, ip = '0.0.0.0'
    server = app.listen(port, ip, function(noviceapp) {
      Log.info(`Application worker ${process.pid} started...`);
      expect(noviceapp.meta)
      .to.be.an('array', `'.meta' is not an array`)
      .that.has.lengthOf(2, `'.meta' has not a length of 2`);
      done();
    });
  });

  it("shoud stop server (server.close)", function(done) {
    server.close(() => {
      Log.info(`Application stopped`);
      done();
    });
  });
});
