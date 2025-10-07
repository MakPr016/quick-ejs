#!/usr/bin/env node

import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let projectName = process.argv[2] || '';

// Templates for different boilerplates
const templates = {
  ejs: {
    viewEngine: 'ejs',
    viewsFolder: 'views',
    defaultView: 'index.ejs',
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><%= title %></title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to <%= title %></h1>
            <p class="subtitle">Built with Express & EJS</p>
        </header>
        
        <main>
            <section class="hero">
                <h2>Getting Started</h2>
                <p>Edit <code>views/index.ejs</code> to customize this page.</p>
                <div class="features">
                    <div class="feature-card">
                        <i data-lucide="rocket" class="icon"></i>
                        <h3>Fast Setup</h3>
                        <p>Get started quickly with a pre-configured structure</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="package" class="icon"></i>
                        <h3>Organized</h3>
                        <p>Clean folder structure for scalable applications</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="palette" class="icon"></i>
                        <h3>Styled</h3>
                        <p>Beautiful default styles to build upon</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Created with create-ejs</p>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`,
    partials: {
      header: `<header class="nav-header">
    <nav>
        <div class="logo">
            <h2><%= title %></h2>
        </div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </nav>
</header>`,
      footer: `<footer class="site-footer">
    <p>&copy; 2025 <%= title %>. All rights reserved.</p>
</footer>`
    }
  },
  html: {
    viewEngine: 'html',
    viewsFolder: 'public',
    defaultView: 'index.html',
    viewContent: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Express App</title>
    <link rel="stylesheet" href="/css/style.css">
    <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
    <div class="container">
        <header>
            <h1>Welcome to Your Express App</h1>
            <p class="subtitle">Static HTML with Express</p>
        </header>
        
        <main>
            <section class="hero">
                <h2>Getting Started</h2>
                <p>Edit <code>public/index.html</code> to customize this page.</p>
                <div class="features">
                    <div class="feature-card">
                        <i data-lucide="rocket" class="icon"></i>
                        <h3>Fast Setup</h3>
                        <p>Get started quickly with a pre-configured structure</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="package" class="icon"></i>
                        <h3>Organized</h3>
                        <p>Clean folder structure for scalable applications</p>
                    </div>
                    <div class="feature-card">
                        <i data-lucide="palette" class="icon"></i>
                        <h3>Styled</h3>
                        <p>Beautiful default styles to build upon</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer>
            <p>Created with create-ejs</p>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script>
        lucide.createIcons();
    </script>
</body>
</html>`
  }
};

const defaultCSS = `/* Reset & Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --text-color: #1f2937;
    --bg-color: #f9fafb;
    --card-bg: #ffffff;
    --border-color: #e5e7eb;
    --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 2rem;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: var(--shadow);
    overflow: hidden;
}

header {
    background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    color: white;
    padding: 3rem 2rem;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
}

.subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
}

main {
    padding: 3rem 2rem;
}

.hero {
    text-align: center;
}

.hero h2 {
    color: var(--primary-color);
    font-size: 2rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    color: #6b7280;
}

code {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    color: var(--primary-color);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: var(--bg-color);
    padding: 2rem;
    border-radius: 12px;
    border: 2px solid var(--border-color);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;
}

.feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.1);
}

.feature-card .icon {
    width: 48px;
    height: 48px;
    color: var(--primary-color);
    margin: 0 auto 1rem;
    display: block;
    stroke-width: 2;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text-color);
}

.feature-card p {
    color: #6b7280;
}

footer {
    background: var(--bg-color);
    text-align: center;
    padding: 2rem;
    color: #6b7280;
    border-top: 2px solid var(--border-color);
}

/* Navigation Styles */
.nav-header {
    background: var(--primary-color);
    padding: 1rem 2rem;
    box-shadow: var(--shadow);
}

.nav-header nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
}

.nav-header .logo h2 {
    color: white;
    font-size: 1.5rem;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s ease;
}

.nav-links a:hover {
    opacity: 0.8;
}

/* Footer Styles */
.site-footer {
    background: var(--text-color);
    color: white;
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
}

@media (max-width: 768px) {
    header h1 {
        font-size: 1.8rem;
    }
    
    .features {
        grid-template-columns: 1fr;
    }
    
    .nav-links {
        gap: 1rem;
    }
}`;

const defaultJS = `// Add your JavaScript here
console.log('App initialized!');

// Example: Add interactivity to feature cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.style.transform = 'scale(1.02)';
            setTimeout(() => {
                card.style.transform = '';
            }, 200);
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});`;

