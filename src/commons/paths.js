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
  appEntry: resolveApp('src/index.js'),
  appPackageJSON: resolveApp('package.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  // The CLI
  cliTemplates: resolveCli('../../template')
}
