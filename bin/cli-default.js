'use strict'
const inquirer = require('inquirer')
const co = require('co')
const emoji = require('node-emoji').emoji
const chalk = require('chalk')

module.exports = co.wrap(function * () {
  const answer = yield inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What you would like to do?',
      choices: [
        {
          name: 'Create a new awesome project',
          value: 'init'
        },
        {
          name: 'Create a component',
          value: 'component'
        },
        {
          name: 'Create a page',
          value: 'page'
        },
        {
          name: 'Create a Vuex store module',
          value: 'store'
        },
        {
          name: 'Install most used npm packages',
          value: 'packages'
        },
        {
          name: 'Share your local version',
          value: 'share'
        },
        new inquirer.Separator(),
        {
          name: 'Get me out!',
          value: false
        }
      ]
    }
  ])

  if (!answer.task) {
    console.log(chalk.bold('\nSee you!'), emoji.rocket)
    return
  }

  /**
   * Fire the command!
   */
  try {
    require(`./cli-${answer.task}`)()
  } catch (e) {
    console.log(e)
  }
})
