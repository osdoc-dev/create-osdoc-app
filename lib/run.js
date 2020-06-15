const inquirer = require('inquirer');
const fs = require('fs');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const clipboardy = require('clipboardy');
const yeoman = require('yeoman-environment');
const path = require('path');
const githubConfig = require('./github');

const allGitHub = githubConfig.map((v) => v.value);

const tempList = fs
  .readdirSync(`${__dirname}/template`)
  .filter((f) => !f.startsWith('.') && f !== 'github')
  .map((f) => {
    return {
      name: `${f.padEnd(15)} - ${chalk.gray(require(`./template/${f}/meta.json`).description)}`,
      value: f,
      short: f,
    };
  });

const getChoices = () => {
  return [...tempList, ...githubConfig];
};

// 生成
const runCreate = (generatorPath, { name = '', cwd = process.cwd(), args = {}, type }) => {
  return new Promise((resolve) => {
    if (name) {
      mkdirp.sync(name);
      cwd = path.join(cwd, name);
    }
    if (type && allGitHub.indexOf(type) >= 0) {
      generatorPath = `./template/github`;
    }

    const { github = '' } = githubConfig.find((v) => v.value === type) || '';

    const Generator = require(generatorPath);

    const env = yeoman.createEnv([], {
      cwd,
    });
    const generator = new Generator({
      name,
      env,
      resolved: require.resolve(generatorPath),
      args,
      github,
    });

    return generator.run(() => {
      if (name) {
        if (process.platform !== `linux` || process.env.DISPLAY) {
          clipboardy.writeSync(`cd ${name}`);
          console.log('📋 Copied to clipboard, just use Ctrl+V');
        }
      }
      console.log('✨ File Generate Done');
      resolve(true);
    });
  });
};

async function runCli(payload) {
  process.send && process.send({ type: 'prompt' });
  process.emit('message', { type: 'prompt' });
  let { name } = payload;
  let type = ''; // 应用类型
  // 没有名字 先输入名字
  if (!name) {
    const answers = await inquirer.prompt([
      {
        name: 'name',
        message: '🍖 请输入应用名称',
        type: 'input',
        default: 'new-app',
      },
    ]);
    name = answers.name;
  }
  // 获取类型
  if (!type) {
    const answers = await inquirer.prompt([
      {
        name: 'type',
        message: '🌮 请选择应用模板',
        type: 'list',
        choices: getChoices(),
      },
    ]);
    type = answers.type;
  }
  try {
    console.log(name, type);
    return runCreate(`./template/${type}`, {
      ...payload,
      name,
      type,
    });
  } catch (e) {
    console.error(chalk.red(`> Generate failed`), e);
    process.exit(1);
  }
}

module.exports = runCli;
