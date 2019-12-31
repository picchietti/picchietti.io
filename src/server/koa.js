import Koa from 'koa';
import Router from 'koa-router';
import serveStatic from 'koa-static';
import jsonResponses from 'koa-json';
import compress from 'koa-compress';
import bodyParser from 'koa-body';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import devWebpackConfig from '@picchietti/build/webpack.dev.js';

import setSecurityHeaders from './securityHeaders.js';
import setupRoutes from './routes.js';

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

const router = new Router();

// endpoints
setupRoutes(router);
app.use(router.routes());

// static files
app.use(serveStatic('./dist/'));

export default app;
