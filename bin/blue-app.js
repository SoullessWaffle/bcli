#!/usr/bin/env node
'use strict'
const cac = require('cac')
const chalk = require('chalk')
const pkg = require('../package.json')
const cli = cac()

cli.usage(`${chalk.yellow('blue-app')} [entry] [options]`)
cli.example('blue-app init my-project')

cli.command('init', 'Create a new project')

cli.parse()
