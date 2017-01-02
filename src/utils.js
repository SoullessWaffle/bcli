const execa = require('execa')
const _ = require('lodash')
const co = require('co')
const inquirer = require('inquirer')
const commonQuestions = require('../src/common-questions')
const chalk = require('chalk')
const fs = require('fs-extra')

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

const confirmPrompt = co.wrap(function * () {
  const confirm = yield inquirer.prompt([commonQuestions.force])

  if (!confirm.force) {
    console.log(chalk.bold.yellow('\nNo problems!\n'))
    return
  }
})

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

module.exports = {
  getGitUser,
  confirmPrompt,
  getEvents,
  renameFiles
}
