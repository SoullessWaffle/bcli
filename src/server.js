'use strict'
const paths = require('./commons/paths')
const webpack = require('webpack')
const utils = require('../src/commons/utils')
const webpackBaseConfig = require('./webpack/base.config')
const _ = require('lodash')
const envConfig = require('./webpack/config.dev')
const appConfig = require(paths.appConfig)
const WebpackDevServer = require('webpack-dev-server')

module.exports = function (options) {
  const port = utils.checkType('number', options.port, 8080)
  const otherConfigs = _.merge(envConfig, appConfig)
  const webpackConfig = _.merge(webpackBaseConfig, otherConfigs)
  const compiler = webpack(webpackConfig)

  // add webpack-dev-server to the webpack entry point
  const devServerPath = `${paths.cliNodeModules}/webpack-dev-server/client?http://localhost:${port}`
  webpackConfig.entry.app.unshift(devServerPath)

  const server = new WebpackDevServer(compiler, {
    stats: {
      colors: true,
      chunks: false
    },
    hot: webpackConfig.devServer.hot,
    historyApiFallback: true,
    publicPath: webpackConfig.output.publicPath
  })

  server.listen(port)
}
