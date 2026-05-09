import { defaultCSS, defaultJS, htmlTemplates } from '../templates.js';
import { generateReadme, generateMainFile } from './mainFile.js';
import { generatePackageJson } from './packageJson.js';
import { generateIndexRoute, generateAuthRoute } from './routes.js';
import { generateHomeController, generateAuthController } from './controllers.js';
import { generateUserModel, generateMySQLUserModel } from './models.js';
import { generateDBConfig, generateAuthMiddleware } from '../middleware.js';
import { generateErrorView, generateLoginView, generateRegisterView } from './views.js';

export function generateStructure(config) {
  const { template, useRoutes, useControllers, useMongoDB, useMySQL, useAuth } = config;
  const templateConfig = htmlTemplates[template];

  let dbEnv = '';
  if (useMySQL) {
    dbEnv = `\nDB_HOST=localhost\nDB_USER=root\nDB_PASSWORD=\nDB_NAME=quickejs_db`;
  } else if (useMongoDB) {
    dbEnv = `\nMONGO_URI=mongodb://127.0.0.1:27017/yourdb`;
  }

  const structure = {
    "public": {
      "css": {
        "style.css": defaultCSS
      },
      "js": {
        "app.js": defaultJS
      },
      "assets": {
        "images": {},
        "fonts": {}
      }
    },
    ".env.example": `PORT=3000
NODE_ENV=development
CORS_ORIGIN=*${dbEnv}${useAuth ? '\nJWT_SECRET=your-secret-key-change-this-in-production\nJWT_EXPIRE=7d\nJWT_COOKIE_EXPIRES=7' : ''}`,
    ".gitignore": `node_modules/
.env
.env.local
*.log
logs/
.DS_Store
.vscode/
.idea/
dist/
build/
.vercel
.env.*.local`,
    "README.md": generateReadme(config),
    "vercel.json": generateVercelJson(),
    ".npmignore": `node_modules/
.env
.env.local
*.log
.DS_Store
.vscode/
.idea/
src/
examples/
.git`
  };

  if (template === 'ejs') {
    structure.views = {
      "index.ejs": templateConfig.viewContent,
      "error.ejs": generateErrorView(),
      "partials": {
        "header.ejs": templateConfig.partials.header,
        "footer.ejs": templateConfig.partials.footer
      }
    };
    if (useAuth) {
      structure.views.auth = {
        "login.ejs": generateLoginView(),
        "register.ejs": generateRegisterView()
      };
    }
  } else {
    structure.public["index.html"] = templateConfig.viewContent;
    if (useAuth) {
      structure.public["login.html"] = generateLoginView(),
      structure.public["register.html"] = generateRegisterView()
    }
  }

  if (useRoutes) {
    structure.routes = {
      "index.js": generateIndexRoute(template, useControllers)
    };
    if (useAuth) {
      structure.routes["auth.js"] = generateAuthRoute(useControllers);
    }
  }

  if (useControllers) {
    structure.controllers = {
      "homeController.js": generateHomeController(template)
    };
    if (useAuth) {
      structure.controllers["authController.js"] = generateAuthController();
    }
  } else if (useAuth && !useRoutes) {
    structure.controllers = {
      "authController.js": generateAuthController()
    };
  }

  if (useMySQL) {
    structure.config = {
      "db.js": generateDBConfig()
    };
    structure.models = {
      "User.js": generateMySQLUserModel()
    };
    if (useAuth) {
      structure.middleware = {
        "auth.js": generateAuthMiddleware()
      };
    }
  } else if (useMongoDB) {
    structure.models = {
      "User.js": generateUserModel(useAuth)
    };
    structure.config = {
      "db.js": generateDBConfig()
    };
    if (useAuth) {
      structure.middleware = {
        "auth.js": generateAuthMiddleware()
      };
    }
  }

  structure["server.js"] = generateMainFile(config);
  structure["package.json"] = generatePackageJson(config);

  return structure;
}

function generateVercelJson() {
  return JSON.stringify({
    "version": 2,
    "builds": [
      {
        "src": "server.js",
        "use": "@vercel/node"
      }
    ],
    "routes": [
      {
        "src": "/(.*)",
        "dest": "/server.js",
        "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
        "headers": {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,PATCH,OPTIONS,HEAD",
          "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, X-CSRF-Token"
        }
      }
    ]
  }, null, 2);
}