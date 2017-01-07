'use strict'
const chalk = require('chalk')
const co = require('co')
const runDefault = require('../src')
const inquirer = require('inquirer')

module.exports = co.wrap(function * (input, flags) {
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
    }
  ])

  const options = Object.assign(answer, flags)

  return runDefault(options).catch(err => {
    console.error(chalk.red(err.stack))
    return
  })
})