import routing from '@novice1/routing';
import http, { Server } from 'http';
import { FrameworkApp } from '../../src/index';
import { expect } from 'chai';

describe('Starting server', function() {

  const { logger: Log } = this.ctx.kaukau;

  let app: FrameworkApp, server: Server;
  const router = routing();

  router.get('/', (_req, res) => {
    res.status(200).json('ok');
  }).put('/', (_req, res) => {
    res.status(200).json('ok');
  });

  it('should init app with config', function() {
    app = new FrameworkApp({
      framework: {
        auth: [
          (_req, _res, next) => {
            next();
          },
          (_req, _res, next) => {
            next();
          }
        ],
        validators: []
      }
    })
  });

  it('should add more config (app.addOptions, app.set, app.)', function() {
    app.addOptions({
      routers: [router]
    });
  });

  it('should set (set, disable, enable)', function() {
    app.set('env', 'test');
    expect(app.get('env')).to.equal('test');

    app.disable('x-powered-by');
    expect(app.disabled('x-powered-by')).to.equal(true);
    expect(app.enabled('x-powered-by')).to.equal(false);

    app.enable('x-powered-by');
    expect(app.disabled('x-powered-by')).to.equal(false);
    expect(app.enabled('x-powered-by')).to.equal(true);
  });

  it('shoud start server on localhost:8080 (app.listen)', function(done) {
    const port = 8080;
    const ip = '0.0.0.0';
    server = app.build(null, http);
    /*server = */app.listen(port, ip, () => {
      Log.info(`Application worker ${process.pid} started...`);
      console.log(app.meta)
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
