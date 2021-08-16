import http from 'http';
import net from 'net';
import express from 'express';
import core from 'express-serve-static-core';
import routing, { IRouter, RequestHandler } from '@novice1/routing';
import { addReplyMiddleware } from './middlewares/reply'
import { ParsedQs } from 'qs';

export interface Options {
  framework?: {
    auth?: RequestHandler[];
    middlewares?: (core.RequestHandler | core.RequestHandlerParams)[];
    validators?: RequestHandler[];
  };
  routers?: IRouter[]
}

export class FrameworkApp {
  #app: express.Application;
  #config: Options = {};
  #router: IRouter;
  #server?: http.Server;

  #isBuilding = false;
  #isBuilt = false;

  get building(): boolean {
    return this.#isBuilding;
  }

  get built(): boolean {
    return this.#isBuilt;
  }

  get meta(): routing.RouteMeta[] {
    return this.#router.getMeta();
  }

  get server(): http.Server | undefined {
    return this.#server;
  }

  constructor(options?: Options) {
    this.#app = express();
    this.#router = routing();
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
    this.#router.use(router);
  }

  private _buildFramework(): void {
    // register main router
    this.#app.use(this.#router);

    // register framework's middlewares
    this.#router.use(addReplyMiddleware(this));

    // register user's middlewares
    if (this.#config.framework?.middlewares?.length) {
      this.#router.use(...this.#config.framework.middlewares);
    }
  }

  private _buildRoutes(): void {
    this.#config.routers?.forEach(
      router => {
        this._registerRouter(router);
      }
    );
  }

  addOptions(options: Options): FrameworkApp {
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

  addRouters(routers: IRouter[] | IRouter): FrameworkApp {
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

      this.#server = http.createServer(options || {}, this.#app);
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

  disable(setting: string): FrameworkApp {
    this.#app.disable(setting);
    return this;
  }

  disabled(setting: string): boolean {
    return this.#app.disabled(setting);
  }

  enable(setting: string): FrameworkApp {
    this.#app.enable(setting);
    return this;
  }

  enabled(setting: string): boolean {
    return this.#app.enabled(setting);
  }

  set(setting: string, val?: unknown): FrameworkApp {
    this.#app.set(setting, val);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(setting: string): any {
    return this.#app.get(setting);
  }

  on(event: string, callback: (parent: core.Application) => void): FrameworkApp {
    this.#app.on(event, callback);
    return this;
  }

  lazyrouter(): IRouter {
    const lazyrouter = routing();
    this.addRouters(lazyrouter);
    return lazyrouter;
  }

  use(...handlers: Array<core.RequestHandler<core.RouteParameters<string>>>): FrameworkApp;
  use(...handlers: Array<core.RequestHandlerParams<core.RouteParameters<string>>>): FrameworkApp;
  use<
    P = core.RouteParameters<string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    ...handlers: Array<core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    P = core.RouteParameters<string>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    ...handlers: Array<core.RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    ...handlers: Array<core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    ...handlers: Array<core.RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    path: Route,
    ...handlers: Array<core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    // tslint:disable-next-line no-unnecessary-generics (it's used as the default type parameter for P)
    path: Path,
    // tslint:disable-next-line no-unnecessary-generics (This generic is meant to be passed explicitly.)
    ...handlers: Array<core.RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    path: core.PathParams,
    ...handlers: Array<core.RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>
  >(
    path: core.PathParams,
    ...handlers: Array<core.RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  use(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  use<Path extends string>(
    path: Path | core.RequestHandler<core.RouteParameters<string>>,
    ...handlers: Array<core.RequestHandler<core.RouteParameters<string>>>): FrameworkApp {
    const router = this.lazyrouter();
    if (typeof path === 'function') {
      router.use(path, ...handlers);
    } else {
      router.use(path, ...handlers);
    }
    return this;
  }
}
