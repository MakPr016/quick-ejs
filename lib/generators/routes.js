export function generateIndexRoute(template, useControllers) {
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

export function generateAuthRoute(useControllers) {
  if (useControllers) {
    return `import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;`;
  }

  return `import express from 'express';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', (req, res) => {
  res.send('Register route');
});

router.post('/login', (req, res) => {
  res.send('Login route');
});

export default router;`;
}
