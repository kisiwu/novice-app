const express = require('express');
const http = require('http');
const methods = require('methods');
const NoviceParameters = require('@novice1/parameters');
const Log = require('@novice1/logger').debugger('@novice1/app');
const Routing = require('@novice1/routing');

const cfgFramework = require('./config/framework');
const frameworkMiddlewares = require('./middlewares');

const RESULT_METHODS = [
  'build',
  'listen',
  'getParameter',
  'resolveWithParameters',
  'getParametersBag',
  'disable',
  'disabled',
  'enable',
  'enabled',
  'set',
].concat(methods.concat('all'));

const CHAIN_METHODS = [
  'addConfig',
  'setParameter'
];


/**
 * 
 * @param {object} [config] 
 */
function FrameworkApp(config) {
  if(!(this instanceof FrameworkApp)) {
    return new FrameworkApp(config);
  }

  var app = this;

  this.built = false;
  this.isBuilding = false;
  this.parametersBag = new NoviceParameters();
  /**
   * @description Used to easily access children routes' data (meta, ...).
   */
  this.mainRouter = Routing();
  /**
   * @description Used to enable route methods (get, post, ...) directly from app.
   * When initialized it will be a child of 'mainRouter' (see '_initLazyrouter').
   */
  this.lazyrouter;
  this.config = {
    framework: {
      middlewares: [],
      view: {}
    },
    services: {
    },
    parameters: {
    },
    routers: []
  };

  this.express = express();

  this.server;

  this.addConfig(config);


  var noviceapp = function(){
  };
  
  CHAIN_METHODS
  .concat(RESULT_METHODS)
  .sort()
  .forEach(
    method => {
      noviceapp[method] = function() {
        var args = Array.prototype.slice.call(arguments);

        // edit args for 'listen' method
        if(method === 'listen') {
          args = args.map( arg => {
            if(typeof arg === 'function') {
              return function(){
                arg(noviceapp);
              };
            }
            return arg;
          });
        }

        var v = app[method].apply(app, args);
        // if chain method
        if (CHAIN_METHODS.includes(method) || v instanceof FrameworkApp) {
          v = noviceapp;
        }
        return v;
      }
    }
  );

  Object.defineProperties(noviceapp, {
    meta: {
      enumerable: true,
      configurable: false,
      get: () => {
        return app.mainRouter.getMeta()
      }
    },
    parameters: {
      enumerable: true,
      configurable: false,
      get: () => {
        return app.getParametersBag();
      }
    },
    server: {
      enumerable: true,
      configurable: false,
      get: () => {
        return app.server;
      }
    }
  });

  return noviceapp;

}

FrameworkApp.prototype._registerRouter = function(router) {
  if (
    this.config.framework.validators && this.config.framework.validators.length
    && typeof router.setValidatorsIfNone === 'function') {
    router.setValidatorsIfNone(this.config.framework.validators);
  }
  if (
    this.config.framework.auth && this.config.framework.auth.length
    && typeof router.setAuthHandlersIfNone === 'function') {
    router.setAuthHandlersIfNone(this.config.framework.auth);
  }
  this.mainRouter.use(router);
}

FrameworkApp.prototype._buildParameters = function() {
  this.parametersBag = new NoviceParameters(this.config.parameters);
  this.parametersBag.resolveAll();
}

FrameworkApp.prototype._buildFramework = function() {
  // register main router
  this.express.use(this.mainRouter);

  // register framework's middlewares
  this.mainRouter.use(frameworkMiddlewares(this));

  // register user's middlewares
  if(this.config.framework.middlewares.length) {
    this.mainRouter.use(this.config.framework.middlewares);
  }
}

FrameworkApp.prototype._buildRoutes = function() {
  // register routers
  this.config.routers.forEach(
    router => {
      this._registerRouter(router);
    }
  );
  // @todo : register public directory
  // this.mainRouter.use(express.static(...));
}

