import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptUser(projectName) {
  console.log(chalk.blue.bold('\nWelcome to quick-ejs!\n'));

  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project named?',
      default: projectName || 'my-app',
      prefix: '>',
      when: !projectName,
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        else return 'Project name may only include letters, numbers, underscores and hashes.';
      }
    },
    {
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: [
        { name: 'EJS (Dynamic templating)', value: 'ejs' },
        { name: 'HTML (Static files)', value: 'html' }
      ],
      prefix: '>',
      default: 'ejs'
    },
    {
      type: 'confirm',
      name: 'useRoutes',
      message: 'Would you like to use separate routes?',
      prefix: '>',
      default: true
    },
    {
      type: 'confirm',
      name: 'useControllers',
      message: 'Would you like to use controllers (MVC pattern)?',
      prefix: '>',
      default: true
    },
    {
      type: 'confirm',
      name: 'useMongoDB',
      message: 'Would you like to use MongoDB?',
      prefix: '>',
      default: false
    },
    {
      type: 'confirm',
      name: 'useAuth',
      message: 'Would you like JWT authentication setup?',
      prefix: '>',
      default: false,
      when: (answers) => answers.useMongoDB
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager would you like to use?',
      choices: ['npm', 'yarn', 'pnpm'],
      prefix: '>',
      default: 'npm'
    }
  ];

  return await inquirer.prompt(questions);
}