async function promptUser() {
  console.log(chalk.blue.bold('\nWelcome to create-ejs!\n'));
  
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

function generateStructure(config) {
  const { template, useRoutes, useControllers, useMongoDB, useAuth } = config;
  const templateConfig = templates[template];
  
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
NODE_ENV=development${useMongoDB ? '\nMONGO_URI=mongodb://localhost:27017/yourdb' : ''}${useAuth ? '\nJWT_SECRET=your-secret-key-here\nJWT_EXPIRE=7d' : ''}`,
    ".gitignore": `node_modules/
.env
*.log
.DS_Store
dist/
build/`,
    "README.md": generateReadme(config)
  };

  // Add views or html structure
  if (template === 'ejs') {
    structure.views = {
      "index.ejs": templateConfig.viewContent,
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

  // Add routes
  if (useRoutes) {
    structure.routes = {
      "index.js": generateIndexRoute(template, useControllers)
    };
    if (useAuth) {
      structure.routes["auth.js"] = generateAuthRoute(useControllers);
    }
  }

  // Add controllers
  if (useControllers) {
    structure.controllers = {
      "homeController.js": generateHomeController(template)
    };
    if (useAuth) {
      structure.controllers["authController.js"] = generateAuthController();
    }
  }

  // Add MongoDB structure
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

  // Generate main index.js
  structure["index.js"] = generateMainFile(config);
  structure["package.json"] = generatePackageJson(config);

  return structure;
}

function generateMainFile(config) {
  const { template, useRoutes, useMongoDB } = config;
  
  return `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';${useMongoDB ? "\nimport connectDB from './config/db.js';" : ''}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

${useMongoDB ? '// Connect to MongoDB\nconnectDB();\n' : ''}
${template === 'ejs' ? `// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));` : ''}

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
${useRoutes ? `import indexRouter from './routes/index.js';
app.use('/', indexRouter);${config.useAuth ? "\nimport authRouter from './routes/auth.js';\napp.use('/auth', authRouter);" : ''}` : `app.get('/', (req, res) => {
  ${template === 'ejs' ? "res.render('index', { title: 'Express App' });" : "res.sendFile(path.join(__dirname, 'public', 'index.html'));"}
});`}

// 404 handler
app.use((req, res) => {
  res.status(404).${template === 'ejs' ? "render('error', { message: 'Page not found' })" : "send('Page not found')"};
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
  console.log('Press Ctrl+C to exit');
});`;
}

function generatePackageJson(config) {
  const deps = getDependencies(config);
  const devDeps = getDevDependencies();
  
  return JSON.stringify({
    "name": config.projectName || "express-app",
    "version": "1.0.0",
    "description": "Express application created with create-ejs",
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

function generateIndexRoute(template, useControllers) {
  if (useControllers) {
    return `import express from 'express';
import { getHome } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHome);

export default router;`;
  }
  
  return `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/', (req, res) => {
  ${template === 'ejs' ? "res.render('index', { title: 'Home' });" : "res.sendFile(path.join(__dirname, '../public', 'index.html'));"}
});

export default router;`;
}

function generateHomeController(template) {
  return `import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getHome = (req, res) => {
  ${template === 'ejs' ? "res.render('index', { title: 'Home' });" : "res.sendFile(path.join(__dirname, '../public', 'index.html'));"}
};`;
}

function generateUserModel(useAuth) {
  if (!useAuth) {
    return `import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', UserSchema);`;
  }

  return `import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [/^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/, 'Please add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Match password
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', UserSchema);`;
}

function generateDBConfig() {
  return `import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};

export default connectDB;`;
}

function generateAuthRoute(useControllers) {
  if (useControllers) {
    return `import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;`;
  }

  return `import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.send('Register route');
});

router.post('/login', (req, res) => {
  res.send('Login route');
});

export default router;`;
}

function generateAuthController() {
  return `import User from '../models/User.js';

// @desc    Register user
// @route   POST /auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Login user
// @route   POST /auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get current user
// @route   GET /auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Helper function to get token and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token
  });
};`;
}

function generateAuthMiddleware() {
  return `import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Not authorized to access this route' });
  }
};`;
}

function generateLoginView() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Login</h1>
        <form id="loginForm">
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>`;
}

function generateRegisterView() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
    <div class="container">
        <h1>Register</h1>
        <form id="registerForm">
            <input type="text" name="name" placeholder="Name" required>
            <input type="email" name="email" placeholder="Email" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
    </div>
</body>
</html>`;
}

function generateReadme(config) {
  return `# ${config.projectName || 'Express App'}

Generated with create-ejs

## Features

${config.template === 'ejs' ? '- EJS templating engine' : '- Static HTML files'}
${config.useRoutes ? '- Organized route structure' : ''}
${config.useControllers ? '- MVC pattern with controllers' : ''}
${config.useMongoDB ? '- MongoDB integration' : ''}
${config.useAuth ? '- JWT authentication' : ''}

## Getting Started

1. Install dependencies:
\`\`\`bash
${config.packageManager} install
\`\`\`

${config.useMongoDB ? `2. Create a .env file and add your MongoDB URI:
\`\`\`
MONGO_URI=mongodb://localhost:27017/yourdb
\`\`\`

3. ` : '2. '}Run the development server:
\`\`\`bash
${config.packageManager} ${config.packageManager === 'npm' ? 'run ' : ''}dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\`\`\`
${config.projectName}/
├── public/          # Static files
│   ├── css/
│   ├── js/
│   └── assets/
${config.template === 'ejs' ? '├── views/           # EJS templates\n' : ''}${config.useRoutes ? '├── routes/          # Route definitions\n' : ''}${config.useControllers ? '├── controllers/     # Request handlers\n' : ''}${config.useMongoDB ? '├── models/          # Database models\n├── config/          # Configuration files\n' : ''}${config.useAuth ? '├── middleware/      # Custom middleware\n' : ''}├── .env             # Environment variables
└── index.js         # Entry point
\`\`\`

## Learn More

- [Express.js Documentation](https://expressjs.com/)
${config.template === 'ejs' ? '- [EJS Documentation](https://ejs.co/)\n' : ''}${config.useMongoDB ? '- [MongoDB Documentation](https://docs.mongodb.com/)\n' : ''}`;
}

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

function getDependencies(config) {
  const deps = ['express', 'dotenv'];
  
  if (config.template === 'ejs') {
    deps.push('ejs');
  }
  
  if (config.useMongoDB) {
    deps.push('mongoose');
  }
  
  if (config.useAuth) {
    deps.push('bcryptjs', 'jsonwebtoken');
  }
  
  return deps;
}

function getDevDependencies() {
  return ['nodemon'];
}

async function initProject() {
  try {
    const config = await promptUser();
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

    // Install dependencies
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

    // Install dev dependencies
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
