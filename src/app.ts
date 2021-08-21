import core from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { 
  IRouter, 
  RequestHandler, 
  RequestHandlerParams, 
  RouteSettings, 
  RouteSettingsParams 
} from '@novice1/routing';
import { BaseApp, Options } from './baseApp';

/**
 * The application
 */
export class FrameworkApp extends BaseApp {

  //--- OVERRIDE METHODS

  addOptions(options: Options): FrameworkApp {
    super.addOptions(options);
    return this;
  }

  addRouters(routers: IRouter[] | IRouter): FrameworkApp {
    super.addRouters(routers);
    return this;
  }

  disable(setting: string): FrameworkApp {
    super.disable(setting);
    return this;
  }

  enable(setting: string): FrameworkApp {
    super.enable(setting);
    return this;
  }

  on(event: string, callback: (parent: core.Application) => void): FrameworkApp {
    super.on(event, callback);
    return this;
  }

  set(setting: string, val?: unknown): FrameworkApp {
    super.set(setting, val);
    return this;
  }

  //--- LAZYROUTER METHODS

  param(
    name: string | string[],
    handler: core.RequestParamHandler): FrameworkApp {
    if (Array.isArray(name)) {
      name.forEach(n => {
        this.param(n, handler);
      });
    } else {
      this.lazyrouter().param(name, handler);
    }
    return this;
  }

  all<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  all<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  all<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  all<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  all<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  all<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  all<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  all<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  all(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  all<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().all(path, ...handlers);
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get(setting: string): any;
  get<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  get<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  get<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  get<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  get<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  get<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  get<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  get<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  get(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<Path extends string>(
    path: Path | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...handlers: Array<RequestHandler>): FrameworkApp | any {
    if (!handlers.length && typeof path === 'string') {
      return super.get(path);
    } else {
      this.lazyrouter().get(path, ...handlers);
      return this;
    }
  }

  post<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  post<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  post<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  post<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  post<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  post<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  post<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  post<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  post(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  post<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().post(path, ...handlers);
    return this;
  }

  put<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  put<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  put<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  put<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  put<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  put<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  put<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  put<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  put(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  put<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().put(path, ...handlers);
    return this;
  }

  delete<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  delete<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  delete<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  delete<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  delete<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  delete<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  delete<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  delete<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  delete(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  delete<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().delete(path, ...handlers);
    return this;
  }

  patch<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  patch<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  patch<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  patch<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  patch<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  patch<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  patch<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  patch<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  patch(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  patch<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().patch(path, ...handlers);
    return this;
  }

  options<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  options<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  options<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  options<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  options<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  options<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  options<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  options<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  options(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  options<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().options(path, ...handlers);
    return this;
  }

  head<
    Route extends string,
    P = core.RouteParameters<Route>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<Route, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  head<
    Path extends string,
    P = core.RouteParameters<Path>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<Path, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  head<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettings<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  head<
    P = core.ParamsDictionary,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ResBody = any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ReqBody = any,
    ReqQuery = ParsedQs,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Locals extends Record<string, any> = Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MetaResType = any
  >(
    path: RouteSettingsParams<core.PathParams, P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals, MetaResType>>
  ): FrameworkApp;
  head<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  head<
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
    path: Path,
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  head<
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
    ...handlers: Array<RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  head<
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
    ...handlers: Array<RequestHandlerParams<P, ResBody, ReqBody, ReqQuery, Locals>>
  ): FrameworkApp;
  head(path: core.PathParams, subApplication: core.Application): FrameworkApp;
  head<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): FrameworkApp {
    this.lazyrouter().head(path, ...handlers);
    return this;
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
