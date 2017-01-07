'use strict'
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const config = require('./base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')

config.devtool = 'evel-source-map'

config.devServer = {
  hot: false
}

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new FriendlyErrors(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
])

module.exports = config
