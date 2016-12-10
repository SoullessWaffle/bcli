const path = require('path')
const execa = require('execa')
const co = require('co')

/**
 * Get the current command line directory
 * @param  {String} relative
 * @return {String}
 */
const getDir = function (relative) {
  return path.resolve(process.cwd(), relative)
}

/**
 * Get the current git user credentials
 * @return {Object}
 */
const getGitUser = co.wrap(function * () {
  const name = yield execa.shell('git config user.name')
  const email = yield execa.shell('git config user.email')

  return {
    name: name.stdout,
    email: email.stdout
  }
})

module.exports = {
  getDir,
  getGitUser
}
