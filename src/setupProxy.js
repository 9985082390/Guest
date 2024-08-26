const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://getcabinspace.nagpur.pro',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },
    })
  );
};
