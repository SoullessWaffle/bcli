'use strict'
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const utils = require('../../commons/utils')
const appConfig = utils.getAppConfig()
const serverOptins = require('./server')

const name = appConfig.title || 'Blue'
const port = appConfig.devServer && appConfig.devServer.port || serverOptins.port

module.exports = [
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new FriendlyErrors({
    compilationSuccessInfo: {
      messages: [
        `'${name}' is running on http://localhost:${port}\n`
      ]
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
]
