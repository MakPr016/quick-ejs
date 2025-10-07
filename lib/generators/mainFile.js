export function generateMainFile(config) {
  const { template, useRoutes, useMongoDB, useAuth } = config;

  let imports = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';`;

  if (useMongoDB) {
    imports += `\nimport connectDB from './config/db.js';`;
  }

  if (useRoutes) {
    imports += `\nimport indexRouter from './routes/index.js';`;
    if (useAuth) {
      imports += `\nimport authRouter from './routes/auth.js';`;
    }
  }

  let routesSection = '';
  if (useRoutes) {
    routesSection = `app.use('/', indexRouter);`;
    if (useAuth) {
      routesSection += `\napp.use('/auth', authRouter);`;
    }
  } else {
    routesSection = `app.get('/', (req, res) => {
  ${template === 'ejs' ? "res.render('index', { title: 'Express App' });" : "res.sendFile(path.join(__dirname, 'public', 'index.html'));"}
});`;
  }

  return `${imports}

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
${routesSection}

// 404 handler
app.use((req, res) => {
  res.status(404).${template === 'ejs' ? "render('error', { message: 'Page not found' })" : "send('<h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><a href=\"/\">Go Home</a>')"};
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