FrameworkApp.prototype.addFrameworkConfig = function(o) {
  var cfg = this.config['framework'];
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(
      key => {
        switch (key) {
          case 'auth':
          case 'validators':
          case 'middlewares':
          /**
           * @todo check if one of those is really usefull and how
          case 'view':
          case 'locals':
          case 'docs':
          */
            cfg[key] = cfgFramework[key](cfg[key], o[key]);
            break;
          default:
            break;
        }
      }
    );
  }
  return this;
}

FrameworkApp.prototype.addParametersConfig = function(parameters) {
  if (parameters && typeof parameters === 'object') {
    Object.keys(parameters).forEach(
      key => {
        this.config.parameters[key] = parameters[key];
      }
    );
  }
  return this;
}

/**
 * @todo make possible to add routers even when 'built' is true
 * @param {*} routers 
 */
FrameworkApp.prototype.addRouters = function(routers) {
  if (!this.built) {
    if (routers) {
      if (Array.isArray(routers)) {
        routers.forEach(
          router => {
            this.config.routers.push(router);
          }
        );
      } else {
        this.config.routers.push(routers);
      }
    }
  } else {
    if (routers) {
      if (Array.isArray(routers)) {
        routers.forEach(
          router => {
            this._registerRouter(router);
          }
        );
      } else {
        this._registerRouter(routers);
      }
    }
  }
  return this;
}

// add parameters, routers, services and/or framework config into config
FrameworkApp.prototype.addConfig = function(o) {
  if (o && typeof o === 'object') {
    Object.keys(o).forEach(
      key => {
        switch (key) {
          case 'framework':
            this.addFrameworkConfig(o[key]);
            break;
          case 'parameters':
            this.addParametersConfig(o[key]);
            break;
          case 'routers':
            this.addRouters(o[key]);
            break;
          default:
            break;
        }
      }
    );
  }
  return this;
}

// build the app with the config and
FrameworkApp.prototype.build = function(serverOptions) {
  if(!this.server) {
    this.isBuilding = true;

    this._buildParameters();

    this._buildFramework();

    this._buildRoutes();

    this.build = true;
    this.isBuilding = false;

    this.server = http.createServer(serverOptions, this.express);
  }

  return this.server;
}

FrameworkApp.prototype.listen = function() {
  var args = Array.prototype.slice.call(arguments);
  var server = this.build();
  return server.listen.apply(server, args);
}

// --- PARAMETERS METHODS --- //

/**
 * 
 * @param {string} name 
 * @param {any} value 
 */
FrameworkApp.prototype.setParameter = function(name, value) {
  this.parametersBag.set(name, value);
  return this;
}

/**
 * 
 * @param {string} name 
 */
FrameworkApp.prototype.getParameter = function(name) {
  return this.parametersBag.get(name);
}

/**
 * 
 * @param {any} value 
 */
FrameworkApp.prototype.resolveWithParameters = function(value) {
  return this.parametersBag.resolve(value);
}

FrameworkApp.prototype.getParametersBag = function() {
  return this.parametersBag;
}

/* --- EXPRESS METHODS --- */
FrameworkApp.prototype.disable = function() {
  return this.express.disable.apply(this.express, Array.prototype.slice.call(arguments));
}

FrameworkApp.prototype.disabled = function() {
  return this.express.disabled.apply(this.express, Array.prototype.slice.call(arguments));
}

FrameworkApp.prototype.enable = function() {
  return this.express.enable.apply(this.express, Array.prototype.slice.call(arguments));
}

FrameworkApp.prototype.enabled = function() {
  return this.express.enabled.apply(this.express, Array.prototype.slice.call(arguments));
}

FrameworkApp.prototype.set = function() {
  return this.express.set.apply(this.express, Array.prototype.slice.call(arguments));
}

/* --- ROUTING METHODS --- */

FrameworkApp.prototype._initLazyrouter = function() {
  if(!this.lazyrouter) {
    this.lazyrouter =  Routing();
    this.addRouters(this.lazyrouter);
  }
}

methods.concat('all').forEach(function(method){
  FrameworkApp.prototype[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this._initLazyrouter();

    this.lazyrouter[method].apply(this.lazyrouter, Array.prototype.slice.call(arguments));
    return this;
  };
});

module.exports = FrameworkApp;