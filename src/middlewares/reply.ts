import core from 'express-serve-static-core';
import { FrameworkApp } from '../app';

export function addReplyMiddleware(app: FrameworkApp): core.RequestHandler  {
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
