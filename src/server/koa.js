import Koa from 'koa';
import Router from 'koa-router';
import serveStatic from 'koa-static';
import jsonResponses from 'koa-json';
import compress from 'koa-compress';
import bodyParser from 'koa-body';
import webpack from 'webpack';
import koaWebpack from 'koa-webpack';
import devWebpackConfig from '@picchietti/build/webpack.dev.js';
import { createReadStream } from 'fs';
import reactRouterConfig from 'react-router-config';

import setSecurityHeaders from './securityHeaders.js';
import setupEndpoints from './endpoints.js';
import clientSideRoutes from '../routes.js';

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


app.use(serveStatic('./dist/'));

const router = new Router();

setupEndpoints(router);

router.get('*', async(ctx, next) => {
  if(reactRouterConfig.matchRoutes(clientSideRoutes, ctx.path).length === 0) {
    ctx.status = 404;
  }
  ctx.type = 'html';
  ctx.body = createReadStream('./dist/index.html');
});

app.use(router.routes());

export default app;
