'use strict'
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
const spinner = ora('Create a new awesome project').start()

module.exports = co.wrap(function * (options) {
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
    console.error(chalk.red('\n Looks like the project already exists'))
    console.error(chalk.red(`\n   run \`blue-app init ${options.projectName} --force\` to override it`))
    return
  }

  const template = path.resolve(__dirname, '../template')
  const data = Object.assign({
    author: yield utils.getGitUser()
  }, options)
  
  yield copy(template, dest, { data })

  spinner.succeed()

  console.log('\nWebsite!', emoji.heart)
})
