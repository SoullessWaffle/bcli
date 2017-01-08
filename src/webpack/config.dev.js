'use strict'
const webpack = require('webpack')
const utils = require('../commons/utils')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const config = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const appConfig = utils.getAppConfig()

const title = appConfig.title || 'Blue'

config.devtool = 'evel-source-map'

config.devServer = {
  port: '8080',
  stats: {
    hash: false,
    version: false,
    timings: false,
    assets: true,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: true,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false,
    colors: true,
    module: false
  },
  quiet: false,
  hot: false,
  historyApiFallback: true,
  publicPath: '/'
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new FriendlyErrors({
    compilationSuccessInfo: {
      messages: [
        `'${title}' is running here http://localhost:${config.devServer.port}\n`
      ]
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
])

module.exports = config
