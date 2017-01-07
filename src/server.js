'use strict'
const _ = require('lodash')
const utils = require('./commons/utils')
const paths = require('./commons/paths')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack/base.config')
const envConfig = require('./webpack/config.dev')
const WebpackDevServer = require('webpack-dev-server')

module.exports = function () {
  const appConfig = utils.getAppConfig()
  const options = _.merge(envConfig, appConfig)
  const webpackConfig = _.merge(webpackBaseConfig, options)
  const port = webpackConfig.devServer.port
  const compiler = webpack(webpackConfig)

  // add webpack-dev-server to the webpack entry point
  const devServerPath = `${paths.cliNodeModules}/webpack-dev-server/client?http://localhost:${port}`
  webpackConfig.entry.app.unshift(devServerPath)

  const server = new WebpackDevServer(compiler, webpackConfig.devServer)

  server.listen(port)
}
