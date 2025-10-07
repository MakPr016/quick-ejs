import { getDependencies, getDevDependencies } from '../utils.js';

export function generatePackageJson(config) {
  const deps = getDependencies(config);
  const devDeps = getDevDependencies();

  return JSON.stringify({
    "name": config.projectName || "express-app",
    "version": "1.0.0",
    "description": "Express application created with quick-ejs",
    "type": "module",
    "main": "index.js",
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js"
    },
    "keywords": ["express", config.template === 'ejs' ? 'ejs' : 'html'],
    "author": "",
    "license": "ISC",
    "dependencies": deps.reduce((acc, dep) => {
      const versions = {
        "express": "^4.18.2",
        "ejs": "^3.1.9",
        "dotenv": "^16.3.1",
        "mongoose": "^7.5.0",
        "bcryptjs": "^2.4.3",
        "jsonwebtoken": "^9.0.2"
      };
      acc[dep] = versions[dep] || "latest";
      return acc;
    }, {}),
    "devDependencies": devDeps.reduce((acc, dep) => {
      acc[dep] = "^3.0.1";
      return acc;
    }, {})
  }, null, 2);
}
