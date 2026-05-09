export function getDependencies(config) {
  const { template, useMySQL, useMongoDB, useAuth } = config;

  const deps = {
    'express': '^4.18.2',
    'cors': '^2.8.5',
    'cookie-parser': '^1.4.6',
    'dotenv': '^16.3.1'
  };

  if (template === 'ejs') {
    deps['ejs'] = '^3.1.9';
    deps['express-ejs-layouts'] = '^2.5.1';
  }

  if (useMySQL) {
    deps['mysql2'] = '^3.6.5';
  }

  if (useMongoDB) {
    deps['mongoose'] = '^7.5.0';
  }

  if (useAuth) {
    deps['jsonwebtoken'] = '^9.0.2';
    deps['bcryptjs'] = '^2.4.3';
  }

  return deps;
}

export function getDevDependencies(config) {
  return {
    'nodemon': '^3.0.1'
  };
}

export function formatDependencies(deps) {
  return Object.entries(deps)
    .map(([name, version]) => `${name}@${version}`)
    .join(' ');
}

export function validateProjectName(name) {
  const isValid = /^[a-zA-Z0-9-_]+$/.test(name) && name.length > 0;
  return {
    valid: isValid,
    message: isValid ? 'Valid project name' : 'Project name can only contain alphanumeric characters, hyphens, and underscores'
  };
}

export function parseConfig(answers) {
  return {
    projectName: answers.projectName,
    template: answers.template || 'ejs',
    useRoutes: answers.useRoutes !== false,
    useControllers: answers.useControllers !== false,
    useMongoDB: answers.database === 'mongodb',
    useMySQL: answers.database === 'mysql',
    useAuth: answers.useAuth === true,
    packageManager: answers.packageManager || 'npm'
  };
}