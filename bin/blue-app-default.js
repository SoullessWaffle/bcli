const inquirer = require('inquirer')
const co = require('co')
const runInit = require('./blue-app-init')

module.exports = co.wrap(function * (input) {
  const answer = yield inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What you would like to do?',
      choices: [
        {
          name: 'Create a new awesome project',
          value: 'project'
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
          value: 'store-module'
        }
      ]
    }
  ])

  switch (answer) {
    case 'component':

      break;

    case 'page':

      break;

    case 'store-module':

      break;

    default:
      // new project
      runInit()

  }
})
