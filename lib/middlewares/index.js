var reply = require('./reply');
var reqNovice1 = require('./novice1');

module.exports = function(app){
  return [
    reqNovice1(app),
    reply(app)
  ];
}
