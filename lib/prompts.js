import inquirer from 'inquirer';
import chalk from 'chalk';

export async function promptUser(projectName) {
  const questions = [];

  if (!projectName) {
    questions.push({
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: 'my-express-app',
      validate: (input) => {
        if (!input) return 'Project name is required';
        if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
          return 'Project name can only contain letters, numbers, dashes, and underscores';
        }
        return true;
      }
    });
  }

  questions.push(
    {
      type: 'list',
      name: 'template',
      message: 'Choose template engine:',
      choices: [
        { name: 'EJS (Dynamic Templates)', value: 'ejs' },
        { name: 'HTML (Static)', value: 'html' }
      ],
      default: 'ejs'
    },
    {
      type: 'confirm',
      name: 'useRoutes',
      message: 'Add separate route files?',
      default: true
    },
    {
      type: 'confirm',
      name: 'useControllers',
      message: 'Use MVC controllers pattern?',
      default: true
    },
    {
      type: 'list',
      name: 'database',
      message: 'Choose database option:',
      choices: [
        { name: 'None', value: 'none' },
        { name: 'MySQL (XAMPP)', value: 'mysql' },
        { name: 'MongoDB', value: 'mongodb' }
      ],
      default: 'none'
    },
    {
      type: 'confirm',
      name: 'useAuth',
      message: 'Add authentication system?',
      default: false
    },
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose package manager:',
      choices: [
        { name: 'npm', value: 'npm' },
        { name: 'yarn', value: 'yarn' },
        { name: 'pnpm', value: 'pnpm' }
      ],
      default: 'npm'
    }
  );

  const answers = await inquirer.prompt(questions);

  return {
    projectName: answers.projectName || projectName,
    template: answers.template,
    useRoutes: answers.useRoutes,
    useControllers: answers.useControllers,
    database: answers.database,
    useMongoDB: answers.database === 'mongodb',
    useMySQL: answers.database === 'mysql',
    useAuth: answers.useAuth,
    packageManager: answers.packageManager
  };
}