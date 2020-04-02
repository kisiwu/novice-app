module.exports = function (app) {
  return function novice1Middleware(req, res, next){
    req.novice1 = {
      parameters: app.parametersBag
    };
    next();
  }
}