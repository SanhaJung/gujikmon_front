const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/companies',
    createProxyMiddleware({
      target: 'http://3.36.237.46',
      changeOrigin: true,
    })
  );
  app.use(
    '/user/login',
    createProxyMiddleware({
      target: 'http://3.36.237.46:8000',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/company/search',
    createProxyMiddleware({
      target: 'http://3.36.237.46',
      changeOrigin: true,
    })
  );
  app.use(
    '/api/user',
    createProxyMiddleware({
      target: 'http://3.36.237.46',
      changeOrigin: true,
    })
  );
};