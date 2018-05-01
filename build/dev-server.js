const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const WebpackConfig = require('../webpack.config')
const WebpackMiddleware = require("webpack-dev-middleware-hard-disk")

WebpackConfig.plugins = (WebpackConfig.plugins || []).concat([
])

const compiler = webpack(WebpackConfig)

// var hotMiddleware = require('webpack-hot-middleware')(compiler, {
//   log: false,
//   heartbeat: 2000
// })
// // force page reload when html-webpack-plugin template changes
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// new WebpackDevServer(compiler, {
//   hot: true,
//   open: true,
//   port: 8000,
//   before (app) {
//     app.use(hotMiddleware)
//   }
// })

WebpackMiddleware(compiler, {
  publicPath: path.resolve(__dirname, 'dist'),
  quiet: true
})
