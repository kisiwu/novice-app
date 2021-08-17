import http from 'http';
import net from 'net';
import express from 'express';
import core from 'express-serve-static-core';
import routing, { IRouter, RequestHandler, RouteMeta } from '@novice1/routing';
import { addReplyMiddleware } from './middlewares/reply';

export interface Options {
  framework?: {
    auth?: RequestHandler[];
    middlewares?: (core.RequestHandler | core.RequestHandlerParams)[];
    validators?: RequestHandler[];
  };
  routers?: IRouter[]
}

export interface IApp {
  get meta(): RouteMeta[];
  get server(): http.Server | undefined;
  addRouters(routers: IRouter[] | IRouter): IApp;
  addOptions(options: Options): IApp;
  build(options?: http.ServerOptions): http.Server;
  disable(setting: string): IApp;
  enable(setting: string): IApp;
  disabled(setting: string): boolean;
  enabled(setting: string): boolean;
  on(event: string, callback: (parent: core.Application) => void): IApp;
}

/**
 * Abstract application
 */
export abstract class BaseApp implements IApp {
  #config: Options = {};
  #server?: http.Server;

  #isBuilding = false;
  #isBuilt = false;

  protected __app: express.Application;
  protected __router: IRouter;


  /**
   * Express Application
   */
  get _app(): express.Application {
    return this.__app;
  }

  /**
   * Main router
   */
  get _router(): IRouter {
    return this.__router;
  }

  get building(): boolean {
    return this.#isBuilding;
  }

  get built(): boolean {
    return this.#isBuilt;
  }

  get meta(): RouteMeta[] {
    return this.__router.getMeta();
  }

  get server(): http.Server | undefined {
    return this.#server;
  }

  constructor(options?: Options) {
    this.__app = express();
    this.__router = routing();
    this.addOptions(options || {});
  }

  private _registerRouter(router: IRouter): void {
    if (
      this.#config?.framework?.validators?.length
      && typeof router.setValidatorsIfNone === 'function') {
      router.setValidatorsIfNone(this.#config.framework.validators);
    }
    if (
      this.#config?.framework?.auth?.length
      && typeof router.setAuthHandlersIfNone === 'function') {
      router.setAuthHandlersIfNone(this.#config.framework.auth);
    }
    this.__router.use(router);
  }

  private _buildFramework(): void {
    // register main router
    this.__app.use(this.__router);

    // register framework's middlewares
    this.__router.use(addReplyMiddleware(this));

    // register user's middlewares
    if (this.#config.framework?.middlewares?.length) {
      this.__router.use(...this.#config.framework.middlewares);
    }
  }

  private _buildRoutes(): void {
    this.#config.routers?.forEach(
      router => {
        this._registerRouter(router);
      }
    );
  }

  addOptions(options: Options): BaseApp {
    if (options && typeof options === 'object') {
      if (options.framework) {
        //this.addFrameworkConfig(options.framework);
      }
      if (options.routers) {
        this.addRouters(options.routers);
      }
    }
    return this;
  }

  addRouters(routers: IRouter[] | IRouter): BaseApp {
    if (!this.built) {
      if (routers) {
        if (Array.isArray(routers)) {
          routers.forEach(
            router => {
              this.#config.routers = this.#config.routers || [];
              this.#config.routers.push(router);
            }
          );
        } else {
          this.#config.routers = this.#config.routers || [];
          this.#config.routers.push(routers);
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

  build(options?: http.ServerOptions): http.Server {
    if (!this.#server /*&& !this.#isBuilding*/) {
      this.#isBuilding = true;

      this._buildFramework();

      this._buildRoutes();

      this.#isBuilt = true;
      this.#isBuilding = false;

      this.#server = http.createServer(options || {}, this.__app);
    }

    return this.#server;
  }

  listen(port?: number, hostname?: string, backlog?: number, listeningListener?: () => void): http.Server;
  listen(port?: number, hostname?: string, listeningListener?: () => void): http.Server;
  listen(port?: number, backlog?: number, listeningListener?: () => void): http.Server;
  listen(port?: number, listeningListener?: () => void): http.Server;
  listen(path: string, backlog?: number, listeningListener?: () => void): http.Server;
  listen(path: string, listeningListener?: () => void): http.Server;
  listen(options: net.ListenOptions, listeningListener?: () => void): http.Server;
  listen(handle: unknown, backlog?: number, listeningListener?: () => void): http.Server;
  listen(handle: unknown, listeningListener?: () => void): http.Server;
  listen(
    a1?: number | string | net.ListenOptions,
    a2?: string | number | (() => void),
    a3?: number | (() => void),
    a4?: () => void): http.Server {
    const server = this.build();
    let r: http.Server;
    if (typeof a1 === 'number') {
      if (typeof a2 === 'string') {
        if (typeof a3 === 'number') {
          // 1
          r = server.listen(a1, a2, a3, a4);
        } else {
          // 2
          r = server.listen(a1, a2, a3);
        }
      } else if (typeof a2 === 'number') {
        if (typeof a3 === 'function') {
          // 3-8
          r = server.listen(a1, a2, a3);
        } else {
          // 3-8
          r = server.listen(a1, a2);
        }
      } else {
        // 4-9
        r = server.listen(a1, a2);
      }
    } else if (typeof a1 === 'string') {
      if (typeof a2 === 'number') {
        if (typeof a3 === 'function') {
          // 5-8
          r = server.listen(a1, a2, a3);
        } else {
          // 5-8
          r = server.listen(a1, a2);
        }
      } else if (typeof a2 === 'function') {
        // 6-9
        r = server.listen(a1, a2);
      } else {
        // 5-6-8-9
        r = server.listen(a1);
      }
    } else {
      if (typeof a2 === 'number') {
        if (typeof a3 === 'function') {
          // 8
          r = server.listen(a1, a2, a3);
        } else {
          // 8
          r = server.listen(a1, a2);
        }
      } else if (typeof a2 === 'function') {
        // 7-9
        r = server.listen(a1, a2);
      } else {
        // 7-8-9
        r = server.listen(a1);
      }
    }
    return r;
  }

  /**
   * Creates a router and adds it to the application.
   * @returns The created router
   */
  lazyrouter(options?: express.RouterOptions): IRouter {
    const lazyrouter = routing(options);
    this.addRouters(lazyrouter);
    return lazyrouter;
  }

  //--- EXPRESS METHODS

  disable(setting: string): BaseApp {
    this.__app.disable(setting);
    return this;
  }

  disabled(setting: string): boolean {
    return this.__app.disabled(setting);
  }

  enable(setting: string): BaseApp {
    this.__app.enable(setting);
    return this;
  }

  enabled(setting: string): boolean {
    return this.__app.enabled(setting);
  }

  on(event: string, callback: (parent: core.Application) => void): BaseApp {
    this.__app.on(event, callback);
    return this;
  }

  set(setting: string, val?: unknown): BaseApp {
    this.__app.set(setting, val);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(setting: string): any {
    return this.__app.get(setting);
  }
}
