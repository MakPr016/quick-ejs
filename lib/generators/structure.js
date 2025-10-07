import { htmlTemplates, defaultCSS, defaultJS } from '../templates.js';
import { generateReadme } from '../utils.js';
import { generateMainFile } from './mainFile.js';
import { generatePackageJson } from './packageJson.js';
import { generateIndexRoute, generateAuthRoute } from './routes.js';
import { generateHomeController, generateAuthController } from './controllers.js';
import { generateUserModel } from './models.js';
import { generateDBConfig, generateAuthMiddleware } from './middleware.js';
import { generateErrorView, generateLoginView, generateRegisterView } from './views.js';

export function generateStructure(config) {
  const { template, useRoutes, useControllers, useMongoDB, useAuth } = config;
  const templateConfig = htmlTemplates[template];

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
NODE_ENV=development${useMongoDB ? '\nMONGO_URI=mongodb://127.0.0.1:27017/yourdb' : ''}${useAuth ? '\nJWT_SECRET=your-secret-key-here\nJWT_EXPIRE=7d' : ''}`,
    ".gitignore": `node_modules/
.env
*.log
.DS_Store
dist/
build/`,
    "README.md": generateReadme(config)
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
  }

  if (useMongoDB) {
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

  structure["index.js"] = generateMainFile(config);
  structure["package.json"] = generatePackageJson(config);

  return structure;
}
