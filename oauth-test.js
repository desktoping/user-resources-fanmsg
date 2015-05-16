var koa = require('koa');
var Router = require('koa-router');
var bodyparser = require('koa-bodyparser');
var model = require('koa-oauth-server/node_modules/oauth2-server/examples/memory/model');
var mount = require('koa-mount');
var oauthserver = require('koa-oauth-server');

// Create a new koa app.
var app = koa();

// Create a router for oauth.
var router = new Router();

// Enable body parsing.
app.use(bodyparser());

// See https://github.com/thomseddon/node-oauth2-server for specification.
app.oauth = oauthserver({
  
  model: model,
  grants: ['password'],
  debug: true
});

model.dump();


// Register `/token` POST path on oauth router (i.e. `/oauth2/token`).
router.post('/token', app.oauth.grant());

// Start koa server.
app.listen(3000);