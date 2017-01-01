const chalk = require('chalk')
const co = require('co')
const runStore = require('../src/store')
const inquirer = require('inquirer')

const commonQuestions = require('../src/common-questions')

module.exports = co.wrap(function * (input, flags) {
  const answer = yield inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the name module name?',
      validate: function (answer) {
        return answer !== ''
      }
    },
    {
      type: 'input',
      name: 'eventsList',
      message: 'Would you like to add some events? (ex: "get token, removeToken")',
      validate: function (answer) {
        return answer !== ''
      }
    },
    commonQuestions.fileLocation
  ])

  const options = Object.assign(answer, flags)

  return runStore(options).catch(err => {
    console.error(chalk.red(err.stack))
    process.exit(1)
  })
})
