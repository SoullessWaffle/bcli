#!/usr/bin/env node
'use strict'
const cac = require('cac')
const chalk = require('chalk')
const pkg = require('../package.json')
const cli = cac()

cli.usage(`${chalk.yellow(pkg.name)} [command] [options]`)
cli.example(`${pkg.name} init my-project`)

cli.command('*', 'What do you want to do?')
cli.command('component', 'Create a new component')
cli.command('store', 'Create a new Vuex store module')
cli.command('page', 'Create a new page')
cli.command('packages', 'Install a frequently used npm package')
cli.command('start', 'Run the webpack dev server')
cli.command('project', 'Create a new project')
cli.command('share', 'Share the current local revision with ngrok')

cli.parse()
