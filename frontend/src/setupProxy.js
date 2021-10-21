const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/api/*', {
        "target": "http://backend:8000/",
        "secure": false,
        "changeOrigin": true
    }));
    app.use(proxy('/api/todos/*', {
        "target": "http://backend:8000/",
        "secure": false,
        "changeOrigin": true
    }));
}