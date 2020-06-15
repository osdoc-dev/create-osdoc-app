#!/usr/bin/env node

const yParser = require('yargs-parser');
const chalk = require('chalk');
const package = require('./package.json');
const { existsSync } = require('fs');
const { join } = require('path');
const semver = require('semver');
const runCli = require('./lib/run');

const args = yParser(process.argv.slice(2));

// 查看版本

if (args.v || args.version) {
  console.log('version', chalk.blue(package.version));
  if (existsSync(join(__dirname, '.debug'))) {
    // 如果是本地调试会打印 @debug
    console.log(chalk.cyan('@debug'));
  }
  process.exit(0);
}

if (!semver.satisfies(process.version, '>= 8.0.0')) {
  console.error(chalk.red('✘ The generator will only work with Node v8.0.0 and up!'));
  process.exit(1);
}

// 取默认应用名
const name = args._[0] || '';

(async () => {
  await runCli({
    name,
    args,
  });
  process.exit(0);
})();
