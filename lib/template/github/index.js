const BasicCreate = require('../../BasicCreate');
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('glob');
const exec = require('execa');
const rimraf = require('rimraf');

function log(...args) {
  console.log(`${chalk.gray('>')}`, ...args);
}

class GithubCreate extends BasicCreate {
  async writing() {
    const projectName = this.opts.name || this.opts.env.cwd;
    const githubUrl = this.opts.github || '';
    const projectPath = path.resolve(projectName);

    const yoConfigPth = path.join(projectPath, '.yo-repository');
    if (fs.existsSync(yoConfigPth)) {
      // 删除 .yo-repository
      rimraf.sync(yoConfigPth);
    }

    if (
      fs.existsSync(projectPath) &&
      fs.statSync(projectPath).isDirectory() &&
      fs.readdirSync(projectPath).length > 0
    ) {
      console.log('\n');
      console.log(`🙈 请在空文件夹中使用`);
      process.exit(1);
    }

    const gitArgs = [`clone`, githubUrl, projectName, `--depth=1`];

    // git action
    await exec(
      `git`,
      gitArgs,
      process.env.TEST
        ? {}
        : {
            stdout: process.stdout,
            stderr: process.stderr,
            stdin: process.stdin,
          },
    );

    log(`🚚 clone success`);
  }
}

module.exports = GithubCreate;
