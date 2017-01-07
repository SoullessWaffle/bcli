'use strict'
const paths = require('../commons/paths')

module.exports = {
  context: paths.appDirectory,
  entry: {
    app: [paths.relativeAppEntry]
  },
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: '[name].js'
  },
  resolve: {
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
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: []
}
