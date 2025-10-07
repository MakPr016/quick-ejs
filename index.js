#!/usr/bin/env node

import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import ora from 'ora';
import { promptUser } from './lib/prompts.js';
import { generateStructure } from './lib/generators/structure.js';
import { getDependencies, getDevDependencies } from './lib/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let projectName = process.argv[2] || '';

function createStructure(basePath, structure) {
  for (const [name, content] of Object.entries(structure)) {
    const currentPath = path.join(basePath, name);

    if (typeof content === 'object' && !Buffer.isBuffer(content)) {
      fs.mkdirSync(currentPath, { recursive: true });
      createStructure(currentPath, content);
    } else {
      fs.writeFileSync(currentPath, content);
    }
  }
}

async function initProject() {
  try {
    const config = await promptUser(projectName);
    projectName = config.projectName || projectName;
    const projectPath = path.join(process.cwd(), projectName);

    if (fs.existsSync(projectPath)) {
      console.log(chalk.red(`\nError: "${projectName}" already exists!\n`));
      return;
    }

    console.log(chalk.blue(`\nCreating project "${projectName}"...\n`));

    const spinner = ora('Generating project structure...').start();

    const structure = generateStructure(config);
    createStructure(projectPath, structure);

    spinner.succeed('Project structure created');

    const deps = getDependencies(config);
    const devDeps = getDevDependencies();

    spinner.start(`Installing dependencies with ${config.packageManager}...`);

    const installCmd = config.packageManager === 'yarn'
      ? `yarn add ${deps.join(' ')}`
      : config.packageManager === 'pnpm'
        ? `pnpm add ${deps.join(' ')}`
        : `npm install ${deps.join(' ')}`;

    await new Promise((resolve, reject) => {
      exec(`cd "${projectPath}" && ${installCmd}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    spinner.succeed('Dependencies installed');

    spinner.start('Installing dev dependencies...');

    const devInstallCmd = config.packageManager === 'yarn'
      ? `yarn add -D ${devDeps.join(' ')}`
      : config.packageManager === 'pnpm'
        ? `pnpm add -D ${devDeps.join(' ')}`
        : `npm install --save-dev ${devDeps.join(' ')}`;

    await new Promise((resolve, reject) => {
      exec(`cd "${projectPath}" && ${devInstallCmd}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    spinner.succeed('Dev dependencies installed');

    console.log(chalk.green.bold(`\nSuccess! Created ${projectName}\n`));
    console.log('Inside that directory, you can run several commands:\n');
    console.log(chalk.cyan(`  ${config.packageManager} ${config.packageManager === 'npm' ? 'run ' : ''}dev`));
    console.log('    Starts the development server with auto-reload\n');
    console.log(chalk.cyan(`  ${config.packageManager} start`));
    console.log('    Starts the production server\n');
    console.log('We suggest that you begin by typing:\n');
    console.log(chalk.cyan(`  cd ${projectName}`));
    console.log(chalk.cyan(`  ${config.packageManager} ${config.packageManager === 'npm' ? 'run ' : ''}dev\n`));

  } catch (error) {
    console.error(chalk.red('\nSetup error:'), error.message);
    process.exit(1);
  }
}

initProject();
