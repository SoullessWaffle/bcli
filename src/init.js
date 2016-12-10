'use strict'
const inquirer = require('inquirer')
const cac = require('cac')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const copy = require('graceful-copy')
const pathExists = require('path-exists')
const co = require('co')
const ora = require('ora')
const emoji = require('node-emoji').emoji
const execa = require('execa')

const utils = require('../src/utils')

module.exports = co.wrap(function * (options) {
  console.log('')
  const spinner = ora('Create a new awesome project').start()

  if (!options.projectName) {
    spinner.fail()
    console.error(chalk.red('\nPlease specify a project name'))
    console.error(chalk.bold.red('\nExample:'))
    console.error(chalk.red('\n  blue-app init my-project\n'))
    return
  }

  const dest = utils.getDir(options.projectName)
  const exists = yield pathExists(dest)

  if (exists && !options.force) {
    spinner.fail()
    console.error(chalk.red('\n Looks like the project already exists\n'))
    const confirm = yield inquirer.prompt([
      {
        type: 'confirm',
        name: 'force',
        message: 'Do you want to override it?',
        default: false
      }
    ])

    console.log('')

    if (!confirm.force) {
      process.exit(1)
    }
  }

  const template = path.resolve(__dirname, `../template/${options.projectType}`)
  const data = Object.assign({
    author: yield utils.getGitUser()
  }, options)

  yield copy(template, dest, { data })

  spinner.succeed()

  console.log('\nWebsite!', emoji.heart)
})
