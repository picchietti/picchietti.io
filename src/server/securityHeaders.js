const helmet = require('helmet');

const setSecurityHeaders = (app) => {
  app.use(helmet.frameguard({ action: 'deny' }));
  app.use(helmet.hidePoweredBy());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'fonts.googleapis.com',
        'fonts.gstatic.com'
      ]
    },
    loose: true
  }));
  if(process.env.NODE_ENV !== 'development') {
    app.use(helmet.hsts({
      // Must be at least 1 year for preload
      maxAge: 31536000,

      // Must be enabled for preload
      includeSubDomains: true,
      preload: true
    }));
  }
};

module.exports = setSecurityHeaders;
