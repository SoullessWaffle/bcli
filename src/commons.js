const co = require('co')
const inquirer = require('inquirer')

const confirm = co.wrap(function * (message) {
  const answer = yield inquirer.prompt([
    {
      type: 'list',
      name: 'force',
      message: message || 'Do you want to override it?',
      default: false,
      choices: [
        {
          name: 'No, thanks!',
          value: false
        },
        {
          name: 'Yes, please!!',
          value: true
        }
      ]
    }
  ])

  if (!answer.force) {
    process.exit(1)
  }

  return answer
})

module.exports = {
  confirm
}
