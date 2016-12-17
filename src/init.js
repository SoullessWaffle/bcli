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
const commonQuestions = require('../src/common-questions')

const spinner = ora()

module.exports = co.wrap(function * (options) {
  console.log('') // extra space
  spinner.text = 'Create a new awesome project'
  spinner.start()

  if (!options.projectName) {
    spinner.fail()
    console.error(chalk.red('\nPlease specify a project name'))
    console.error(chalk.bold.red('\nExample:'))
    console.error(chalk.red('\n  blue-app init my-project\n'))
    return
  }

  const dest = `${paths.appDirectory}/${options.projectName}`
  const exists = yield pathExists(dest)

  if (exists && !options.force) {
    spinner.fail()
    console.error(chalk.red('\n Looks like the project already exists\n'))

    const confirm = yield inquirer.prompt([commonQuestions.force])

    if (!confirm.force) {
      console.log(chalk.bold.yellow('\nNo problems!'))
      return
    }
  }

  const template = path.resolve(__dirname, `../template/${options.projectType}`)
  const data = Object.assign({
    author: yield utils.getGitUser(),
    dependencies: options.dependencies
  }, options)

  yield copy(template, dest, { data })

  spinner.succeed()

  if (options.dependencies.length) {
    const encodedPath = dest.replace(/ /g, '\\ ')

    spinner.start()
    spinner.text = 'Install dependencies'

    try {
      yield execa.shell(`npm --prefix ${encodedPath} install --save ${options.dependencies.join(' ')}`)
    } catch (error) {
      spinner.fail()
      console.error(chalk.red(`\n${error.stderr}`))
      return
    }

    /**
     * In order to be able to install npm packages from outside the project folder
     * the command `npm --prefix` needs to run, but randomly it cause the creation
     * of an emtpy /etc folder in the root of the project.
     * This is a known issue on npm. Still open for now!
     * Issue reference https://github.com/npm/npm/issues/11486
     */
    const etcFolder = `${encodedPath}/etc`
    const exists = yield pathExists(etcFolder)

    if (exists) {
      yield execa.shell(`rm -rf ${etcFolder}`)
    }

    spinner.succeed()
  }

  console.log('\nWebsite!', emoji.heart)
})
