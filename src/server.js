'use strict'
const _ = require('lodash')
const utils = require('./commons/utils')
const paths = require('./commons/paths')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack/base.config')
const envConfig = require('./webpack/config.dev')
const WebpackDevServer = require('webpack-dev-server')
const merge = require('webpack-merge')
const detect = require('detect-port')
const co = require('co')
const chalk = require('chalk')

module.exports = co.wrap(function * () {
  const config = _.merge({}, envConfig, utils.getAppConfig())
  const webpackConfig = _.merge({}, webpackBaseConfig, config)
  const compiler = webpack(webpackConfig)
  const port = parseInt(webpackConfig.devServer.port)
  const serverUrl = `http://localhost:${port}`

  // add webpack-dev-server to the webpack entry point
  // webpack-dev-server needs to point to the cli node_module folder or won't be recognized
  const devServerPath = `${paths.cliNodeModules}/webpack-dev-server/client?${serverUrl}`
  webpackConfig.entry.app.unshift(devServerPath)

  const availablePort = yield detect(port)
  
  if (availablePort !== port) {
    console.log(chalk.bold.red(`\nPort ${port} it's already in use. Try port ${availablePort}`))
    return
  }

  // start the server!
  const server = new WebpackDevServer(compiler, webpackConfig.devServer)
  server.listen(port)
})
