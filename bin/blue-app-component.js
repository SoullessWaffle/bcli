const chalk = require('chalk')
const co = require('co')
const runComponent = require('../src/component')
const inquirer = require('inquirer')

module.exports = co.wrap(function * (input, flags) {
  const answer = yield inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What\'s the name component name?',
      validate: function (answer) {
        return answer !== ''
      }
    },
    {
      type: 'list',
      name: 'basic',
      message: 'Would you like some basic Vue hooks?',
      choices: [
        {
          name: 'No, thanks!',
          value: false
        },
        {
          name: 'Oh, yes!',
          value: true
        },
      ],
      default: false
    }
  ])

  const options = Object.assign(answer, flags)

  return runComponent(options).catch(err => {
    console.error(chalk.red(err.stack))
    process.exit(1)
  })
})
