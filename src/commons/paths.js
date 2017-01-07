const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())

const resolveApp = function (relativePath) {
  return path.resolve(appDirectory, relativePath)
}

const resolveCli = function (relativePath) {
  return path.resolve(__dirname, relativePath)
}

module.exports = {
  // The app
  appDirectory: appDirectory,
  appBuild: resolveApp('build'),
  relativeAppEntry: './src/app/index.js',
  appStatic: resolveApp('./static'),
  appEntry: resolveApp('src/app'),
  appHTMLIndex: resolveApp('./index.html'),
  appPackageJSON: resolveApp('package.json'),
  appConfig: resolveApp('bcli.config.js'),
  appSrc: resolveApp('src'),
  appRoot: resolveApp('src/app'),
  appNodeModules: resolveApp('node_modules'),
  // The CLI
  cliTemplates: resolveCli('../../template'),
  cliNodeModules: resolveCli('../../node_modules')
}
