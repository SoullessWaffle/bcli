const chalk = require('chalk')
const co = require('co')
const runPage = require('../src/commands/page')
const inquirer = require('inquirer')
const commonQuestions = require('../src/commons/questions')
const _ = require('lodash')

module.exports = co.wrap(function * (input, flags) {
  let answer = yield inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the name page name?',
      validate: function (answer) {
        return answer !== ''
      }
    },
    commonQuestions.vueHooks,
    commonQuestions.fileLocation
  ])

  const options = _.assignIn(answer, flags)

  return runPage(options).catch(err => {
    console.error(chalk.red(err.stack))
    return
  })
})
