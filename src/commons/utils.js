const execa = require('execa')
const paths = require('./paths')
const _ = require('lodash')
const co = require('co')
const inquirer = require('inquirer')
const commonQuestions = require('./questions')
const chalk = require('chalk')
const fs = require('fs-extra')

const checkType = function (type, value, fallback) {
  return typeof value === type ? value : fallback
}

/**
 * Get the current git user credentials
 * @return {Object}
 */
const getGitUser = co.wrap(function * () {
  let name = 'username'
  let email = 'example@domain.com'

  /**
   * It's possible that the current user doesn't have the git gloabal user setup.
   * In that case we're going to pass placeholders.
   */
  try {
    name = yield execa.shell('git config user.name')
    email = yield execa.shell('git config user.email')

    name = name.stdout
    email = email.stdout
  } catch (error) {
    console.log(chalk.yellow('\n\nGit global credentials not found.\n'))
  }

  return { name, email }
})

/**
 * Confirmation prompt to force actions
 */
const confirmPrompt = co.wrap(function * () {
  const confirm = yield inquirer.prompt([commonQuestions.force])

  if (!confirm.force) {
    console.log(chalk.bold.yellow('\nNo problems!\n'))
    return
  }
})

/**
 * Returns an object where the value is the corrent format
 * of all events we need to loop in the store module.
 * It also adds, for every item, if the loop needs to render a comma or not
 * @param  {String} events
 * @return {Object}
 */
const getEvents = function (events) {
  if (!events) {
    return []
  }

  const array = events.split(',')

  return _.map(array, (item, i) => {
    const trimValue = _.trim(item)
    const snakeCaseValue = _.snakeCase(trimValue)
    const value = snakeCaseValue.toUpperCase()
    const isNotLastItem = i !== array.length - 1

    return { value, isNotLastItem }
  })
}

/**
 * Rename all file in the folder with a single name
 * @param  {String} destination
 * @param  {String} filename
 */
const renameFiles = function (destination, filename) {
  fs.readdir(destination, (readError, files) => {
    files.forEach(file => {
      const extention = file.split('.')[1]
      fs.rename(`${destination}/${file}`, `${destination}/${filename}.${extention}`, (renameError) => {
        if (renameError) {
          console.log(renameError)
        }
      })
    })
  })
}

const getAppConfig = function () {
  try {
    return require(paths.appConfig)
  } catch (error) {
    console.log(chalk.red(`\nYou need to be in the root folder of a Blue project.`))
    /* eslint-disable*/
    process.exit(1)
    /* eslint-enable*/
  }
}

module.exports = {
  getGitUser,
  confirmPrompt,
  getEvents,
  renameFiles,
  checkType,
  getAppConfig
}
