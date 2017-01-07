module.exports = {
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
