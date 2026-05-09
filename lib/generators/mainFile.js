export function generateMainFile(config) {
  const { template, useRoutes, useControllers, useMySQL, useMongoDB, useAuth } = config;
  const usesFrontend = template !== 'none';

  let imports = `import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';`;

  if (template === 'ejs') {
    imports += `\nimport expressEjsLayouts from 'express-ejs-layouts';`;
  }

  if (useMySQL) {
    imports += `\nimport { connectDB, closeDB } from './config/db.js';`;
  } else if (useMongoDB) {
    imports += `\nimport mongoose from 'mongoose';`;
  }

  if (useRoutes) {
    imports += `\nimport indexRouter from './routes/index.js';`;
    if (useAuth) {
      imports += `\nimport authRouter from './routes/auth.js';`;
    }
  }

  if (useAuth && !useRoutes) {
    imports += `\nimport { verifyToken, errorHandler } from './middleware/auth.js';`;
  }

  let dbSetup = '';
  if (useMySQL) {
    dbSetup = `\n  await connectDB();`;
  } else if (useMongoDB) {
    dbSetup = `\n  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yourdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✓ Connected to MongoDB');
  } catch (err) {
    console.error('✗ Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }`;
  }

  let routeSetup = '';
  if (useRoutes) {
    routeSetup = `\n  app.use('/', indexRouter);`;
    if (useAuth) {
      routeSetup += `\n  app.use('/auth', authRouter);`;
    }
  }

  let viewEngine = '';
  if (template === 'ejs') {
    viewEngine = `\n  app.use(expressEjsLayouts);
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));`;
  }

  let gracefulShutdown = '';
  if (useMySQL) {
    gracefulShutdown = `\n  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing database...');
    await closeDB();
    server.close(() => process.exit(0));
  });`;
  }

  return `${imports}

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN : '*',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
${usesFrontend ? "app.use(express.static(path.join(__dirname, 'public')));" : ''}${viewEngine}

async function startServer() {
  try {${dbSetup}

    app.use((req, res, next) => {
      console.log(\`\${req.method} \${req.path}\`);
      next();
    });

    ${useRoutes ? routeSetup : `app.get('/', (req, res) => {
      ${template === 'ejs' ? "res.render('index', { title: 'Home' })" : template === 'html' ? "res.sendFile(path.join(__dirname, 'public/index.html'))" : "res.json({ message: 'API server is running' })"};
    });`}

    app.use('*', (req, res) => {
      res.status(404);
      ${template === 'ejs' ? "res.render('error', { message: 'Page not found' });" : template === 'html' ? "res.send('<h1>404 - Page Not Found</h1>');" : "res.json({ error: 'Not Found' });"} 
    });

    app.use((err, req, res, next) => {
      console.error('Error:', err);
      res.status(err.status || 500);
      ${template === 'ejs' ? "res.render('error', { message: err.message || 'Internal Server Error' });" : template === 'html' ? "res.send('<h1>500 - Internal Server Error</h1>');" : "res.json({ error: err.message || 'Internal Server Error' });"} 
    });

    const server = app.listen(PORT, () => {
      console.log(\`✓ Server running on http://localhost:\${PORT}\`);
      console.log(\`  Environment: \${process.env.NODE_ENV || 'development'}\`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(\`✗ Port \${PORT} is already in use\`);
      } else {
        console.error('Server error:', err);
      }
      process.exit(1);
    });${gracefulShutdown}

    process.on('SIGINT', () => {
      console.log('SIGINT received, shutting down gracefully...');
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error('✗ Failed to start server:', err.message);
    process.exit(1);
  }
}

startServer();`;
}

export function generateReadme(config) {
  const { template, useRoutes, useControllers, useMySQL, useMongoDB, useAuth } = config;
  const templateLabel = template === 'none' ? 'no view engine (backend-only)' : `${template} templating`;
  const templateFeature = template === 'ejs' ? 'EJS' : template === 'html' ? 'Static HTML' : 'No view engine (backend-only API)';

  let readme = `# ${config.projectName}

A modern Express.js application with ${templateLabel}${useMySQL ? ', MySQL (XAMPP)' : useMongoDB ? ', MongoDB' : ''}${useAuth ? ' and JWT authentication' : ''}.

## Features

- ⚡ Express.js server with modern patterns
- 🎨 ${templateFeature}
${useRoutes ? '- 📁 Organized route structure with modular routes' : ''}
${useControllers ? '- 🏗️ MVC pattern with dedicated controllers' : ''}
${useMySQL ? '- 🗄️ MySQL (XAMPP) with connection pooling' : ''}
${useMongoDB ? '- 🗄️ MongoDB with Mongoose ODM' : ''}
${useAuth ? '- 🔐 JWT authentication with bcryptjs password hashing' : ''}
- 🛡️ CORS and cookie-based security
- ✅ Error handling and logging
- 📝 Environment variable configuration

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm, yarn, or pnpm
${useMySQL ? '- MySQL Server (XAMPP recommended)' : ''}
${useMongoDB ? '- MongoDB Server' : ''}

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file based on \`.env.example\`:

\`\`\`bash
cp .env.example .env
\`\`\`

4. Configure your environment variables in \`.env\`

${useMySQL ? `
### MySQL Setup

1. Start XAMPP and ensure MySQL is running
2. Create a database (optional - the app will create it):

\`\`\`sql
CREATE DATABASE quickejs_db;
\`\`\`

3. Update your \`.env\` with correct credentials:

\`\`\`
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=quickejs_db
\`\`\`

The application will automatically create the users table on first run.
` : ''}

