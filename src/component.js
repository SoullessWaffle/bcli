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
const paths = require('../src/paths')
const spinner = ora()

module.exports = co.wrap(function * (options) {
  console.log('') // extra space
  spinner.text = 'Create a new component'
  spinner.start()


  const blueStructure = `${paths.appSrc}/app/component/${options.name}`
  const currentFolder = `${paths.appDirectory}/${options.name}`
  const dest = options.type === 'blue' ? blueStructure : currentFolder
  const exists = yield pathExists(dest)

  if (exists && !options.force) {
    spinner.fail()
    console.error(chalk.red('\n Looks like the component already exists\n'))

    const confirm = yield inquirer.prompt([
      {
        type: 'confirm',
        name: 'force',
        message: 'Do you want to override it?',
        default: false
      }
    ])

    if (!confirm.force) {
      process.exit(1)
    }
  }

  const template = path.resolve(__dirname, `../template/component`)
  const data = Object.assign({
    author: yield utils.getGitUser(),
    eventsList: ['GET_ITEM, GET_TOKEN']
  }, options)

  yield copy(template, dest, { data })

  spinner.succeed()
  console.log(`\nComponent ${chalk.bold(options.name)} created!`, emoji.heart)
})
