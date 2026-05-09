export function generatePackageJson(config) {
  const { projectName, useMySQL, useMongoDB, useAuth, template } = config;
  const templateLabel = template === 'none' ? 'no-view backend-only' : template;

  const dependencies = {
    'express': '^4.18.2',
    'cors': '^2.8.5',
    'cookie-parser': '^1.4.6',
    'dotenv': '^16.3.1'
  };

  if (template === 'ejs') {
    dependencies['ejs'] = '^3.1.9';
    dependencies['express-ejs-layouts'] = '^2.5.1';
  }

  if (useMySQL) {
    dependencies['mysql2'] = '^3.6.5';
  }

  if (useMongoDB) {
    dependencies['mongoose'] = '^7.5.0';
  }

  if (useAuth) {
    dependencies['jsonwebtoken'] = '^9.0.2';
    dependencies['bcryptjs'] = '^2.4.3';
  }

  const devDependencies = {
    'nodemon': '^3.0.1'
  };

  const packageJson = {
    name: projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: `A modern Express.js application with ${templateLabel}${useMySQL ? ', MySQL (XAMPP)' : useMongoDB ? ', MongoDB' : ''}${useAuth ? ' and JWT authentication' : ''}`,
    type: 'module',
    main: 'server.js',
    scripts: {
      start: 'node server.js',
      dev: 'nodemon server.js'
    },
    keywords: [
      'express',
      ...(template === 'none' ? ['api', 'backend-only'] : [template]),
      'nodejs',
      'javascript',
      'es6',
      ...(useMySQL ? ['mysql', 'xampp', 'database'] : []),
      ...(useMongoDB ? ['mongodb', 'mongoose', 'database'] : []),
      ...(useAuth ? ['jwt', 'authentication', 'auth', 'bcrypt'] : [])
    ],
    author: '',
    license: 'MIT',
    dependencies,
    devDependencies,
    engines: {
      node: '>=18.0.0'
    },
    repository: {
      type: 'git',
      url: ''
    },
    bugs: {
      url: ''
    }
  };

  return JSON.stringify(packageJson, null, 2);
}