### Running the Application

Development mode (with hot-reload):

\`\`\`bash
npm run dev
\`\`\`

Production mode:

\`\`\`bash
npm start
\`\`\`

The application will be available at \`http://localhost:3000\`

## Project Structure

\`\`\`
${config.projectName}/
${template !== 'none' ? `├── public/
│   ├── css/
│   │   └── style.css              # Main stylesheet
│   ├── js/
│   │   └── app.js                 # Client-side JavaScript
│   └── assets/
│       ├── images/
│       └── fonts/
` : ''}
${template === 'ejs' ? `├── views/
│   ├── layout.ejs                 # Default EJS layout wrapper
│   ├── index.ejs                  # Main template
│   ├── error.ejs                  # Error page
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
` : ''}${useRoutes ? `├── routes/
│   ├── index.js                   # Home routes
${useAuth ? '│   └── auth.js                    # Authentication routes' : ''}
` : ''}${useControllers ? `├── controllers/
│   ├── homeController.js          # Home request handlers
${useAuth ? '│   └── authController.js          # Authentication handlers' : ''}
` : ''}${useMySQL ? `├── config/
│   └── db.js                      # MySQL connection setup
├── models/
│   └── User.js                    # User data model
${useAuth ? `└── middleware/
    └── auth.js                    # JWT authentication middleware
` : ''}` : ''}${useMongoDB ? `├── config/
│   └── db.js                      # MongoDB connection setup
├── models/
│   └── User.js                    # Mongoose User schema
${useAuth ? `└── middleware/
    └── auth.js                    # JWT authentication middleware
` : ''}` : ''}├── server.js                     # Application entry point
├── package.json                   # Project configuration
├── .env                          # Environment variables (local)
├── .env.example                  # Environment template
├── .gitignore
└── README.md
\`\`\`

## API Endpoints

### Home Routes
- \`GET /\` - Home page
- \`GET /data\` - Get all data
- \`GET /data/:id\` - Get data by ID
- \`POST /data\` - Create new data
- \`PUT /data/:id\` - Update data
- \`DELETE /data/:id\` - Delete data

${useAuth ? `
### Authentication Routes
- \`POST /auth/register\` - Register a new user
- \`POST /auth/login\` - Login and get token
- \`POST /auth/logout\` - Logout (requires auth)
- \`GET /auth/profile\` - Get user profile (requires auth)
- \`PUT /auth/profile\` - Update profile (requires auth)
- \`POST /auth/change-password\` - Change password (requires auth)
- \`DELETE /auth/delete-account\` - Delete account (requires auth)
` : ''}

## Environment Variables

See \`.env.example\` for all available options:

\`\`\`env
PORT=3000
NODE_ENV=development
${useMySQL ? `DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=quickejs_db
` : ''}${useMongoDB ? `MONGO_URI=mongodb://127.0.0.1:27017/yourdb
` : ''}${useAuth ? `JWT_SECRET=your-secret-key-change-this
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRES=7
` : ''}
\`\`\`

## Scripts

- \`npm start\` - Start production server
- \`npm run dev\` - Start development server with nodemon

## Technologies Used

- **Runtime:** Node.js with ES6 modules
- **Framework:** Express.js
- **Template Engine:** ${templateFeature}
${useMySQL ? '- **Database:** MySQL with mysql2' : ''}
${useMongoDB ? '- **Database:** MongoDB with Mongoose' : ''}
${useAuth ? '- **Authentication:** JWT with jsonwebtoken and bcryptjs' : ''}
- **Security:** CORS, helmet (recommended), cookie-parser
- **Development:** Nodemon for hot-reload

## Error Handling

The application includes:
- Centralized error handler
- 404 Not Found page
- 500 Internal Server Error page
- Request logging middleware

## License

MIT

## Created with quick-ejs

Generated using the quick-ejs CLI tool for rapid Express.js project scaffolding.
`;

  return readme;
}