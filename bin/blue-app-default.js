const inquirer = require('inquirer')

module.exports = input => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'task',
      message: 'What you would like to do?',
      choices: [
        'Create a new awesome project',
        'Create a component',
        'Create a page',
        'Create a Vuex store module'
      ]
    }
  ])
}
