// const {createProxyMiddleware} = require('http-proxy-middleware');
// const { root } = require('postcss');

// module.exports = function(app) {
//     root.use(
//         '/api', // adjust the path you want to proxy
//         createProxyMiddleware({
//             target: 'http://localhost:8000',  // specify the address of your backend server
//             changeOrigin: true,
//             secure: false,                  // set to false if your backend does not uses HTTPS
//             headers: {
//                 'Access-Control-Allow-Origin': 'http://localhost:3000',   // adjust the React app's origin
//             }
//         })
//     );
// };

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (root) {
    root.use(
    '/api', // Adjust the path you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Specify the address of your backend server
      changeOrigin: true,
      secure: false, // Set to false if your backend doesn't use HTTPS
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000', // Adjust the React app's origin
      },
    })
  );
};