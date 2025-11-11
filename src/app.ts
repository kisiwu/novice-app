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

  addOptions(options: Options): this {
    super.addOptions(options);
    return this;
  }

  addRouters(routers: IRouter[] | IRouter): this {
    super.addRouters(routers);
    return this;
  }

  disable(setting: string): this {
    super.disable(setting);
    return this;
  }

  enable(setting: string): this {
    super.enable(setting);
    return this;
  }

  on(event: 'mount', callback: (parent: core.Application) => void): this {
    super.on(event, callback);
    return this;
  }

  set(setting: string, val?: unknown): this {
    super.set(setting, val);
    return this;
  }

  //--- LAZYROUTER METHODS

  param(
    name: string | string[],
    handler: core.RequestParamHandler): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  all(path: core.PathParams, subApplication: core.Application): this;
  all<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  get(path: core.PathParams, subApplication: core.Application): this;
  get<Path extends string>(
    path: Path | string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...handlers: Array<RequestHandler>): this | any {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  post(path: core.PathParams, subApplication: core.Application): this;
  post<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  put(path: core.PathParams, subApplication: core.Application): this;
  put<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  delete(path: core.PathParams, subApplication: core.Application): this;
  delete<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  patch(path: core.PathParams, subApplication: core.Application): this;
  patch<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  options(path: core.PathParams, subApplication: core.Application): this;
  options<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  head(path: core.PathParams, subApplication: core.Application): this;
  head<Path extends string>(
    path: Path,
    ...handlers: Array<RequestHandler>): this {
    this.lazyrouter().head(path, ...handlers);
    return this;
  }

  use(...handlers: Array<core.RequestHandler<core.RouteParameters<string>>>): this;
  use(...handlers: Array<core.RequestHandlerParams<core.RouteParameters<string>>>): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
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
  ): this;
  use(path: core.PathParams, subApplication: core.Application): this;
  use<Path extends string>(
    path: Path | core.RequestHandler<core.RouteParameters<string>>,
    ...handlers: Array<core.RequestHandler<core.RouteParameters<string>>>): this {
    const router = this.lazyrouter();
    if (typeof path === 'function') {
      router.use(path, ...handlers);
    } else {
      router.use(path, ...handlers);
    }
    return this;
  }
}
