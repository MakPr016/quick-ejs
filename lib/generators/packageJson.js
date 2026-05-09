export function generatePackageJson(config) {
  const deps = {
    express: '^4.18.2',
    dotenv: '^16.0.3',
    chalk: '^5.2.0'
  };

  const devDeps = {
    nodemon: '^2.0.20'
  };

  if (config.template === 'ejs') {
    deps.ejs = '^3.1.8';
  }

  if (config.useMySQL) {
    deps['mysql2'] = '^3.6.2';
  }

  if (config.useMongoDB) {
    deps.mongoose = '^7.0.0';
  }

  if (config.useAuth) {
    deps.bcryptjs = '^2.4.3';
    deps.jsonwebtoken = '^9.0.0';
    deps['cookie-parser'] = '^1.4.6';
  }

  const packageJson = {
    name: config.projectName.toLowerCase().replace(/\s+/g, '-'),
    version: '1.0.0',
    description: 'Express.js application generated with quick-ejs',
    main: 'server.js',
    type: 'module',
    scripts: {
      start: 'node server.js',
      dev: 'nodemon server.js'
    },
    keywords: ['express', 'nodejs', config.template, config.useMySQL ? 'mysql' : config.useMongoDB ? 'mongodb' : ''],
    author: '',
    license: 'MIT',
    dependencies: deps,
    devDependencies: devDeps
  };

  return JSON.stringify(packageJson, null, 2);
}