const execa = require('execa')
const _ = require('lodash')
const co = require('co')
const inquirer = require('inquirer')
const commonQuestions = require('../src/common-questions')
const chalk = require('chalk')

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
    process.exit(1)
  }
})

const getEvents = (events) => {
  const array = events.split(',')

  return _.map(array, (item, i) => {
    const trimValue = _.trim(item)
    const snakeCaseValue = _.snakeCase(trimValue)
    const value = snakeCaseValue.toUpperCase()
    const isNotLastItem = i !== array.length - 1

    return { value, isNotLastItem }
  })
}

module.exports = {
  getGitUser,
  confirmPrompt,
  getEvents
}
