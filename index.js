#!/usr/bin/env node

'use strict'

// Pull in our modules
const chalk = require('chalk')
const boxen = require('boxen')
const axios = require('axios')
const terminalLink = require('terminal-link')
var confirm = require('inquirer-confirm')


const github_link = 'https://github.com/'

// Define options for Boxen
const options = {
  padding: 1,
  margin: 1,
  borderStyle: 'round'
}

// Text + chalk definitions
const data = {
  name: chalk.white('               Michael Jacquemart'),
  handle: chalk.white('michaeljacquemart'),
  work: chalk.white('Junior Web Developer at Becode'),
  npm: chalk.gray('https://npmjs.com/') + chalk.red('michaeljacquemart'),
  github: chalk.gray('https://github.com/') + chalk.green('michaeljacquemart'),
  linkedin: chalk.gray('https://linkedin.com/in/') + chalk.blue('michaeljacquemart'),
  web: chalk.cyan('http://michaeljacquemart.me'),
  npx: chalk.red('npx') + ' ' + chalk.white('@michaeljacquemart/card  (via GitHub Package Registry)'),
  labelWork: chalk.white.bold('       Work:'),
  labelnpm: chalk.white.bold('        npm:'),
  labelGitHub: chalk.white.bold('     GitHub:'),
  labelLinkedIn: chalk.white.bold('   LinkedIn:'),
  labelWeb: chalk.white.bold('        Web:'),
  labelCard: chalk.white.bold('       Card:')
}

// Actual strings we're going to output
const newline = '\n'
const heading = `${data.name} / ${data.handle}`
const working = `${data.labelWork}  ${data.work}`
const npming = `${data.labelnpm}  ${data.npm}`
const githubing = `${data.labelGitHub}  ${data.github}`
const linkedining = `${data.labelLinkedIn}  ${data.linkedin}`
const webing = `${data.labelWeb}  ${data.web}`
const carding = `${data.labelCard}  ${data.npx}`

// Put all our output together into a single variable so we can use boxen effectively
const output = heading + // data.name + data.handle
               newline + newline + // Add one whole blank line
               working + newline + // data.labelWork + data.work
               npming + newline + // data.labelnpm + data.npm
               githubing + newline + // data.labelGitHub + data.github
               linkedining + newline + // data.labelLinkedIn + data.linkedin
               webing + newline + newline + // data.labelWeb + data.web
               carding // data.labelCard + data.npx

async function getRepos () {
  try {
    const response = await axios.get('https://api.github.com/users/michaeljacquemart/repos')
    console.log('\n')

    response.data.forEach(el => {
      let temp_link = github_link + el.full_name
      console.log(terminalLink(temp_link))
    })
  } catch (error) {
    console.error(error)
  }
}

console.log(chalk.green(boxen(output, options)));

confirm('Do you want to see a list of my public repositories as well as my npx-card ?')
  .then(function confirmed () {
    console.log('There you go !', '\n')
    getRepos()
  }, function cancelled () {
    console.log('Sorry to hear that...')
  })
