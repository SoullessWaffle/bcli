const chalk = require('chalk')
const co = require('co')
const init = require('../src/init')
const inquirer = require('inquirer')

console.log()

module.exports = co.wrap(function * (input, flags) {
  const answer = yield inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What\'s the name of the project?'
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
  console.log(answer)
  const options = Object.assign(answer, flags)

  return init(options).catch(err => {
    console.error(chalk.red(err.stack))
    process.exit(1)
  })
})
