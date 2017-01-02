'use strict'
const path = require('path')
const chalk = require('chalk')
const copy = require('graceful-copy')
const pathExists = require('path-exists')
const co = require('co')
const ora = require('ora')
const emoji = require('node-emoji').emoji

const utils = require('../src/utils')
const paths = require('../src/paths')
const spinner = ora()

module.exports = co.wrap(function * (options) {
  console.log('') // extra space
  spinner.text = 'Create a new Vuex store module'
  spinner.start()

  const blueStructure = `${paths.appSrc}/app/store/modules/${options.name}`
  const currentFolder = `${paths.appDirectory}/${options.name}`
  const dest = options.location === 'blue' ? blueStructure : currentFolder
  const exists = yield pathExists(dest)

  if (exists && !options.force) {
    spinner.fail()
    console.error(chalk.red('\n Looks like the module already exists\n'))

    yield utils.confirmPrompt()
  }

  const template = path.resolve(__dirname, `../template/store`)
  const data = Object.assign({
    author: yield utils.getGitUser(),
    events: utils.getEvents(options.eventsList)
  }, options)

  yield copy(template, dest, { data })

  spinner.succeed()
  console.log(`\nVuex store module ${chalk.bold(options.name)} created!`, emoji.heart)
})
