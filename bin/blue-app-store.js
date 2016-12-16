const chalk = require('chalk')
const co = require('co')
const runStore = require('../src/store')
const inquirer = require('inquirer')

const commons = require('../src/commons')

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
      type: 'list',
      name: 'basic',
      message: 'Would you like to add some events?',
      choices: [
        {
          name: 'No!',
          value: false
        },
        {
          name: 'Engage!',
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
