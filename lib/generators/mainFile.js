export function generateMainFile(config) {
  const { template, useRoutes, useAuth, useMySQL, useMongoDB } = config;

  let imports = `import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';`;

  if (template === 'ejs') {
    imports += `\nimport ejs from 'ejs';`;
  }

  if (useAuth) {
    imports += `\nimport cookieParser from 'cookie-parser';`;
  }

  if (useMySQL) {
    imports += `\nimport { connectDB } from './config/db.js';
import User from './models/User.js';`;
  }

  if (useMongoDB) {
    imports += `\nimport { connectDB } from './config/db.js';`;
  }

  if (useRoutes) {
    imports += `\nimport indexRoute from './routes/index.js';`;
    if (useAuth) {
      imports += `\nimport authRoute from './routes/auth.js';`;
    }
  }

  if (useAuth) {
    imports += `\nimport { authMiddleware, optionalAuth } from './middleware/auth.js';`;
  }

  let setup = `const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());`;

  if (useAuth) {
    setup += `\napp.use(cookieParser());
app.use(optionalAuth);`;
  }

  if (template === 'ejs') {
    setup += `\n\n// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));`;
  }

  let routes = '';
  if (useRoutes) {
    routes = `\n// Routes
app.use('/', indexRoute);`;
    if (useAuth) {
      routes += `\napp.use('/auth', authRoute);`;
    }
  } else {
    routes = `\n// Routes
app.get('/', (req, res) => {
  ${template === 'ejs' ? `res.render('index', { title: 'Home' });` : `res.sendFile(path.join(__dirname, 'public', 'index.html'));`}
});`;
  }

  let startup = `\n// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  ${template === 'ejs' ? `res.status(500).render('error', { message: err.message || 'Something went wrong!' });` : `res.status(500).json({ message: err.message || 'Something went wrong!' });`}
});

app.use((req, res) => {
  ${template === 'ejs' ? `res.status(404).render('error', { message: 'Page not found' });` : `res.status(404).json({ message: 'Page not found' });`}
});

async function startServer() {
  try {`;

  if (useMySQL) {
    startup += `
    // Connect to MySQL and initialize tables
    await connectDB();
    await User.createTable();
    console.log('✓ MySQL connected and tables initialized');`;
  } else if (useMongoDB) {
    startup += `
    // Connect to MongoDB
    await connectDB();
    console.log('✓ MongoDB connected');`;
  }

  startup += `
    
    app.listen(PORT, () => {
      console.log(\`🚀 Server running at http://localhost:\${PORT}\`);
      console.log(\`Environment: \${process.env.NODE_ENV || 'development'}\`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();`;

  return imports + '\n\n' + setup + routes + startup;
}