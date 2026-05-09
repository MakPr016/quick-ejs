export function generateIndexRoute(template, useControllers) {
  if (useControllers) {
    return `import express from 'express';
import { getHome, postHome, getAllData, getDataById, createData, updateData, deleteData } from '../controllers/homeController.js';

const router = express.Router();

router.get('/', getHome);
router.post('/', postHome);

router.get('/data', getAllData);
router.get('/data/:id', getDataById);
router.post('/data', createData);
router.put('/data/:id', updateData);
router.delete('/data/:id', deleteData);

export default router;`;
  } else {
    return `import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  ${template === 'ejs' ? "res.render('index', { title: 'Home' })" : "res.sendFile('public/index.html')"};
});

router.post('/', (req, res) => {
  res.json({ message: 'Home post request received' });
});

router.get('/data', (req, res) => {
  res.json({ data: [] });
});

router.get('/data/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, data: {} });
});

router.post('/data', (req, res) => {
  res.json({ message: 'Data created', data: req.body });
});

router.put('/data/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Data updated', id, data: req.body });
});

router.delete('/data/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: 'Data deleted', id });
});

export default router;`;
  }
}

export function generateAuthRoute(useControllers) {
  if (useControllers) {
    return `import express from 'express';
import { register, login, logout, getProfile, updateProfile, changePassword, deleteAccount } from '../controllers/authController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', verifyToken, logout);

router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.post('/change-password', verifyToken, changePassword);
router.delete('/delete-account', verifyToken, deleteAccount);

export default router;`;
  } else {
    return `import express from 'express';

const router = express.Router();

router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint', data: req.body });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint', data: req.body });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

router.get('/profile', (req, res) => {
  res.json({ message: 'Profile endpoint' });
});

export default router;`;
  }
}