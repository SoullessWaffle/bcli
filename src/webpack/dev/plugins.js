'use strict'
const webpack = require('webpack')
const FriendlyErrors = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = [
  new webpack.DefinePlugin({
    __DEV__: true,
    'process.env.NODE_ENV': JSON.stringify('development')
  }),
  new FriendlyErrors({
    compilationSuccessInfo: {
      messages: [
        'Blue is running on http://localhost:8080\n'
      ]
    }
  }),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true
  })
]
