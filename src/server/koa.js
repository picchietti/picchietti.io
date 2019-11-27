const Koa = require('koa');
const Router = require('koa-router');
const serveStatic = require('koa-static');
const jsonResponses = require('koa-json');
const compress = require('koa-compress');
const bodyParser = require('koa-body');
const setSecurityHeaders = require('./securityHeaders.js');
const setupRoutes = require('./routes.js');

const app = new Koa();

app.use(jsonResponses({
  pretty: false
}));

app.use(bodyParser({
  text: false,
  urlencoded: false
}));

setSecurityHeaders(app);
app.use(compress({
  threshold: 100
}));

if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const koaWebpack = require('koa-webpack');
  const devWebpackConfig = require('@picchietti/build/webpack.dev.js');

  const koaWebpackPromise = koaWebpack({
    compiler: webpack(devWebpackConfig),
    devMiddleware: {
      publicPath: devWebpackConfig.output.publicPath,
      writeToDisk: true
    },
    hotClient: false
  });

  koaWebpackPromise.then((middleware) => app.use(middleware));
}

// Routes
const router = new Router();

setupRoutes(router);
app.use(router.routes());

app.use(serveStatic('./dist/'));

module.exports = app;
