const chalk = require('chalk')
const co = require('co')
const runInit = require('../src/init')
const inquirer = require('inquirer')

module.exports = co.wrap(function * (input, flags) {
  const dependencies = [
    'storage-helper',
    'lodash',
    'vue-analytics',
    'vue-i18n-manager',
    'vue-media-embed',
    'vue-translation-tool '
  ]
  const answer = yield inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of the project?',
      validate: function (answer) {
        return answer !== ''
      }
    },
    {
      type: 'list',
      name: 'projectType',
      message: 'Which type of project is this?',
      choices: [
        {
        name: 'A website with Blue',
        value: 'blue'
        },
        {
          name: 'NPM package',
          value: 'npm-package'
        }
      ]
    },
    {
      type: 'checkbox',
      name: 'dependencies',
      message: 'Would you like some useful dependencies?',
      choices: dependencies
    }
  ])

  const options = Object.assign(answer, flags)

  return runInit(options).catch(err => {
    console.error(chalk.red(err.stack))
    process.exit(1)
  })
})
