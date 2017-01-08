'use strict'
const paths = require('../commons/paths')

module.exports = {
  context: paths.appDirectory,
  entry: {
    app: [paths.appEntry]
  },
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
    root: paths.appSrc,
    extensions: ['', '.js', '.vue', '.css'],
    alias: {
      vue: 'vue/dist/vue.js'
    },
    modules: [
      paths.appDirectory,
      paths.appNodeModules,
      paths.cliNodeModules
    ]
  },
  resolveLoader: {
    modulesDirectories: [
      paths.appNodeModules,
      paths.cliNodeModules
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            [
              require.resolve('babel-preset-es2015'),
              { module: false }
            ],
            require.resolve('babel-preset-stage-2')
          ],
          plugins: [
            require.resolve('babel-plugin-transform-runtime')
          ]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: []
}
