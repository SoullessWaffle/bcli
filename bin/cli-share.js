const chalk = require('chalk')
const inquirer = require('inquirer')
const co = require('co')
const runShare = require('../src/commands/share')
const _ = require('lodash')

module.exports = co.wrap(function * (input, flags) {
  let options = { port: 8080 },
    answer

  if (flags.port) {
    answer = yield inquirer.prompt([
      {
        type: 'input',
        name: 'port',
        message: 'Which port do you want to share?',
        validate: function (answer) {
          return answer !== ''
        }
      }
    ])
  }

  options = _.merge(options, answer)

  return runShare(options).catch(err => {
    console.error(chalk.red(err.stack))
    return
  })
})
