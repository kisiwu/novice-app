import core from 'express-serve-static-core';
import { IApp } from '../baseApp';

export function addReplyMiddleware(app: IApp): core.RequestHandler  {
  return function replyMiddleware(_, res, next){
  
    // set functions
    // res.reply = reply;

    // set headers
    if (app.enabled('x-powered-by'))  {
      res.setHeader('X-Powered-By', 'Novice1');
    }

    next();
  }
}
