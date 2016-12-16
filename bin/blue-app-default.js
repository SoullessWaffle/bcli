const inquirer = require('inquirer')
const co = require('co')

module.exports = co.wrap(function * (input) {
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
        }
      ]
    }
  ])

  /**
   * Fire the command!
   */
  require(`./blue-app-${answer.task}`)()
})
