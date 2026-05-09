import inquirer from 'inquirer';

export async function promptUser() {
  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'my-express-app',
        validate: (input) => {
          if (!input.trim()) {
            return 'Project name cannot be empty';
          }
          if (!/^[a-zA-Z0-9-_]+$/.test(input)) {
            return 'Project name can only contain alphanumeric characters, hyphens, and underscores';
          }
          if (input.length > 50) {
            return 'Project name cannot exceed 50 characters';
          }
          return true;
        },
        filter: (input) => input.trim().toLowerCase()
      },
      {
        type: 'list',
        name: 'template',
        message: 'Choose your template type:',
        choices: [
          { name: 'EJS (Dynamic templating)', value: 'ejs' },
          { name: 'HTML (Static)', value: 'html' }
        ],
        default: 'ejs'
      },
      {
        type: 'confirm',
        name: 'useRoutes',
        message: 'Do you want to use separate route files?',
        default: true
      },
      {
        type: 'confirm',
        name: 'useControllers',
        message: 'Do you want to use MVC controllers?',
        default: true,
        when: (answers) => answers.useRoutes
      },
      {
        type: 'list',
        name: 'database',
        message: 'Choose your database:',
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
        message: 'Do you want to include JWT authentication?',
        default: false,
        when: (answers) => answers.database !== 'none'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager do you prefer?',
        choices: [
          { name: 'npm', value: 'npm' },
          { name: 'yarn', value: 'yarn' },
          { name: 'pnpm', value: 'pnpm' }
        ],
        default: 'npm'
      }
    ]);

    return {
      projectName: answers.projectName,
      template: answers.template,
      useRoutes: answers.useRoutes,
      useControllers: answers.useControllers || false,
      useMongoDB: answers.database === 'mongodb',
      useMySQL: answers.database === 'mysql',
      useAuth: answers.useAuth || false,
      packageManager: answers.packageManager
    };
  } catch (error) {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('Prompt error:', error);
    }
    process.exit(1);
  }
}

export async function confirmOverwrite(projectPath) {
  try {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Directory already exists. Do you want to overwrite it?',
        default: false
      }
    ]);
    return confirm;
  } catch (error) {
    console.error('Error confirming overwrite:', error);
    return false;
  }
}