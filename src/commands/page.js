'use strict'
const _ = require('lodash')
const path = require('path')
const chalk = require('chalk')
const copy = require('graceful-copy')
const pathExists = require('path-exists')
const co = require('co')
const ora = require('ora')
const emoji = require('node-emoji').emoji

const utils = require('../utils')
const paths = require('../commons/paths')
const spinner = ora()

module.exports = co.wrap(function * (options) {
  console.log('') // extra space
  spinner.text = 'Create a new page'
  spinner.start()

  const name = _.kebabCase(options.name)
  const blueStructure = `${paths.appSrc}/app/page/${name}`
  const currentFolder = `${paths.appDirectory}/${name}`
  const dest = options.location === 'blue' ? blueStructure : currentFolder
  const exists = yield pathExists(dest)

  if (exists && !options.force) {
    spinner.fail()
    console.error(chalk.red('\n Looks like the page already exists\n'))

    yield utils.confirmPrompt()
  }

  const template = `${paths.cliTemplates}/page`
  const data = {
    name,
    basic: options.basic,
    author: yield utils.getGitUser()
  }

  // Copy template files to the new destination
  yield copy(template, dest, { data })

  // Rename all components file from the template with the component name
  utils.renameFiles(dest, name)

  spinner.succeed()
  console.log(`\nPage ${chalk.yellow.bold(name)} created!`, emoji.heart)

  if (options.location === 'blue') {
    console.log(chalk.bold('\nCopy the import line for your page:'))
    console.log(chalk.italic(`\n   import ${_.camelCase(name)} from 'page/${name}/${name}.vue'`))
  }
})
